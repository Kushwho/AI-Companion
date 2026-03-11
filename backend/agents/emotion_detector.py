"""
Emotion Detector — Background task within the Sakhi agent session.
Uses the AgentSession's participant to subscribe to their audio track,
buffers ~3 seconds, sends to Hume AI for prosody analysis,
and dispatches results via participant attributes and RPC to the frontend.
"""

import os
import json
import logging
import asyncio

from livekit import agents, rtc
from livekit.agents import AgentSession
from services.hume import HumeEmotionClient

logger = logging.getLogger(__name__)

# Buffer size: ~3 seconds of audio at 48kHz, 16-bit mono
# 48000 samples/sec * 2 bytes/sample * 3 seconds = 288,000 bytes
AUDIO_BUFFER_SIZE = 288_000


async def run_emotion_detection(ctx: agents.JobContext, session: AgentSession):
    """
    Background emotion detection task.
    Receives the already-started AgentSession so we know the participant.
    """
    hume_api_key = os.getenv("HUME_API_KEY")
    if not hume_api_key:
        logger.warning("HUME_API_KEY not set — emotion detection disabled")
        return

    hume_client = HumeEmotionClient(api_key=hume_api_key)

    try:
        # Get the participant from AgentSession (already connected at this point)
        participant = await _get_session_participant(ctx.room, session)
        if not participant:
            logger.warning("Could not find session participant — emotion detection skipped")
            return

        logger.info(f"Emotion detection tracking: {participant.identity}")

        # Connect Hume WebSocket
        await hume_client.connect()

        # Get or wait for the participant's audio track
        audio_stream = _get_existing_audio_stream(participant)
        if not audio_stream:
            logger.info("Waiting for audio track...")
            audio_stream = await _wait_for_audio_track(ctx.room, participant)

        if not audio_stream:
            logger.warning("No audio track found — emotion detection skipped")
            return

        logger.info("Audio track found — starting emotion analysis loop")
        await _emotion_analysis_loop(ctx, hume_client, audio_stream, participant)

    except asyncio.CancelledError:
        logger.info("Emotion detection cancelled")
    except Exception as e:
        logger.error(f"Emotion detection error: {e}", exc_info=True)
    finally:
        await hume_client.disconnect()


async def _get_session_participant(room: rtc.Room, session: AgentSession, timeout: float = 15.0):
    """
    Get the participant the session is talking to.
    First tries to find them in room.remote_participants,
    falling back to waiting for any new participant.
    """
    # In dispatch mode the participant is already in the room when session.start() completes.
    # Try all remote participants — pick the one that's not an agent.
    for p in room.remote_participants.values():
        # Agents have kind PARTICIPANT_KIND_AGENT; skip them
        if p.kind != rtc.ParticipantKind.PARTICIPANT_KIND_AGENT:
            return p

    # Fallback: wait for a participant to join
    logger.info("No participant yet, waiting...")
    event = asyncio.Event()
    target = None

    def on_participant(participant: rtc.RemoteParticipant):
        nonlocal target
        if participant.kind != rtc.ParticipantKind.PARTICIPANT_KIND_AGENT:
            target = participant
            event.set()

    room.on("participant_connected", on_participant)
    try:
        await asyncio.wait_for(event.wait(), timeout=timeout)
        return target
    except asyncio.TimeoutError:
        return None
    finally:
        room.off("participant_connected", on_participant)


def _get_existing_audio_stream(participant: rtc.RemoteParticipant):
    """Check if the participant already has a published audio track."""
    for pub in participant.track_publications.values():
        if pub.track and pub.track.kind == rtc.TrackKind.KIND_AUDIO:
            logger.info(f"Found existing audio track: {pub.sid}")
            return rtc.AudioStream(pub.track)
    return None


async def _wait_for_audio_track(room: rtc.Room, participant: rtc.RemoteParticipant, timeout: float = 30.0):
    """Wait for an audio track to be published by the specified participant."""
    event = asyncio.Event()
    audio_stream = None

    def on_track(track: rtc.Track, publication: rtc.RemoteTrackPublication, p: rtc.RemoteParticipant):
        nonlocal audio_stream
        if p.identity == participant.identity and track.kind == rtc.TrackKind.KIND_AUDIO:
            logger.info(f"Audio track subscribed: {publication.sid}")
            audio_stream = rtc.AudioStream(track)
            event.set()

    room.on("track_subscribed", on_track)
    try:
        await asyncio.wait_for(event.wait(), timeout=timeout)
        return audio_stream
    except asyncio.TimeoutError:
        return None
    finally:
        room.off("track_subscribed", on_track)


async def _emotion_analysis_loop(
    ctx: agents.JobContext,
    hume_client: HumeEmotionClient,
    audio_stream: rtc.AudioStream,
    participant: rtc.RemoteParticipant,
):
    """
    Main loop: buffer audio frames → analyze with Hume → dispatch results.
    """
    buffer = bytearray()
    frames_received = 0

    async for frame_event in audio_stream:
        try:
            buffer.extend(frame_event.frame.data.tobytes())
            frames_received += 1

            if len(buffer) >= AUDIO_BUFFER_SIZE:
                audio_bytes = bytes(buffer)
                buffer.clear()
                logger.info(f"Sending {len(audio_bytes)} bytes to Hume (frames: {frames_received})")
                frames_received = 0

                # Fire-and-forget so analysis doesn't block audio buffering
                asyncio.create_task(
                    _analyze_and_dispatch(ctx, hume_client, audio_bytes, participant)
                )

        except asyncio.CancelledError:
            break
        except Exception as e:
            logger.debug(f"Emotion loop error: {e}")
            continue


async def _analyze_and_dispatch(
    ctx: agents.JobContext,
    hume_client: HumeEmotionClient,
    audio_bytes: bytes,
    participant: rtc.RemoteParticipant,
):
    """Analyze audio with Hume and dispatch emotion results."""
    try:
        result = await hume_client.analyze_audio(audio_bytes)
        if not result:
            return

        top_emotion = result["top_emotion"]
        avatar_expression = result["avatar_expression"]
        top_score = result["top_score"]

        logger.info(f"Emotion: {top_emotion} ({top_score:.2f}) → {avatar_expression}")

        # Channel 1: Participant attributes (Sakhi agent reads these before LLM calls)
        try:
            await ctx.room.local_participant.set_attributes({
                "emotion": top_emotion,
                "avatar_expression": avatar_expression,
                "emotion_score": str(round(top_score, 4)),
            })
        except Exception as e:
            logger.debug(f"Attribute set error: {e}")

        # Channel 2: RPC to frontend for live emotion readout
        try:
            payload = json.dumps({
                "expression": avatar_expression,
                "raw_emotion": top_emotion,
                "score": top_score,
                "top_3": result.get("top_3", []),
            })
            await ctx.room.local_participant.perform_rpc(
                destination_identity=participant.identity,
                method="setEmotionState",
                payload=payload,
                response_timeout=3.0,
            )
        except Exception as e:
            logger.debug(f"RPC dispatch (non-critical): {e}")

    except Exception as e:
        logger.debug(f"Analyze+dispatch error: {e}")
