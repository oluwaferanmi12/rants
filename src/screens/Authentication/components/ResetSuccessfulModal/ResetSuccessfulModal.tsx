import {ArrowRight, Close} from '@assets';
import {Button, Text} from '@components';
import {TestIds} from '@library';
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import {useTheme} from '@data';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (val: boolean) => void;
  onSubmit: () => void;
};

export function ResetSuccessfulModal(props: Props) {
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
  const disabled = false;

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
            <Text ta="center" type="SUBHEAD" color={Colors.TEXT_ICON_SECONDARY}>
              Your password has been reset. Please proceed to login
            </Text>
          </SuccessWrapper>
          <Button
            m="0 0 72"
            onPress={props.onSubmit}
            title="Log in"
            disabled={disabled}
            rightIcon={
              <ArrowRight
                color={disabled ? Colors.TEXT_ICON_DISABLED : Colors.NEUTRAL_0}
              />
            }
          />
        </Wrapper>
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
