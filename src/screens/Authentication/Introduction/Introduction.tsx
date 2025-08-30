import React from 'react';

import {Button, ButtonTypes} from '@components';
import {RouteTypes} from '@config';
import {useTheme} from '@data';
import {EVENT_NAVIGATOR, LOGIN, REGISTER} from '@library';
import styled from 'styled-components/native';

export function Introduction({
  navigation,
}: RouteTypes.IntroductionProps): JSX.Element {
  const {Colors} = useTheme();
  const Container = styled.View`
    background-color: ${Colors.NEUTRAL_100};
    flex: 1;
  `;

  const Wrapper = styled.View`
    padding: 16px;
    flex: 1;
    justify-content: flex-end;
  `;

  const AppButton = styled(Button)`
    margin-bottom: 16px;
  `;

  const goToRegistration = () => {
    navigation.navigate(REGISTER);
  };

  const goToLogin = () => {
    navigation.navigate(LOGIN);
  };

  return (
    <Container>
      <Wrapper>
        <AppButton onPress={goToRegistration} title="Open an account" />
        <AppButton
          onPress={goToLogin}
          title="Log in"
          type={ButtonTypes.SECONDARY}
        />
        <AppButton
          onPress={() => navigation.navigate(EVENT_NAVIGATOR)}
          title="Create event"
          type={ButtonTypes.SECONDARY}
        />
      </Wrapper>
    </Container>
  );
}
