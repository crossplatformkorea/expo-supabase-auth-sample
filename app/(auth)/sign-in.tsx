import 'react-native-url-polyfill/auto';

import styled from '@emotion/native';
import {Button, EditText} from 'dooboo-ui';
import {Link, useRouter} from 'expo-router';
import type {ReactElement} from 'react';
import {useState} from 'react';
import {Body1, Heading1} from '../../src/uis/Typography';
import {getString} from '../../STRINGS';
import {makeRedirectUri, startAsync} from 'expo-auth-session';

import {Linking, View} from 'react-native';
import {supabase} from '../../src/supabase';
import {handleError} from '../../src/utils/error';
import {SUPABASE_URL} from '../../config';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
`;

const InputWrapper = styled.View`
  width: 70%;
  max-width: 600px;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.View`
  width: 60%;
  max-width: 500px;
`;

const ErrorMessage = styled(Body1)`
  color: ${({theme}) => theme.text.validation};
`;

const redirectUrl = makeRedirectUri({
  path: '/auth/callback',
});

export default function SignIn(): ReactElement {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);

    try {
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      const errorMsg = handleError(error);

      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithOAuth = async (provider: 'google'): Promise<void> => {
    setLoading(true);

    try {
      // const response = await startAsync({
      //   authUrl: `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUrl}`,
      //   returnUrl: redirectUrl,
      // });
      // if (response.type === 'success') {
      //   console.log('성공', response.params);
      // }
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        throw error;
      }

      const authUrl = data.url;

      if (!authUrl) {
        throw new Error('authUrl not found');
      }

      const response = await startAsync({authUrl, returnUrl: redirectUrl});

      if (response.type === 'success') {
        await Linking.openURL(response.url);
      }
    } catch (error) {
      const errorMsg = handleError(error);

      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const navigatorToSignUp = (): void => {
    router.push('./sign-up');
  };

  return (
    <Container>
      <Heading1>{getString('LOGIN')}</Heading1>
      <StyledLink href="/" style={{marginBottom: 30}}>
        <Body1>{getString('NAVIGATE', {name: 'Home'})}</Body1>
      </StyledLink>

      <InputWrapper>
        <EditText
          label={getString('EMAIL')}
          placeholder={getString('EMAIL')}
          editable={!loading}
          value={email}
          onChangeText={setEmail}
        />
        <View style={{height: 24}} />
        <EditText
          label={getString('PASSWORD')}
          placeholder={getString('PASSWORD')}
          editable={!loading}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </InputWrapper>

      {errorMessage ? (
        <ErrorMessage style={{marginBottom: 12}}>
          <Body1>{errorMessage}</Body1>
        </ErrorMessage>
      ) : null}

      <ButtonWrapper>
        <Button
          text={getString('LOGIN')}
          loading={loading}
          disabled={loading}
          onPress={handleSignIn}
        />
        <View style={{height: 12}} />
        <Button
          text={getString('LOGIN_WITH', {name: 'google'})}
          color="secondary"
          loading={loading}
          disabled={loading}
          onPress={() => handleSignInWithOAuth('google')}
        />
        <View style={{height: 12}} />
        <Button
          text={getString('SIGNUP')}
          disabled={loading}
          color={'success'}
          onPress={navigatorToSignUp}
        />
      </ButtonWrapper>
    </Container>
  );
}
