"""
Topic Detector — Background task within the Sakhi agent session.
Polls the agent session's chat context for new user messages every ~15 seconds,
uses the LLM to extract up to 3 topics, and sends them to the frontend via RPC.
"""

import logging
import asyncio
import json

from livekit import agents, rtc
from livekit.agents import AgentSession
from livekit.plugins import groq

logger = logging.getLogger(__name__)

async def run_topic_detection(ctx: agents.JobContext, session: AgentSession):
    """
    Background topic detection task.
    Reads the transcript from the session and uses an LLM to extract topics.
    """
    logger.info("Starting topic detection task")
    
    # Use the same Groq model for topic extraction
    llm = groq.LLM(model="llama-3.1-8b-instant")
    
    last_processed_index = 0
    poll_interval = 15.0

    try:
        # Wait for a participant to join
        participant = None
        while not participant:
            for p in ctx.room.remote_participants.values():
                if p.kind != rtc.ParticipantKind.PARTICIPANT_KIND_AGENT:
                    participant = p
                    break
            if not participant:
                await asyncio.sleep(1.0)
                
        logger.info(f"Topic detection connected to participant: {participant.identity}")

        while True:
            await asyncio.sleep(poll_interval)
            
            # Extract transcript from chat context
            chat_ctx = session.history
            if not chat_ctx:
                continue
                
            messages = chat_ctx.messages
            if callable(messages):
                messages = messages()
                
            if len(messages) <= last_processed_index:
                # No new messages
                continue
                
            # Collect all new messages from the user
            new_user_messages = []
            for i in range(last_processed_index, len(messages)):
                msg = messages[i]
                if msg.role == "user":
                    text = msg.text_content
                    if text:
                        new_user_messages.append(text)
            
            last_processed_index = len(messages)
            
            if not new_user_messages:
                continue
                
            combined_text = " ".join(new_user_messages)
            if len(combined_text.strip()) < 5:
                continue
                
            logger.info(f"Analyzing topics for new speech: {combined_text}")
            
            # Send to LLM
            prompt = (
                f"Extract up to 3 short topics (1-3 words each) from the following text spoken by a child. "
                f"Return ONLY a raw JSON array of strings, nothing else. Example: [\"math\", \"friends\", \"space\"]\n\nText: {combined_text}"
            )
            
            try:
                response_text = ""
                async with llm.chat(
                    chat_ctx=agents.ChatContext(
                        items=[agents.ChatMessage(role="user", content=[prompt])]
                    )
                ) as stream:
                    async for chunk in stream:
                        if chunk.delta and getattr(chunk.delta, 'content', None):
                            response_text += chunk.delta.content
                
                # Parse the response (assume it's JSON array or clean it up)
                response_text = response_text.strip()
                # Clean up markdown if any
                if response_text.startswith("```json"):
                    response_text = response_text[7:]
                if response_text.startswith("```"):
                    response_text = response_text[3:]
                if response_text.endswith("```"):
                    response_text = response_text[:-3]
                    
                topics = json.loads(response_text.strip())
                if isinstance(topics, list) and topics:
                    # Dispatch via RPC
                    logger.info(f"Detected topics: {topics}")
                    payload = json.dumps({"topics": topics[:3]})
                    
                    await ctx.room.local_participant.perform_rpc(
                        destination_identity=participant.identity,
                        method="setTopics",
                        payload=payload,
                        response_timeout=3.0,
                    )
            except Exception as e:
                logger.warning(f"Failed to parse or send topics: {e}")
                
    except asyncio.CancelledError:
        logger.info("Topic detection cancelled")
    except Exception as e:
        logger.error(f"Topic detection error: {e}", exc_info=True)
