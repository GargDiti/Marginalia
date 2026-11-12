# Marginalia — a quieter corner of the internet

A MERN blogging app for writers and readers. The client is a responsive React + Vite app with React Router, Axios, Tailwind CSS and a small set of editorial component styles. The API is Express and MongoDB with JWT sessions.

## Folder structure

```text
blogging_platform/
├── client/
│   ├── src/
│   │   ├── components/   # Shared buttons, cards, navigation and feedback
│   │   ├── context/      # Authentication and appearance preferences
│   │   ├── pages/        # Reserved for page modules as the app grows
│   │   ├── services/     # Axios API client
│   │   ├── App.jsx       # Routes and page composition
│   │   └── styles.css    # Responsive editorial design system
│   ├── index.html
│   └── vite.config.js
└── server/
    └── src/
        ├── config/       # MongoDB connection
        ├── controllers/  # Request handlers
        ├── middleware/   # Authentication and API errors
        ├── models/       # User, Post and Comment schemas
        ├── routes/       # REST endpoints, including image upload
        └── utils/        # JWT helpers
```

## Run locally

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Copy `server/.env.example` to `server/.env`. Set `MONGO_URI` and replace `JWT_SECRET` with a long random value. Set `CLIENT_URL` to the client origin if it differs from `http://localhost:5173`.
3. In `server/`, run `npm install` and then `npm run dev`. The API listens on port 3000 by default.
4. Copy `client/.env.example` to `client/.env` if the API isn't at `http://localhost:3000/api`.
5. In `client/`, run `npm install` and `npm run dev`. Open the Vite URL, usually `http://localhost:5173`.

The API health check is `GET /api/health`. Uploaded images are stored in `server/uploads/` and served under `/uploads/`.

## Learning the flow

1. **Backend routes:** `server/src/app.js` mounts route modules. Routes connect URLs to middleware and controller functions.
2. **Data and ownership:** Mongoose models define persisted fields. The auth middleware verifies each bearer token and attaches its user. Private post operations filter by that user, so an author cannot edit someone else's post.
3. **API service:** `client/src/services/api.js` owns the Axios base URL and adds the JWT to requests. Page code calls that shared client rather than repeating fetch setup.
4. **App state:** `AuthContext` restores the current session and clears it at token expiry. `ThemeContext` keeps light/dark mode and accent choice across visits.
5. **Pages and components:** React Router maps URLs to page components. Shared UI lives in `client/src/components/UI.jsx`; the editor saves drafts and publishes through the same post API.

## API overview

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/posts` (search `q`, filter `tag`, paginate with `page`/`limit`), `GET /api/posts/:slug`
- `GET /api/posts/mine`, `GET /api/posts/id/:id`, `POST /api/posts`, `PATCH /api/posts/:id`, `DELETE /api/posts/:id`
- `POST /api/posts/:id/like`; comments at `/api/posts/:postId/comments`
- `GET /api/users/:id`, `PATCH /api/users/me`, `PATCH /api/users/me/password`
- `POST /api/upload` multipart field `image`

## Notes

The frontend uses a bearer JWT in browser storage to match the existing token-based API. For production deployments that control both client and API origins, an HttpOnly, Secure, SameSite cookie is a stronger option. Local image storage is intended for development; use object storage such as Cloudinary or S3 for a multi-instance production deployment.
