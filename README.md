# ZomatoFlix 🍔🎬

A full-stack food discovery app with a TikTok-style reel feed. Browse short food video reels, like what you crave, and discover nearby food partners. Food partners can create their own food reels and manage their profile.

## ✨ Features

- **Reel-style feed** — swipe through short food videos
- **Dual authentication** — separate login/register flows for Users and Food Partners
- **Food creation** — partners can upload food reels with media (ImageKit / Cloudinary)
- **Likes** — like food reels
- **Partner profiles** — view a food partner's page and their creations

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **JWT** (cookie-based auth) + **bcryptjs**
- **Multer** for uploads, **ImageKit** / **Cloudinary** for media storage

### Frontend
- **React 19** + **Vite**
- **React Router 7**
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **Axios** for API calls

## 📁 Project Structure

```
ZomatoFlix/
├── Backend/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── Controllers/     # auth, food, foodPartner
│       ├── db/              # MongoDB connection
│       ├── middlewares/     # auth middleware
│       ├── models/          # User, FoodPartner, Food, Likes
│       ├── routes/          # API routes
│       └── services/        # storage service
└── Frontend/
    └── src/
        ├── Components/      # Navbar, reelFeed
        ├── Pages/           # auth, foodPartner, General
        ├── routes/          # AppRoutes
        └── styles/          # CSS modules
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Media storage (ImageKit)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default (Vite).

## 🔗 API Overview

| Route | Description |
|---|---|
| `/api/auth` | User & food partner register/login |
| `/api/food` | Food reels (create, list, like) |
| `/api/food-partner` | Food partner profile & details |

## 📝 License

ISC
