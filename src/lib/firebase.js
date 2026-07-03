import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  serverTimestamp,
  set,
  update
} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const requiredConfigKeys = ["apiKey", "authDomain", "databaseURL", "projectId", "appId"];
const missingConfigKeys = requiredConfigKeys.filter((key) => {
  const value = firebaseConfig[key];
  return !value || value.startsWith("your_") || value.includes("your_project_id");
});

let app = null;
let initializationError = missingConfigKeys.length > 0
  ? `Missing Firebase configuration: ${missingConfigKeys.join(", ")}`
  : "";

if (!initializationError) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    initializationError = `Firebase initialization failed: ${error.message}`;
  }
}

export const isFirebaseConfigured = Boolean(app);
export const firebaseConfigurationError = initializationError;

if (firebaseConfigurationError) console.error(firebaseConfigurationError);

export const auth = app ? getAuth(app) : null;
export const db = app ? getDatabase(app) : null;

export { onValue, ref, remove, update };

export async function submitLeadToDb(leadData) {
  if (!db) {
    throw new Error(firebaseConfigurationError || "Firebase is not configured.");
  }

  const newLeadRef = push(ref(db, "leads"));
  const leadPayload = {
    ...leadData,
    id: newLeadRef.key,
    submittedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    lastUpdatedAt: serverTimestamp()
  };

  await set(newLeadRef, leadPayload);
  return { success: true, key: newLeadRef.key };
}
