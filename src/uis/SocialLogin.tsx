import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import type {StyleProp, ViewStyle} from 'react-native';
import {Alert, Platform} from 'react-native';
import {GoogleAuthProvider, signInWithCredential} from '@firebase/auth';
import type {ReactElement} from 'react';
import {useState} from 'react';

import {IconButton} from 'dooboo-ui';
import {css} from '@emotion/native';
import {fireAuth} from '../firebase';
import {colors} from '../theme';
import {GOOGLE_EXPO_ID} from '../../config';
import {handleError} from '../utils/error';

type Props = {
  style?: StyleProp<ViewStyle>;
  provider: 'apple' | 'facebook' | 'google';
};

const matchId = (provider: 'google'): string => {
  switch (provider) {
    case 'google':
      return GOOGLE_EXPO_ID;
  }
};

WebBrowser.maybeCompleteAuthSession();

export function SocialSignInButton({style, provider}: Props): ReactElement {
  const [loading, setLoading] = useState(false);

  const clientId = matchId('google');

  const [request, _, promptAsync] = Google.useIdTokenAuthRequest({
    clientId,
  });

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);

    try {
      const res = await promptAsync({
        useProxy: Platform.select({web: false, default: true}),
      });

      if (res.type !== 'success') {
        if (Platform.OS === 'web') {
          // eslint-disable-next-line no-alert
          alert('Unknown error');

          return;
        }

        Alert.alert('Error', 'Unknown error');

        return;
      }

      const {id_token} = res.params;
      const credential = GoogleAuthProvider.credential(id_token);

      await signInWithCredential(fireAuth, credential);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      disabled={!request}
      loading={loading}
      style={style}
      styles={{
        container: css`
          background-color: ${colors[provider]};
          padding: 10px;
        `,
      }}
      icon="Google"
      onPress={handleSignIn}
    />
  );
}

export default SocialSignInButton;

// const googleDiscovery = useAutoDiscovery('https://accounts.google.com');

// const discovery =
//   provider === 'google'
//     ? googleDiscovery
//     : {
//         authorizationEndpoint: 'https://www.facebook.com/v11.0/dialog/oauth',
//         tokenEndpoint: 'https://graph.facebook.com/v11.0/oauth/access_token',
//       };

// const useProxy = Platform.select({web: false, default: true});

// const redirectUri = makeRedirectUri({useProxy});

// const [request, _, promptAsync] = useAuthRequest(
//   provider === 'google'
//     ? {
//         clientId,
//         redirectUri,
//         prompt: Prompt.SelectAccount,
//         scopes: ['openid', 'profile', 'email'],
//         responseType: ResponseType.Token,
//         usePKCE: false,
//       }
//     : {
//         clientId,
//         redirectUri,
//         prompt: Prompt.SelectAccount,
//         extraParams: {
//           display: Platform.select({web: 'popup'}) as string,
//           auth_type: 'rerequest',
//         },
//         responseType: ResponseType.Token,
//       },
//   discovery,
// );

// const signIn = useCallback(async () => {
//   setLoading(true);

//   try {
//     const result = await promptAsync({useProxy});

//     if (result.type !== 'success') {
//       if (Platform.OS === 'web') {
//         // @ts-ignore
//         // eslint-disable-next-line no-alert
//         alert('ERROR');

//         return;
//       }

//       Alert.alert('ERROR', 'UNKNOWN ERROR');

//       return;
//     }

//     if (provider === 'google') {
//       const accessToken = result.params.access_token;

//       const credential = GoogleAuthProvider.credential(null, accessToken);

//       const authResult = await signInWithCredential(fireAuth, credential);

//       if (!authResult.user.email) {
//         return;
//       }

//       onCompleted({email: authResult.user.email});

//       return;
//     }

//     const accessToken = result.params.access_token;

//     const credential = FacebookAuthProvider.credential(accessToken);

//     const authResult = await signInWithCredential(fireAuth, credential);

//     if (!authResult.user.email) {
//       return;
//     }

//     onCompleted({email: authResult.user.email});
//   } catch (err: any) {
//     if (Platform.OS === 'web') {
//       // eslint-disable-next-line no-alert
//       alert(`Login Error: ${err.message}`);

//       return;
//     }

//     Alert.alert(`Login Error: ${err}`);
//   } finally {
//     setLoading(false);
//   }
// }, [onCompleted, promptAsync, provider, useProxy]);
