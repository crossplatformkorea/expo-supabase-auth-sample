import styled from '@emotion/native';
import {Button} from 'dooboo-ui';
import {useRouter} from 'expo-router';
import type {ReactElement} from 'react';
import {useState} from 'react';
import {getString} from '../../STRINGS';
import {fireAuth} from '../firebase';
import {useAppContext} from '../providers/AppProvider';
import {handleError} from '../utils/error';
import {Heading1} from './Typography';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0px 20px 0px 20px;
  height: 48px;
  border-bottom-width: 0.2px;
  border-bottom-color: ${({theme}) => theme.text.basic};
`;

export default function Header(): ReactElement {
  const {
    state: {user},
    resetUser,
  } = useAppContext();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      await fireAuth.signOut();
      resetUser();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Heading1>{getString('TITLE')}</Heading1>
      {user ? (
        <Button
          loading={loading}
          onPress={handleLogout}
          text={getString('LOGOUT')}
        />
      ) : (
        <Button
          disabled={loading}
          onPress={(): void => {
            router.push('/(auth)/sign-in');
          }}
          text={getString('LOGIN')}
        />
      )}
    </Container>
  );
}
