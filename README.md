# QuranShikho - AI-Powered Quran Learning Platform

## Description
QuranShikho is a Next.js platform to learn Quranic Arabic word by word. It blends curated vocabulary, contextual examples, and simple practice flows so learners can understand Quranic words with clarity.

## Features
- Curated Quranic words with meanings, transliterations, and examples
- Authenticated flows for adding and managing custom words
- Protected routes for contributors (Add Word, Manage Words)
- Responsive UI with gradients and reusable components
- Search and filter words by difficulty and category
- Word detail pages with pronunciation guidance and related terms
- Latest words feed from the backend API
- Firebase authentication (Email/Password + Google)
- Express.js backend with in-memory word store (sample data)
- Toast notifications, loading spinners, and friendly error states

## Tech Stack
- Next.js 14 (App Router)
- Firebase Authentication
- Express.js (Node.js API)
- TailwindCSS
- React Icons

## Firebase Setup
1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a Web app; copy the config values (API key, auth domain, project ID, storage bucket, messaging sender ID, app ID).
3. Enable authentication methods: **Authentication > Sign-in method** ? turn on **Email/Password** and **Google**.
4. Add your config to `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```
5. Restart `npm run dev` after editing env files.

## Installation
### Prerequisites
- Node.js 18+
- npm (comes with Node)

### Clone and install (root)
```bash
git clone <repo-url>
cd quranshikho
npm install
```

### Install server dependencies
```bash
npm install --prefix server
```

### Environment variables
- Create `.env.local` in the repo root with your Firebase config (see above).
- Create `server/.env` with:
  ```
  PORT=5000
  ```

### Run development servers
- Start the backend API: `npm run server`
- Start Next.js: `npm run dev`

## Routes
- Public: `/`, `/words`, `/words/[id]`, `/login`, `/register`
- Protected: `/add-word`, `/manage-words`

## API Endpoints (Express)
- `GET /api/words` — list all words
- `GET /api/words/:id` — get a single word
- `GET /api/words/user/:userId` — list words by creator
- `POST /api/words` — add a word (expects body with arabic, english, etc.)
- `DELETE /api/words/:id` — delete a word

## Screenshots
- (Add homepage, words list, word detail, auth, and dashboard screenshots here.)

## Future Features
- Persistent database storage
- Spaced-repetition review flow
- Audio recitation for words/examples
- User progress and achievements
- Multi-language UI support

## License
MIT
