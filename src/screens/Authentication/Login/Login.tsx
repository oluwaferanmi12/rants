import React, {useContext, useState} from 'react';

import {EyeClosed, EyeOpen, FacebookIcon, GoogleIcon} from '@assets';
import {
  AlertTypes,
  AuthHeader,
  Button,
  ButtonTypes,
  Container,
  Divider,
  Input,
  ScreenHeader,
  Text,
} from '@components';
import {RouteTypes} from '@config';
import {AppContext, useTheme} from '@data';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import {PasswordResetModal} from '../components';
import {auth, useFirebase} from '../../../libs';

const Wrapper = styled.View`
  padding: 0px 16px 16px 16px;
`;

export function Login({navigation}: RouteTypes.LoginProps): JSX.Element {
  const {Colors} = useTheme();
  const [email, setEmail] = useState('adetoye.tunex@gmail.com');
  const {dispatch} = useContext(AppContext);
  const [password, setPassword] = useState('Chancing1.');
  const {getMyDetails} = useFirebase();
  const [showPassword, setShowPassword] = useState(false);

  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);

  const onSubmit = async () => {
    try {
      const credentials = await auth.signInWithEmailAndPassword(
        email,
        password,
      );
      if (!credentials.user.emailVerified) {
        await credentials.user.sendEmailVerification();
        dispatch({
          showAlert: true,
          alertConfig: {
            title: 'Click the link in your email box to verify your account.',
            type: AlertTypes.ERROR,
          },
        });
      } else {
        getMyDetails();
      }
    } catch (error: any) {
      dispatch({
        showAlert: true,
        alertConfig: {title: error.message, type: AlertTypes.ERROR},
      });
    }
  };

  const renderPasswordIcon = () => {
    return (
      <Pressable onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <EyeClosed color={Colors.TEXT_ICON_DISABLED} />
        ) : (
          <EyeOpen color={Colors.TEXT_ICON_DISABLED} />
        )}
      </Pressable>
    );
  };

  return (
    <Container bg={Colors.NEUTRAL_100} flex={1} expand>
      <ScreenHeader onBackPressed={navigation.goBack} />
      <Wrapper>
        <AuthHeader
          headerText="Welcome to Rants"
          description="Please enter your registration email/username and password"
        />
        <Input
          label="Email or Username"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          keyboardType="default"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          Icon={renderPasswordIcon()}
        />
        <Text
          onPress={() => setIsResetPasswordModalVisible(true)}
          m="8 0 32 0"
          type="FOOTNOTE"
          color={Colors.PRIMARY_900}>
          Forgot Password
        </Text>
        <Button
          title="Log in"
          onPress={onSubmit}
          disabled={!email || !password}
        />
        <Divider />
        <Button
          type={ButtonTypes.SOCIAL}
          onPress={onSubmit}
          title="Connect With Facebook"
          m="0 0 16 0"
          leftIcon={<FacebookIcon />}
        />
        <Button
          type={ButtonTypes.SOCIAL}
          onPress={onSubmit}
          title="Connect With Google"
          leftIcon={<GoogleIcon />}
        />
      </Wrapper>
      <PasswordResetModal
        isModalVisible={isResetPasswordModalVisible}
        setIsModalVisible={setIsResetPasswordModalVisible}
      />
    </Container>
  );
}
