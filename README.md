#ReactSearchUI

A minimal full-stack search application using React (Vite) on the frontend and FastAPI + Pandas on the backend.
Designed as a clean, scalable starting point for search-driven UIs.

Features

⚡ FastAPI backend with JSONL data source
📊 Pandas-powered filtering, sorting, and pagination
🔁 Live reload for frontend and backend during development
🧱 Clean separation of frontend and backend concerns
🔌 Ready to scale to CSV, larger JSONL files, or a database later


#Requirements

Node.js 18+
Python 3.10+



#Backend Setup (FastAPI)

  cd backend
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt

  
#To RUN BACKEND  

  uvicorn main:app --reload --port 8001

  
#API Endpoints

Endpoint	Description
/api/search?q=term	Search dataset
/api/search?q=term&sort=level&dir=desc	Sorted search
/api/reload	Reload JSONL file without restarting


#Frontend Setup (React + Vite)

  cd frontend
  npm install
  

#To RUN FRONTEND  

  npm run dev

  
#Frontend runs at:
http://localhost:5173
Backend is proxied via Vite:
/api → http://localhost:8001


Data Source

The backend reads from a JSON Lines (JSONL) file:
backend/data/spells.jsonl


JSONL was chosen for:

Easy streaming
Simple appends
Future scalability


#Development Notes

React is intentionally kept framework-light (no UI libraries)
Layout and styling are handled via simple inline styles + global CSS
Pandas provides column-aware filtering and sorting without a database
The API contract is stable and frontend-agnostic


#Future Improvements

Server-side pagination UI
Column metadata endpoint
Full-text search indexing
DuckDB or Arrow backend
Auth + saved searches
Deployment via Docker or Fly.io
