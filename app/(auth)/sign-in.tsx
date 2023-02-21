import styled from '@emotion/native';
import {Link} from 'expo-router';
import type {ReactElement} from 'react';
import {Body1, Heading1} from '../../src/uis/Typography';
import {getString} from '../../STRINGS';
import SocialSignInButton from '../../src/uis/SocialLogin';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
`;

export default function SignIn(): ReactElement {
  return (
    <Container>
      <Heading1>{getString('LOGIN')}</Heading1>
      <StyledLink href="/" style={{marginBottom: 30}}>
        <Body1>{getString('NAVIGATE', {name: 'Home'})}</Body1>
      </StyledLink>

      <SocialSignInButton provider="google" />
    </Container>
  );
}
