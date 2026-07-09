from fastapi import FastAPI
from sqlalchemy import text
import app.models
from app.api.v1.auth import router as auth_router
from app.db.database import engine
from app.api.v1.users import router as user_router
from app.api.v1.projects import router as project_router
from app.api.v1.documents import router as document_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.search import router as search_router
from app.api.v1.chat import router as chat_router



app = FastAPI(
    title="Inquira",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(project_router)
app.include_router(document_router)
app.include_router(search_router)
app.include_router(chat_router)



@app.get("/")
def root():
    return {"message": "Welcome to Inquira "}


@app.get("/health/db")
def database_health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {
            "status": "success",
            "database": "Connected"
        }
    except Exception as e:
        return {
            "status": "failed",
            "error": str(e)
        }