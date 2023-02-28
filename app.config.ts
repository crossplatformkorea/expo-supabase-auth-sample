import 'dotenv/config';
import type {ConfigContext, ExpoConfig} from '@expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'dooboo',
  slug: 'dooboo-expo-router',
  privacy: 'public',
  platforms: ['ios', 'android', 'web'],
  version: '1.0.0',
  orientation: 'default',
  icon: './assets/icon.png',
  plugins: ['sentry-expo', 'expo-localization'],
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  userInterfaceStyle: 'automatic',
  scheme: 'doobooexporouter',
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
