# Deploying linkedinclone to Render (Docker)

This repository contains two services:

- `backend/` — Spring Boot application (Java)
- `frontend/` — Vite/React frontend

This document explains how to deploy both services on Render using Docker.

---

## 1) Backend (Docker Web Service)

1. Ensure `backend/Dockerfile` is present (multi-stage build produces `app.jar`).
2. Build the app locally to validate:

```bash
cd backend
mvn -DskipTests package
```

3. Push your code to GitHub (this repo).

4. On Render dashboard, Create → New Web Service → Connect to GitHub repo.
   - Select the `backend` folder as the root (Render detects Dockerfile automatically).
   - Set Environment: `PORT=8080` (Render sets $PORT by default but we expose 8080 in Dockerfile).
   - Add any required environment variables (database creds, JWT secret, etc.) in Render's UI.

5. Deploy and monitor logs on Render.

---

## 2) Frontend (Static Site or Docker Web Service)

Option A — Static Site (recommended for Vite apps)

1. In Render, Create → Static Site → Connect to GitHub repo.
2. Set the root to `/frontend`.
3. Build command: `npm ci && npm run build`
4. Publish directory: `dist`
5. Set environment variable `VITE_API_URL` to your backend URL (e.g., `https://your-backend.onrender.com/api`).

Option B — Docker Web Service

1. Use the provided `frontend/Dockerfile`.
2. Create a Web Service on Render using the `frontend` folder and Dockerfile.

---

## 3) Database

- If your backend requires PostgreSQL/MySQL, create a managed DB on Render and provide the connection URL to the backend via environment variables.

---

## 4) Notes

- Make sure CORS in backend allows the frontend origin.
- Use Render's environment variables feature to store secrets.
- If you prefer building images locally, you can push them to Docker Hub and instruct Render to use an image instead of building from repo.
