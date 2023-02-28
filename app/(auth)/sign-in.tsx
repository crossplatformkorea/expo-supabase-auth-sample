import {Body1, Heading1} from '../../src/uis/Typography';
import {Button, EditText} from 'dooboo-ui';
import {Link, useRouter} from 'expo-router';
import {Platform, View} from 'react-native';

import type {ReactElement} from 'react';
import {getString} from '../../STRINGS';
import {handleError} from '../../src/utils/error';
import styled from '@emotion/native';
import {supabase} from '../../src/supabase';
import {useState} from 'react';
import * as WebBrowser from 'expo-web-browser';
import SocialSignInButton from '../../src/uis/SocialButton';

/* For web */
WebBrowser.maybeCompleteAuthSession();

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
  width: 85%;
  max-width: 600px;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.View`
  width: 80%;
  max-width: 500px;
`;

const ErrorMessage = styled(Body1)`
  color: ${({theme}) => theme.text.validation};
`;

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
          text={getString('SIGNUP')}
          disabled={loading}
          color={'success'}
          onPress={navigatorToSignUp}
        />
        <View style={{height: 12}} />
        <SocialSignInButton
          provider="google"
          text={getString('LOGIN_WITH', {name: 'Google'})}
          onError={(err) => {
            handleError(err);
          }}
        />
        <View style={{height: 12}} />
        <SocialSignInButton
          provider="facebook"
          text={getString('LOGIN_WITH', {name: 'Facebook'})}
          onError={(err) => {
            handleError(err);
          }}
        />
        <View style={{height: 12}} />
        <SocialSignInButton
          provider="github"
          text={getString('LOGIN_WITH', {name: 'Github'})}
          onError={(err) => {
            handleError(err);
          }}
        />
        {Platform.OS !== 'android' ? (
          <>
            <View style={{height: 12}} />
            <SocialSignInButton
              provider="apple"
              text={getString('LOGIN_WITH', {name: 'Apple'})}
              onError={(err) => {
                handleError(err);
              }}
            />
          </>
        ) : null}
      </ButtonWrapper>
    </Container>
  );
}
