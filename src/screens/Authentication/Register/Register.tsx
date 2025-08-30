import React, {useContext, useState} from 'react';

import {EyeClosed, EyeOpen, FacebookIcon, GoogleIcon} from '@assets';
import {
  AlertTypes,
  AuthHeader,
  Button,
  ButtonTypes,
  Divider,
  Input,
  ScreenHeader,
  Text,
} from '@components';
import {RouteTypes} from '@config';
import {AppContext, useTheme} from '@data';
import {LOGIN, LightModeColors, auth, useFirebase} from '@library';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import {VerificationModal} from '../components';
const Container = styled.View<{colors: typeof LightModeColors}>`
  background-color: ${props => props.colors.NEUTRAL_100};
  flex: 1;
`;

const Wrapper = styled.View`
  padding: 0px 16px 16px 16px;
`;

const AppButton = styled(Button)`
  margin-top: 16px;
`;

const Caption = styled(Text)`
  text-align: center;
  margin-top: 8px;
`;

export function Register({navigation}: RouteTypes.RegisterProps): JSX.Element {
  const [email, setEmail] = useState('adetoye.tunex@gmail.com');
  const {dispatch} = useContext(AppContext);
  const {saveUser, signOut} = useFirebase();
  const [password, setPassword] = useState('Chancing1.');
  const [showPassword, setShowPassword] = useState(false);
  const {Colors} = useTheme();

  const onSubmit = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const credentials = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await saveUser(credentials.user?.uid ?? '', {email});
      await credentials.user.sendEmailVerification();
      await signOut();
      setIsVerificationModalVisible(true);
      setEmail('');
      setPassword('');
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

  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    useState(false);

  return (
    <Container colors={Colors}>
      <ScreenHeader onBackPressed={navigation.goBack} />
      <Wrapper>
        <AuthHeader
          headerText="Join Rants"
          description="Create an account and explore our services for seamless event connections!"
        />
        <Input
          label="Email address"
          isError
          placeholder="example@mail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="••••••••••"
          secureTextEntry={!showPassword}
          keyboardType="default"
          value={password}
          onChangeText={setPassword}
          Icon={renderPasswordIcon()}
        />
        <AppButton
          title="Create account"
          onPress={onSubmit}
          disabled={!email || password.length < 8}
        />
        <Divider />
        <Button
          type={ButtonTypes.SOCIAL}
          m="0 0 16"
          onPress={onSubmit}
          title="Connect With Facebook"
          leftIcon={<FacebookIcon />}
        />
        <Button
          type={ButtonTypes.SOCIAL}
          m="0 0 16"
          onPress={onSubmit}
          title="Connect With Google"
          leftIcon={<GoogleIcon />}
        />
        <Caption color={Colors.TEXT_ICON_DISABLED} type="CAPTION2">
          By creating an account you agree to our{' '}
          <Text color={Colors.PRIMARY_900} type="CAPTION2">
            Terms of Services
          </Text>
        </Caption>
      </Wrapper>
      <VerificationModal
        isModalVisible={isVerificationModalVisible}
        setIsModalVisible={setIsVerificationModalVisible}
        onComplete={() => {
          setIsVerificationModalVisible(false);
          navigation.navigate(LOGIN);
        }}
      />
    </Container>
  );
}
