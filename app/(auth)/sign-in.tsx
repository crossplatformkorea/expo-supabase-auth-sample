import styled from '@emotion/native';
import {Button} from 'dooboo-ui';
import {Link, useRouter} from 'expo-router';
import type {ReactElement} from 'react';
import {Body1, Heading1} from '../../src/uis/Typography';
import {getString} from '../../STRINGS';

import {useAppContext} from '../../src/providers/AppProvider';

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
  const router = useRouter();
  const {setUser} = useAppContext();

  const handleSignIn = async (): Promise<any> => {};

  return (
    <Container>
      <Heading1>{getString('LOGIN')}</Heading1>
      <StyledLink href="/" style={{marginBottom: 30}}>
        <Body1>{getString('NAVIGATE', {name: 'Home'})}</Body1>
      </StyledLink>

      <Button
        text={getString('LOGIN')}
        style={{width: '50%', maxWidth: 400, marginBottom: 20}}
        onPress={handleSignIn}
      />
    </Container>
  );
}
