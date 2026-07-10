// ─── Firebase client SDK (browser) ──────────────────────────────
// Initializes a single Firebase app instance and exports the
// Auth, Firestore, and Storage services used throughout the app.
//
// Services initialize lazily — only when the web config is present —
// so the app builds and runs in "demo mode" before keys are added.
// Every call site guards on `isFirebaseConfigured` before using them.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * True when the Firebase web config is present. Lets the app run in
 * "demo mode" locally before the project keys are added — auth-gated
 * pages stay viewable instead of crashing.
 */
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;
let _storage: FirebaseStorage | undefined;

if (isFirebaseConfigured) {
  _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  _auth = getAuth(_app);
  // In the browser, keep a persistent local cache (IndexedDB): when the
  // internet connection flaps, already-loaded rosters/classes still display
  // instead of erroring. Falls back to the default store on hot-reload or
  // unsupported browsers; on the server (SSR/build) use the plain store.
  if (typeof window !== 'undefined') {
    try {
      _db = initializeFirestore(_app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
    } catch {
      _db = getFirestore(_app);
    }
  } else {
    _db = getFirestore(_app);
  }
  _storage = getStorage(_app);
}

// Cast to the non-undefined type for ergonomic imports. These are only
// ever touched after an `isFirebaseConfigured` check, so they're safe.
export const auth = _auth as Auth;
export const db = _db as Firestore;
export const storage = _storage as FirebaseStorage;
export default _app;
