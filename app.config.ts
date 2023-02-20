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
