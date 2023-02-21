import Constants from 'expo-constants';
import invariant from 'tiny-invariant';

const extra = Constants.manifest?.extra;

invariant(extra?.FIREBASE_API_KEY, 'FIREBASE_API_KEY not found');
invariant(extra?.FIREBASE_AUTH_DOMAIN, 'FIREBASE_AUTH_DOMAIN not found');
invariant(extra?.FIREBASE_PROJECT_ID, 'FIREBASE_PROJECT_ID not found');
invariant(extra?.GOOGLE_EXPO_ID, 'GOOGLE_EXPO_ID not found');

export const FIREBASE_API_KEY = extra.FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = extra.FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = extra.FIREBASE_PROJECT_ID;
export const GOOGLE_EXPO_ID = extra.GOOGLE_EXPO_ID;
