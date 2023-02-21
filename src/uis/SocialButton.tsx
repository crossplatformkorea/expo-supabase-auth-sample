import * as WebBrowser from 'expo-web-browser';
import type {StyleProp, ViewStyle} from 'react-native';
import {Platform} from 'react-native';
import type {ComponentProps, ReactElement} from 'react';
import {useMemo, useState} from 'react';

import {Button, Icon} from 'dooboo-ui';
import {css} from '@emotion/native';
import {colors} from '../theme';
import {makeRedirectUri, startAsync} from 'expo-auth-session';
import {SUPABASE_URL} from '../../config';
import {supabase} from '../supabase';

/* For web */
WebBrowser.maybeCompleteAuthSession();

type Provider = 'apple' | 'facebook' | 'google' | 'github';

type Props = {
  style?: StyleProp<ViewStyle>;
  provider: Provider;
  onError?: (err: any) => void;
  text: string;
};

WebBrowser.maybeCompleteAuthSession();

export function SocialSignInButton({
  style,
  text,
  provider,
  onError,
}: Props): ReactElement {
  const [loading, setLoading] = useState(false);

  const redirectUrl = useMemo(
    () =>
      makeRedirectUri({
        path: '/auth/callback',
      }),
    [],
  );

  const capitalize = (str: Provider): ComponentProps<typeof Icon>['name'] => {
    return (str.charAt(0).toUpperCase() + str.slice(1)) as ComponentProps<
      typeof Icon
    >['name'];
  };

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);

    try {
      if (Platform.OS === 'web') {
        const res = await supabase.auth.signInWithOAuth({
          provider,
        });

        if (res.error) {
          onError?.(res.error);
        }

        return;
      }

      const response = await startAsync({
        authUrl: `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUrl}`,
        returnUrl: redirectUrl,
      });

      if (response.type === 'success') {
        /* 
            setting the accessToken & refreshToken works like sign-in
            This will invoke an onAuthStateChange in useAuthStateChange
        */
        supabase.auth.setSession({
          access_token: response.params.access_token,
          refresh_token: response.params.refresh_token,
        });
      }
    } catch (error) {
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      onPress={handleSignIn}
      text={text}
      startElement={
        <Icon name={capitalize(provider)} size={24} style={{marginRight: 12}} />
      }
      style={style}
      styles={{
        container: css`
          background-color: ${colors[provider]};
          padding: 10px;
        `,
      }}
    />
  );
}

export default SocialSignInButton;
