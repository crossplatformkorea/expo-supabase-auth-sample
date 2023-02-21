import {useCallback, useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import {supabase} from '../supabase';

export function useWebAuth(): void {
  const handleAuthParams = useCallback(
    async (url: string | null): Promise<void> => {
      if (!url) {
        return;
      }

      const fixed = url.includes('#') ? url.replace('#', '?') : url;
      const newUrl = new URL(fixed);
      const accessToken = newUrl.searchParams.get('access_token');
      const refreshToken = newUrl.searchParams.get('refresh_token');

      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    },
    [],
  );

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    const listener = (event: {url: string}): void => {
      handleAuthParams(event.url);
    };

    Linking.addEventListener('url', listener);
    Linking.getInitialURL().then((url) => handleAuthParams(url));

    return () => {
      if (Linking.removeAllListeners) {
        Linking.removeAllListeners('url');
      }
    };
  }, [handleAuthParams]);
}
