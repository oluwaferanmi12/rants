import {ArrowRight, Close} from '@assets';
import {Button, Input, Text} from '@components';
import {TestIds} from '@library';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import {useTheme} from '@data';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (val: boolean) => void;
  onComplete: () => void;
};

export function VerificationModal(props: Props) {
  const {Colors} = useTheme();
  const Container = styled.View`
    background-color: ${Colors.NEUTRAL_100};
    height: 80%;
    border-radius: 32px 32px 0 0;
    padding: 8px 16px 16px 16px;
  `;
  const SwipeLine = styled.View`
    background-color: ${Colors.NEUTRAL_300};
    border-radius: 2px;
    margin-bottom: 12px;
    width: 36px;
    height: 4px;
    align-self: center;
  `;
  const StyledText = styled(Text)`
    text-align: center;
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

  const ResendText = styled(Text)`
    text-decoration: underline;
    text-decoration-color: ${property => property.color};
  `;

  const ResendWrapper = styled.View`
    flex-direction: row;
  `;

  const TryAgainText = styled(Text)``;
  const disabled = false;
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [isResent, setIsResent] = useState(false);

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={() => props.setIsModalVisible(false)}
      swipeDirection={'down'}
      propagateSwipe={true}
      testID={TestIds.ModalId}
      onSwipeComplete={() => props.setIsModalVisible(false)}
      style={styles.modal}>
      <Container>
        {!isSuccessful ? (
          <>
            <SwipeLine />
            <Wrapper>
              <Pressable onPress={() => props.setIsModalVisible(false)}>
                <Close color={Colors.TEXT_ICON_PRIMARY} />
              </Pressable>
              <StyledText type="HEADLINE">Email verification</StyledText>
              <Text
                m="24 0 56 0"
                type="SUBHEAD"
                color={Colors.TEXT_ICON_SECONDARY}>
                We need to verify your email address, so we sent you a unique
                code. Please input the correct code to continue with your
                registration.
              </Text>
              <Input
                label="Code"
                placeholder="Enter 6-digit unique code"
                keyboardType="numeric"
              />

              <ResendWrapper>
                <ResendText
                  type="CAPTION1"
                  onPress={() => setIsResent(true)}
                  color={
                    isResent
                      ? Colors.TEXT_ICON_SECONDARY
                      : Colors.TEXT_ICON_PRIMARY
                  }>
                  Resend code
                </ResendText>
                {isResent ? (
                  <TryAgainText m="0 0 0 16" type="CAPTION1">
                    Try again in 30:00 sec
                  </TryAgainText>
                ) : null}
              </ResendWrapper>
            </Wrapper>
            <Button
              m="0 0 72"
              onPress={() => setIsSuccessful(true)}
              title="Continue"
              disabled={disabled}
              rightIcon={
                <ArrowRight
                  color={
                    disabled ? Colors.TEXT_ICON_DISABLED : Colors.NEUTRAL_0
                  }
                />
              }
            />
          </>
        ) : (
          <>
            <SwipeLine />
            <Wrapper>
              <Pressable onPress={() => props.setIsModalVisible(false)}>
                <Close color={Colors.TEXT_ICON_PRIMARY} />
              </Pressable>
              <SuccessWrapper>
                <Lottie
                  source={require('../../../../assets/animations/success.json')}
                  autoPlay
                  style={styles.lottie}
                />
                <Text m="54 0 16 0" type="H3">
                  Congratulations!
                </Text>
                <Text
                  ta="center"
                  type="SUBHEAD"
                  color={Colors.TEXT_ICON_SECONDARY}>
                  Your account has been created. Please verify your email by
                  clicking the link sent to your email box.
                </Text>
              </SuccessWrapper>
              <Button
                m="0 0 72"
                onPress={props.onComplete}
                title="Log in"
                disabled={disabled}
                rightIcon={
                  <ArrowRight
                    color={
                      disabled ? Colors.TEXT_ICON_DISABLED : Colors.NEUTRAL_0
                    }
                  />
                }
              />
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
