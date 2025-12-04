# Kantin-Tracker

KantinTracker — Sistem ketersediaan makanan kantin secara live.

This repository contains a minimal scaffold for the KantinTracker project: a React frontend and an Express backend with MongoDB. It implements:

- Authentication (JWT + bcrypt)
- CRUD for menu items (name, price, status, image)
- Image upload from frontend to backend (served from `/uploads`)

See `backend/README.md` and `frontend/README.md` for setup and run instructions.

Quick notes:
- Seed script: run `cd backend && npm run seed` to create a test seller `seller@example.com` with password `password123` (use only for local testing).
- Backend exposes `/api/auth` and `/api/foods` endpoints. Frontend expects the API at `VITE_API_URL` (defaults to `http://localhost:5000/api`).

If you want me to tailor the scaffold for a specific environment (e.g., Docker, Railway, Vercel) or to actually initialize the project with a live MongoDB, tell me your preferred deployment target and I will add deployment instructions and manifest files.

---
Project files added by the assistant:

- `backend/` — Express API, Mongoose models, auth, upload handling
- `frontend/` — React (Vite) app with Login/Register/Dashboard/Menu form

Provide your MongoDB connection string (or a free MongoDB Atlas URI) and preferred JWT secret in order to run the backend locally.
