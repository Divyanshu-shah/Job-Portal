# Deploying Job Portal — Full Guide

This project has a **Client** (React frontend) deployed on **Vercel** and a **Server** (Node.js/Express backend) deployed on **Render**.

## Live URLs

- **Frontend (Vercel):** `https://job-portal-web-application-three.vercel.app`
- **Backend (Render):** `https://job-portal-web-application-8dig.onrender.com`

## Prerequisites

1. **MongoDB Atlas**: Ensure your database allows access from anywhere (`0.0.0.0/0`) since cloud service IP addresses are dynamic.
2. **GitHub**: Push your code to a GitHub repository.

---

## Part 1: Deploy Server (Backend) on Render

1. Go to [Render Dashboard](https://dashboard.render.com) and click **"New" → "Web Service"**.
2. Connect your GitHub repository.
3. **Root Directory**: Set to `server` (since `package.json` is inside the `server/` folder, not the repo root).
4. **Build Command**: `npm install`
5. **Start Command**: `npm start` (or `node server.js`)
6. **Node Version**: Set to **20 LTS** in Render (or rely on `server/package.json` engines: `"node": "20.x"`).
   - If Render cached an older build with Node 25, use **Manual Deploy → Clear build cache & deploy**.
7. **Environment Variables** — Add the following:

   | Key          | Value                                                        |
   |------------- |--------------------------------------------------------------|
   | `MONGO_URI`  | Your MongoDB Atlas connection string                         |
   | `JWT_SECRET` | Your secret key for JWT tokens                               |
   | `PORT`       | `5000` (or any port; Render assigns its own)                 |
   | `CLIENT_URL` | `https://job-portal-web-application-three.vercel.app`        |

   > ⚠️ **Important**: `CLIENT_URL` must be your Vercel frontend URL **without a trailing slash**. This is used in the CORS configuration to allow requests from the frontend.

8. Click **Deploy**.
9. Once deployed, your backend URL will be: `https://job-portal-web-application-8dig.onrender.com`

---

## Part 2: Deploy Client (Frontend) on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
2. Import the **same** GitHub repository.
3. **Root Directory**: Set to `client`.
4. **Framework Preset**: Select **Vite**.
5. **Environment Variables** — Add the following:

   | Key            | Value                                                              |
   |--------------- |--------------------------------------------------------------------|
   | `VITE_API_URL` | `https://job-portal-web-application-8dig.onrender.com/api`         |

   > ⚠️ **Important**: Include `/api` at the end since the backend routes are prefixed with `/api`. Do **not** add a trailing slash.

6. Click **Deploy**.
7. Your frontend URL will be: `https://job-portal-web-application-three.vercel.app`

---

## How It All Connects

```
User → Vercel (React Frontend)
         ↓ API calls to VITE_API_URL
       Render (Express Backend)
         ↓
       MongoDB Atlas (Database)
```

- The frontend uses `VITE_API_URL` environment variable to know where the backend is.
- The backend uses `CLIENT_URL` environment variable to allow CORS requests from the frontend.
- Both connect to the same MongoDB Atlas database via `MONGO_URI`.

---

## Seeding the Database

To populate the database with sample data (jobs, users), run:

```bash
cd server
node seed.js
```

This will create:
- **Admin**: admin@example.com / password123
- **Recruiter**: recruiter@example.com / password123
- **Student**: student@example.com / password123
- **10 sample job listings** with ₹ (INR) salaries

> ⚠️ The seed script **clears all existing data** before inserting fresh entries.

---

## Troubleshooting

### CORS Error
If you see `Access-Control-Allow-Origin` errors:
1. Go to **Render Dashboard → Environment Variables**.
2. Verify `CLIENT_URL` is set to your exact Vercel URL (no trailing slash).
3. Save and wait for Render to redeploy.

### API Calls Failing / Network Error
1. Go to **Vercel Dashboard → Environment Variables**.
2. Verify `VITE_API_URL` is set to `https://job-portal-web-application-8dig.onrender.com/api`.
3. Redeploy on Vercel after changing env variables (env vars are baked in at build time).

### Double `/api/api` in URLs
- If `VITE_API_URL` already includes `/api`, the code should use it directly (not append `/api` again).
- The current setup: `VITE_API_URL` = `...onrender.com/api` and `api.js` uses `baseURL: import.meta.env.VITE_API_URL || '/api'`.

### Backend Not Found (Render)
- Ensure **Root Directory** is set to `server` in Render settings.
- Without this, Render looks for `package.json` at the repo root and fails with `ENOENT`.

### Render Free Tier Cold Starts
- Render's free tier spins down after 15 minutes of inactivity. The first request after inactivity may take 30-50 seconds.
- This is normal and not a bug.
