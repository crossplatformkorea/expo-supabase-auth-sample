import 'dotenv/config';
import type {ConfigContext, ExpoConfig} from '@expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'dooboo',
  slug: 'dooboo-expo-auth',
  privacy: 'public',
  platforms: ['ios', 'android', 'web'],
  version: '1.0.0',
  orientation: 'default',
  icon: './assets/icon.png',
  plugins: ['sentry-expo'],
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  userInterfaceStyle: 'automatic',
  scheme: 'expoauth',
  extra: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    GOOGLE_EXPO_ID: process.env.GOOGLE_EXPO_ID,
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    userInterfaceStyle: 'automatic',
  },
  web: {
    bundler: 'metro',
  },
  description: 'Starter project from dooboo-cli.',
});
