import React, {useState} from 'react';

import {Close, EyeOpen} from '@assets';
import {AuthHeader, Button, Input, ScreenHeader} from '@components';
import {RouteTypes} from '@config';
import styled from 'styled-components/native';
import {ResetSuccessfulModal} from '../components';
import {useTheme} from '@data';
import {PROFILE_NAVIGATOR} from '@library';

export function ForgotPassword({
  navigation,
}: RouteTypes.ForgotPasswordProps) {
  const {Colors} = useTheme();
  const Container = styled.View`
    background-color: ${Colors.NEUTRAL_100};
    flex: 1;
  `;

  const Wrapper = styled.View`
    padding: 0px 16px 16px 16px;
  `;

  const onSubmit = () => {
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Container>
      <ScreenHeader
        onBackPressed={navigation.goBack}
        backIcon={<Close color={Colors.TEXT_ICON_PRIMARY} />}
      />
      <Wrapper>
        <AuthHeader
          headerText="Password Reset"
          description="Create a new password to access your account"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          keyboardType="default"
          infoText="Combine upper and lowercase letters and numbers"
          Icon={<EyeOpen color={Colors.TEXT_ICON_DISABLED} />}
        />
        <Input
          label="Confrim password"
          placeholder="Enter your password"
          secureTextEntry
          keyboardType="default"
          infoText="Password must match"
          Icon={<EyeOpen color={Colors.TEXT_ICON_DISABLED} />}
        />
        <Button title="Reset password" onPress={onSubmit} m="32 0 0 0" />
      </Wrapper>
      <ResetSuccessfulModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onSubmit={() => {
          setIsModalVisible(false);
          navigation.navigate(PROFILE_NAVIGATOR);
        }}
      />
    </Container>
  );
}
