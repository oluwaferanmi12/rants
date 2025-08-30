import {ArrowRight, Close} from '@assets';
import {AlertTypes, Button, Input, Text} from '@components';
import {AppContext, useTheme} from '@data';
import {LightModeColors, TestIds, auth} from '@library';
import Lottie from 'lottie-react-native';
import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (val: boolean) => void;
};

const Container = styled.View<{colors: typeof LightModeColors}>`
  background-color: ${props => props.colors.NEUTRAL_100};
  height: 80%;
  border-radius: 32px 32px 0 0;
  padding: 8px 16px 16px 16px;
`;
const SwipeLine = styled.View<{colors: typeof LightModeColors}>`
  background-color: ${props => props.colors.NEUTRAL_300};
  border-radius: 2px;
  margin-bottom: 12px;
  width: 36px;
  height: 4px;
  align-self: center;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const SuccessWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Pressable = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export function PasswordResetModal(props: Props) {
  const {Colors} = useTheme();

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState('');
  const {dispatch} = useContext(AppContext);

  const onSubmit = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setIsSuccessful(true);
    } catch (error: any) {
      dispatch({
        showAlert: true,
        alertConfig: {title: error.message, type: AlertTypes.ERROR},
      });
    }
  };

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={() => props.setIsModalVisible(false)}
      swipeDirection={'down'}
      propagateSwipe={true}
      onSwipeComplete={() => props.setIsModalVisible(false)}
      testID={TestIds.ModalId}
      style={styles.modal}>
      <Container colors={Colors}>
        {!isSuccessful ? (
          <>
            <SwipeLine colors={Colors} />
            <Wrapper>
              <Pressable onPress={() => props.setIsModalVisible(false)}>
                <Close color={Colors.TEXT_ICON_PRIMARY} />
              </Pressable>
              <Text ta="center" type="HEADLINE">
                Account verification
              </Text>
              <Text
                m="24 0 56 0"
                type="SUBHEAD"
                color={Colors.TEXT_ICON_SECONDARY}>
                We need to verify that you own this account, please enter your
                email address to continue with your password reset.
              </Text>
              <Input
                label="Email address"
                placeholder="john@doe.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </Wrapper>
            <Button
              m="0 0 72"
              onPress={onSubmit}
              title="Continue"
              disabled={!email}
              rightIcon={
                <ArrowRight
                  color={!email ? Colors.TEXT_ICON_DISABLED : Colors.NEUTRAL_0}
                />
              }
            />
          </>
        ) : (
          <>
            <SwipeLine colors={Colors} />
            <Wrapper>
              <Pressable onPress={() => props.setIsModalVisible(false)}>
                <Close color={Colors.TEXT_ICON_PRIMARY} />
              </Pressable>
              <SuccessWrapper>
                <Lottie
                  source={require('../../../../assets/animations/sent.json')}
                  autoPlay
                  style={styles.lottie}
                />
                <Text m="54 0 16 0" type="H3">
                  We sent you a mail!
                </Text>
                <Text
                  ta="center"
                  type="SUBHEAD"
                  color={Colors.TEXT_ICON_SECONDARY}>
                  Click on the link we sent to your mail <Text>({email})</Text>{' '}
                  to confirm account verification, then proceed to create a new
                  password.
                </Text>
              </SuccessWrapper>
            </Wrapper>
          </>
        )}
      </Container>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
