# Inquira

> An AI-powered Research Workflow Assistant that helps users upload, search, summarize, and chat with research papers using Retrieval-Augmented Generation (RAG).

## Overview

Inquira is a full-stack web application designed to simplify the research process. Users can organize research projects, upload PDF documents, generate AI-powered summaries, perform semantic searches, and interact with their documents through a conversational interface. The system combines modern web technologies with Large Language Models and vector search to provide accurate, context-aware responses.

## Features

- Secure JWT Authentication
- Project Management
- PDF Upload and Processing
- AI-powered Chat with Documents
- Retrieval-Augmented Generation (RAG)
- Semantic Search using Vector Embeddings
- AI-generated Research Paper Summaries
- PostgreSQL Database Integration
- Qdrant Vector Database
- RESTful API with FastAPI
- Responsive React Frontend
- Docker Containerization
- AWS EC2 Deployment

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- Python
- JWT Authentication

### AI & Machine Learning
- Google Gemini
- LangChain
- Sentence Transformers
- Retrieval-Augmented Generation (RAG)

### Database
- PostgreSQL
- Qdrant Vector Database

### DevOps
- Docker
- AWS EC2
- Git & GitHub

## Architecture

```text
                +------------------+
                |      User        |
                +--------+---------+
                         |
                         v
              +----------------------+
              |   React Frontend     |
              +----------+-----------+
                         |
                    REST API
                         |
                         v
              +----------------------+
              |   FastAPI Backend    |
              +----------+-----------+
                         |
      +------------------+------------------+
      |                                     |
      v                                     v
+-------------+                    +-----------------+
| PostgreSQL  |                    |     Qdrant      |
|  Database   |                    | Vector Database |
+-------------+                    +--------+--------+
                                            |
                                            v
                                   +------------------+
                                   | Google Gemini    |
                                   | + LangChain      |
                                   +------------------+
```

## Project Structure

```text
Inquira/
├── backend/
│   ├── routers/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── database/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── docker-compose.yml
├── requirements.txt
└── README.md
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/jmanasareddy12/Inquira.git
cd Inquira
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Run with Docker

```bash
docker compose up --build
```

## API Modules

- Authentication
- Projects
- Documents
- AI Chat
- Summaries
- Search

## Future Improvements

- Cross-project semantic search
- Notes and bookmarks
- Citation export (APA, IEEE, BibTeX)
- OCR support for scanned documents
- Research paper recommendations
- Multi-user collaboration
- Support for multiple LLM providers

## Deployment

The application is containerized using Docker and deployed on AWS EC2 for scalable and reliable hosting.

## License

This project is intended for educational and academic purposes.
