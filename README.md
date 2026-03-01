**Shortly — URL Shortener**

Shortly is a lightweight URL shortener service with a React frontend and a Node.js backend. It provides link creation, redirection, and simple analytics. It also includes Redis-based caching and Express rate-limiting for improved performance and abuse protection.


**Quick Start**
- **Prerequisites:** Node.js 16+ and npm/yarn.
- **Install backend deps:** `cd backend && npm install`
- **Install frontend deps:** `cd frontend && npm install`
- **Run backend:** from `backend` run `npm start` or `node index.js` (use whichever script is defined).
- **Run frontend:** from `frontend` and run `npm run dev`.
**Project Layout**
- **Backend:** [backend](backend)
  - **Entry:** [backend/index.js](backend/index.js)
  - **Controllers:** [backend/controllers/urlController.js](backend/controllers/urlController.js)
  - **Database helpers:** [backend/database/initdb.js](backend/database/initdb.js), [backend/database/pool.js](backend/database/pool.js)
  - **Middleware:** [backend/middleware/ratelimiter.js](backend/middleware/ratelimiter.js)
  - **Socket/client connect:** [backend/clientConnect.js](backend/clientConnect.js)
- **Frontend:** [frontend](frontend)
  - **Main app:** [frontend/src/App.jsx](frontend/src/App.jsx)
  - **Shortener UI:** [frontend/src/Shortener.jsx](frontend/src/Shortener.jsx)
  - **Analytics view:** [frontend/src/Analytics.jsx](frontend/src/Analytics.jsx)

**Environment**
- The backend uses a `.env` file in `backend/`. Typical variables:
  - `PORT` — port backend listens on (e.g. `5000`).
  - `DATABASE_URL` or DB connection variables used by `database/pool.js`.
  - `REDIS_URL` or `REDIS_HOST`/`REDIS_PORT` — Redis connection used for caching (optional but recommended).
  - Any additional keys required by your DB or hosting environment.

Create a `backend/.env` with values appropriate for your setup. Do not commit secrets.

**API (common endpoints)**
- `POST /api/shorten` — create a short URL. Expect JSON payload like `{ "url": "https://example.com" }` and returns shortened record.
- `GET /:shortId` — redirect to the original URL (handled by `urlController`).
- `GET /api/analytics/:shortId` — return simple analytics/stats for a short link.

Notes: the exact route prefixes may vary (check [backend/controllers/urlController.js](backend/controllers/urlController.js)). Rate limiting is applied via [backend/middleware/ratelimiter.js](backend/middleware/ratelimiter.js).


**Development**
- Use the frontend dev server (Vite) for UI hot-reload: from `frontend` run `npm run dev`.
- Use `nodemon` in backend for auto-restart while developing (install globally or as a dev dependency): `npx nodemon index.js`.
- To test end-to-end locally, start backend, then frontend and use the UI to create and open short links.

**Contributing**
- Fork, add features or fixes, and send a PR. Keep changes small and focused.

