# The Right Way

A modern, feature-rich to-do list application with cloud sync, Google Calendar integration, and offline support.

## 🌐 Live Demo

**Production:** [https://sebagruia.github.io/TheRightWay/](https://sebagruia.github.io/TheRightWay/)

## ✨ Features

### Core Functionality

- **📝 Task Management** - Create, edit, and organize tasks into custom lists
- **✅ Todo Lists** - Multiple lists with drag-and-drop organization
- **⏰ Reminders** - Set and manage reminders for your tasks
- **📅 Google Calendar Integration** - Sync tasks to Google Calendar events
- **🔄 Cloud Sync** - Firebase-powered real-time synchronization across devices
- **📱 Progressive Web App** - Install on mobile/desktop, works offline
- **🌙 Responsive Design** - Optimized for all screen sizes

### Technical Features

- **Authentication** - Email/password and Google OAuth sign-in
- **Real-time Updates** - Live data synchronization with Firebase Firestore
- **Offline First** - Service worker caching for offline functionality
- **State Management** - Redux with persist for seamless user experience
- **TypeScript** - Full type safety across the application

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for backend)
- Google Cloud project (for Calendar integration)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/TheRightWay.git
cd TheRightWay
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Firebase Client Configuration (exposed to browser)
VITE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_APP_ID_FIREBASE=1:123456789012:web:abcdef1234567890abcdef
VITE_AUTH_DOMAIN_FIREBASE=your-app-name.firebaseapp.com
VITE_PROJECT_ID_FIREBASE=your-app-name
VITE_STORAGE_BUCKET_FIREBASE=your-app-name.appspot.com
VITE_MESSAGING_SENDER_ID_FIREBASE=123456789012
VITE_MEASUREMENT_ID_FIREBASE=G-XXXXXXXXXX

# Firebase Admin SDK (server-side only - NOT exposed)
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-app-name
FIREBASE_PRIVATE_KEY_ID=1234567890abcdef1234567890abcdef12345678
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...[TRUNCATED]\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-app-name.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789012345678901
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-app-name.iam.gserviceaccount.com
```

> ⚠️ **Note:** Replace all placeholder values with your actual Firebase credentials. Get these from your Firebase Console > Project Settings.

4. **Start development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command                  | Description                           |
| ------------------------ | ------------------------------------- |
| `npm run dev`            | Start development server on port 3000 |
| `npm run build`          | Build production bundle to `dist/`    |
| `npm run preview`        | Preview production build locally      |
| `npm run lint`           | Run ESLint code checks                |
| `npm run prettier:check` | Check code formatting                 |
| `npm run prettier:fix`   | Auto-fix code formatting              |
| `npm test`               | Run test suite                        |

## 🏗️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Router v7** - Routing
- **React Bootstrap** - UI components
- **SCSS Modules** - Scoped styling
- **React Hook Form** - Form validation

### Backend & Services

- **Firebase Auth** - User authentication
- **Firebase Firestore** - Cloud database
- **Firebase Admin SDK** - Server-side operations
- **Google Calendar API** - Calendar integration
- **Vercel Serverless Functions** - API endpoints

### PWA & Performance

- **Vite PWA Plugin** - Progressive Web App features
- **Workbox** - Service worker management
- **Web Vitals** - Performance monitoring

## 📁 Project Structure

```
├── api/                      # Vercel serverless functions
│   ├── _lib/                 # Shared utilities
│   │   ├── firebase.ts       # Firebase Admin helpers
│   │   ├── googleCalendar.ts # Google Calendar API
│   │   └── types.ts          # Type definitions
│   ├── auth/                 # Authentication endpoints
│   └── calendar/             # Calendar endpoints
├── src/
│   ├── components/           # React components
│   ├── pages/                # Page components
│   ├── redux/                # Redux store, actions, reducers
│   ├── firebase/             # Firebase client config
│   ├── api/                  # API client functions
│   ├── interfaces/           # TypeScript interfaces
│   ├── styles/               # Global styles
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
└── vite.config.js            # Vite configuration
```

## 🔐 Authentication

The app supports two authentication methods:

1. **Email/Password** - Traditional registration with email verification
2. **Google OAuth** - One-click sign-in with Google account

## 🌍 Deployment

### Deploy to Vercel

1. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure settings:
     - Framework: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`

2. **Add Environment Variables**

   - Navigate to **Settings > Environment Variables**
   - Add all environment variables from `.env` (see Installation step 3)
   - ⚠️ For `FIREBASE_PRIVATE_KEY`, preserve `\n` newline characters

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app with serverless functions

### Local Testing with Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run local development with serverless functions
vercel dev
```

## 🔄 API Endpoints

| Endpoint                 | Method | Description                   |
| ------------------------ | ------ | ----------------------------- |
| `/api/auth/store-tokens` | POST   | Store Google OAuth tokens     |
| `/api/calendar/events`   | POST   | Create Google Calendar events |

## 🤝 Contributing

### Branching Strategy

- `main` - Production branch (stable releases)
- `develop` - Development branch (active development)
- `feature/[name]` - New features
- `hotfix/[name]` - Urgent bug fixes

### Workflow

1. Create feature branch from `develop`
2. Make changes and commit
3. Open PR to `develop`
4. After review, merge to `develop`
5. Periodically merge `develop` to `main` for releases

## 📝 License

This project is private and not licensed for public use.

## 🐛 Known Issues & Troubleshooting

**Issue: Firebase errors on deployment**

- Solution: Verify all environment variables are set correctly in Vercel
- Check `FIREBASE_PRIVATE_KEY` has proper newlines (`\n`)

**Issue: Google Calendar integration not working**

- Solution: Ensure OAuth consent screen is properly configured in Google Cloud Console
- Verify redirect URIs include your deployed domain

**Issue: PWA not installing**

- Solution: Ensure app is served over HTTPS
- Check manifest.json is properly configured

## 👨‍💻 Developer

Created and maintained by Sebastian Gruia

---

**Status:** 🚧 Continuous Development
