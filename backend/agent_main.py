"""
Sakhi Demo — LiveKit Agent Server Entrypoint
"""

from dotenv import load_dotenv

load_dotenv(".env.local")

import asyncio
import logging

from livekit import agents
from livekit.agents import AgentServer, AgentSession

from agents.sakhi_demo import create_sakhi_demo_session
from agents.emotion_detector import run_emotion_detection
from agents.topic_detector import run_topic_detection

logger = logging.getLogger(__name__)
server = AgentServer()


@server.rtc_session(agent_name="sakhi-demo-agent")
async def sakhi_demo_entrypoint(ctx: agents.JobContext):
    """
    Single session that runs the Sakhi voice agent,
    then starts emotion detection once the session and participant are ready.
    """
    # Start the voice session and capture the AgentSession object
    session = await create_sakhi_demo_session(ctx)

    # Now kick off emotion detection — session is started, participant is known
    # Fire as a background task so it doesn't block the voice session
    asyncio.create_task(
        run_emotion_detection(ctx, session),
        name="emotion-detection",
    )
    
    # Kick off topic detection task to analyze transcript using Groq
    asyncio.create_task(
        run_topic_detection(ctx, session),
        name="topic-detection",
    )


if __name__ == "__main__":
    agents.cli.run_app(server)
