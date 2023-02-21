import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
} from '../config';
import {initializeApp} from 'firebase/app';
import {initializeAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

export const fireAuth = initializeAuth(app);
