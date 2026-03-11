"""
Hume Emotion Client — Uses Hume's official Python SDK.
Sends audio chunks via the streaming API and returns emotion predictions.
"""

import io
import wave
import logging
import os
import tempfile

logger = logging.getLogger(__name__)

# Emotion-to-avatar expression mapping
# Maps Hume's 48 granular emotions to 6 Sakhi avatar expressions
EMOTION_TO_EXPRESSION = {
    "Joy": "happy",
    "Amusement": "happy",
    "Contentment": "happy",
    "Satisfaction": "happy",

    "Excitement": "excited",
    "Surprise (positive)": "excited",
    "Ecstasy": "excited",
    "Triumph": "excited",

    "Interest": "thinking",
    "Contemplation": "thinking",
    "Concentration": "thinking",
    "Confusion": "thinking",
    "Realization": "thinking",
    "Determination": "thinking",

    "Pride": "celebrating",
    "Admiration": "celebrating",

    "Sadness": "sad",
    "Disappointment": "sad",
    "Nostalgia": "sad",
    "Tiredness": "sad",
    "Boredom": "sad",

    "Distress": "concerned",
    "Anxiety": "concerned",
    "Fear": "concerned",
    "Awkwardness": "concerned",
    "Doubt": "concerned",
    "Empathic Pain": "concerned",
    "Horror": "concerned",
    "Shame": "concerned",
}

DEFAULT_EXPRESSION = "happy"


def map_emotion_to_expression(emotion_name: str) -> str:
    return EMOTION_TO_EXPRESSION.get(emotion_name, DEFAULT_EXPRESSION)


def wrap_pcm_as_wav(pcm_bytes: bytes, sample_rate: int = 48000, channels: int = 1, sample_width: int = 2) -> bytes:
    """Wrap raw PCM bytes in a WAV container."""
    wav_io = io.BytesIO()
    with wave.open(wav_io, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(sample_rate)
        wf.writeframes(pcm_bytes)
    return wav_io.getvalue()


class HumeEmotionClient:
    """
    Emotion analysis using the official Hume Python SDK.
    Creates a fresh streaming connection per audio chunk (the streaming API
    is designed for short-lived per-request connections, not persistent ones).
    """

    def __init__(self, api_key: str):
        self.api_key = api_key
        self._client = None

    async def connect(self):
        """Initialise the async Hume client."""
        try:
            from hume import AsyncHumeClient
            self._client = AsyncHumeClient(api_key=self.api_key)
            logger.info("Hume AsyncHumeClient ready")
        except Exception as e:
            logger.error(f"Failed to initialise Hume client: {e}")

    async def disconnect(self):
        """No persistent connection to close with SDK approach."""
        self._client = None

    async def analyze_audio(self, pcm_bytes: bytes) -> dict | None:
        """
        Analyse a PCM audio chunk for prosody emotions.
        Writes to a temp WAV file, sends via the streaming SDK, parses results.
        """
        if not self._client:
            logger.warning("Hume client not initialised")
            return None

        try:
            from hume.expression_measurement.stream import Config

            # Write PCM to a temp WAV file (SDK needs a file path)
            wav_bytes = wrap_pcm_as_wav(pcm_bytes)
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
                tmp.write(wav_bytes)
                tmp_path = tmp.name

            try:
                async with self._client.expression_measurement.stream.connect() as socket:
                    result = await socket.send_file(
                        tmp_path,
                        config=Config(prosody={}),
                    )

                # Parse predictions from the result
                prosody = result.prosody
                if not prosody or not prosody.predictions:
                    return None

                emotions = prosody.predictions[0].emotions
                if not emotions:
                    return None

                sorted_emotions = sorted(emotions, key=lambda e: e.score, reverse=True)
                top_3 = [{"name": e.name, "score": round(e.score, 4)} for e in sorted_emotions[:3]]
                top_emotion = top_3[0]
                expression = map_emotion_to_expression(top_emotion["name"])

                logger.info(f"Hume result: {top_emotion['name']} ({top_emotion['score']:.3f}) → {expression}")
                return {
                    "top_emotion": top_emotion["name"],
                    "top_score": top_emotion["score"],
                    "avatar_expression": expression,
                    "top_3": top_3,
                }

            finally:
                import os as _os
                try:
                    _os.unlink(tmp_path)
                except Exception:
                    pass

        except Exception as e:
            logger.error(f"Hume analysis error: {e}")
            return None
