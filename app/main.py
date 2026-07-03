from fastapi import FastAPI
from sqlalchemy import text

from app.db.database import engine

app = FastAPI(
    title="Inquira",
    version="1.0.0"
)


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