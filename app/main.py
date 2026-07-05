from fastapi import FastAPI
from sqlalchemy import text
import app.models
from app.api.v1.auth import router as auth_router
from app.db.database import engine
from app.api.v1.users import router as user_router


app = FastAPI(
    title="Inquira",
    version="1.0.0"
)
app.include_router(auth_router)
app.include_router(user_router)

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