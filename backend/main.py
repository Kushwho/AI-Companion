"""
Sakhi Demo Backend — FastAPI Server
Provides demo token generation and health check endpoints.
"""

import os
import time
import json
from datetime import timedelta

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from livekit import api

load_dotenv(".env.local")  # local dev
load_dotenv()               # production fallback (Docker env vars / .env)

app = FastAPI(title="Sakhi Demo Backend", version="0.1.0")

# CORS — allow landing page origins (Vercel + local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8080",
        "https://*.vercel.app",  # Vercel previews
        "*",  # TODO: restrict in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LIVEKIT_URL = os.getenv("LIVEKIT_URL")
LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")


@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "service": "sakhi-demo-backend",
        "timestamp": int(time.time()),
    }


@app.post("/api/demo-token")
async def create_demo_token():
    """
    Create a short-lived LiveKit room for the demo experience.
    No auth required — this is a public demo endpoint.
    Dispatches the Sakhi demo agent + emotion detector into the room.
    Returns a signed LiveKit token for the frontend to join.
    """
    if not all([LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET]):
        raise HTTPException(status_code=500, detail="LiveKit credentials not configured")

    room_name = f"sakhi-demo-{int(time.time())}"
    participant_identity = f"demo-parent-{int(time.time())}"

    # Create a LiveKit API client
    lkapi = api.LiveKitAPI(
        url=LIVEKIT_URL,
        api_key=LIVEKIT_API_KEY,
        api_secret=LIVEKIT_API_SECRET,
    )

    try:
        # Create the room with metadata
        room_metadata = json.dumps({
            "session_type": "demo",
            "persona": "parent",
        })

        await lkapi.room.create_room(
            api.CreateRoomRequest(
                name=room_name,
                empty_timeout=300,  # 5 min timeout
                max_participants=5,
                metadata=room_metadata,
            )
        )

        # Dispatch the Sakhi demo agent (includes emotion detection as a concurrent task)
        await lkapi.agent_dispatch.create_dispatch(
            api.CreateAgentDispatchRequest(
                agent_name="sakhi-demo-agent",
                room=room_name,
            )
        )

        # Generate an access token for the participant
        token = (
            api.AccessToken(
                api_key=LIVEKIT_API_KEY,
                api_secret=LIVEKIT_API_SECRET,
            )
            .with_identity(participant_identity)
            .with_name("Demo Parent")
            .with_grants(
                api.VideoGrants(
                    room_join=True,
                    room=room_name,
                    can_publish=True,
                    can_subscribe=True,
                )
            )
            .with_ttl(timedelta(minutes=10))  # 10-minute TTL
            .to_jwt()
        )

        return {
            "token": token,
            "room_name": room_name,
            "livekit_url": LIVEKIT_URL,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create demo session: {str(e)}")
    finally:
        await lkapi.aclose()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
