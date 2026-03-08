from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import organizations, agents, knowledge, conversations, users

app = FastAPI(title="AI Autonomous Business Agent Platform")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be restricted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(organizations.router)
app.include_router(agents.router)
app.include_router(knowledge.router)
app.include_router(conversations.router)
app.include_router(users.router)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "AI Agent API"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Autonomous Business Agent Platform API"}
