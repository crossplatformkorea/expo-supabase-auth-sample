import {Button, useDooboo} from 'dooboo-ui';
import type {ReactElement} from 'react';

import {getString} from '../../STRINGS';

import styled from '@emotion/native';
import {View} from 'react-native';
import {useAppContext} from '../../src/providers/AppProvider';
import {Heading1} from '../../src/uis/Typography';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  margin-bottom: 35px;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.View`
  width: 72%;
  max-width: 400px;
`;

type Props = {};

export default function Root({}: Props): ReactElement {
  const {changeThemeType} = useDooboo();

  const {
    state: {user},
  } = useAppContext();

  return (
    <Container>
      <View style={{marginTop: 80}}>
        {user ? (
          <View style={{marginBottom: 30}}>
            <Heading1>Welcome {user.email}!</Heading1>
          </View>
        ) : null}
      </View>

      <ButtonWrapper>
        <Button
          testID="btn-theme"
          onPress={(): void => changeThemeType()}
          text={getString('CHANGE_THEME')}
        />
      </ButtonWrapper>
    </Container>
  );
}
