"""
Sakhi Demo Voice Agent — Parent-Facing Persona
A warm, informative voice agent that explains Sakhi to parents.
Reads emotion data from the local participant's attributes (set by the
concurrent emotion detector task) to adapt responses in real-time.
"""

import logging
from livekit import agents, rtc
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.plugins import deepgram, silero, groq
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger(__name__)

# Parent-facing system prompt
SAKHI_DEMO_PROMPT = """You are Sakhi, an AI companion for Indian children aged 4–12.
You are currently speaking with a parent who is exploring the Sakhi app on our landing page.

Your goal is to help this parent understand:
- What Sakhi is and how it helps their child learn through voice conversations
- How Sakhi uses voice, emotion detection, and AI to adapt to each child
- How Sakhi tells stories, helps with homework through Socratic questioning, and provides emotional support
- What parents can see in the dashboard (mood trends, topics explored, alerts, time spent)

Key talking points:
- Sakhi supports 7 Indian languages including Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and English
- Sakhi never gives direct answers to homework — it guides children through questions
- Hume AI emotion detection analyses the child's voice tone in real-time
- Sakhi adapts its tone: more supportive when a child is sad, more celebratory when excited
- Parents get weekly summaries, mood trends, and alerts if Sakhi notices anything concerning

Keep responses concise (2-3 sentences max). Be warm, confident, and reassuring.
Speak in a way that a parent would trust with their child.
Do not use any complex formatting, emojis, or special characters in your responses.
You are having a voice conversation — speak naturally."""


class SakhiDemoAgent(Agent):
    """Parent-facing Sakhi demo agent."""

    def __init__(self, room: rtc.Room) -> None:
        super().__init__(instructions=SAKHI_DEMO_PROMPT)
        self._room = room
        self._current_emotion: str | None = None

    async def on_user_turn_completed(self, turn_ctx, new_message):
        """
        Called before the LLM generates each response.
        Reads emotion from the local participant's attributes —
        the emotion detector task sets these via set_attributes().
        """
        try:
            # The emotion detector sets attributes on the local participant
            attrs = self._room.local_participant.attributes
            if attrs and "emotion" in attrs:
                self._current_emotion = attrs.get("emotion")

            if self._current_emotion:
                turn_ctx.add_message(
                    role="system",
                    content=(
                        f"[Emotion context — DO NOT read this aloud] "
                        f"The parent's voice tone suggests they are feeling: {self._current_emotion}. "
                        f"Adapt your response accordingly — be extra empathetic if they sound worried "
                        f"or concerned, match their energy if excited. "
                        f"Never reveal that you are detecting their emotions."
                    ),
                )
        except Exception as e:
            logger.debug(f"Emotion injection skipped: {e}")


async def create_sakhi_demo_session(ctx: agents.JobContext) -> AgentSession:
    """Create, start, and return the Sakhi demo voice session."""

    session = AgentSession(
        stt=deepgram.STT(model="nova-3", language="multi"),
        llm=groq.LLM(model="llama-3.1-8b-instant"),
        tts=deepgram.TTS(model="aura-2-asteria-en"),
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
    )

    await session.start(
        room=ctx.room,
        agent=SakhiDemoAgent(room=ctx.room),
        room_input_options=RoomInputOptions(),
    )

    # Greet the parent when they join
    await session.generate_reply(
        instructions=(
            "Greet the parent warmly. Tell them you're Sakhi, an AI companion for Indian children, "
            "and invite them to ask anything about how you work. Keep it to 2 sentences."
        )
    )

    return session
