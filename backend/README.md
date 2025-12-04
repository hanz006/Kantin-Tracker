# KantinTracker — backend

Quick start (backend):

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the server (development):

```bash
npm run dev
```

4. (Optional) Create a test seller user for admin actions

```bash
# after installing dependencies and setting .env
npm run seed
# creates seller@example.com / password: password123
```

API endpoints (basic):

- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password } -> { token }
- GET /api/menus
- POST /api/menus (auth, multipart form-data: image) { name, price, status }
- PUT /api/menus/:id (auth, multipart form-data)
- DELETE /api/menus/:id (auth)

Uploaded images are served at `/uploads/<filename>`.
