import {Close} from '@assets';
import {Button, Container, Text} from '@components';
import {useTheme} from '@data';
import {TestIds} from '@library';
import Lottie from 'lottie-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

type Props = {
  isModalVisible: boolean;
  description: string;
  onBtnClick: () => void;
  setIsModalVisible: (val: boolean) => void;
};

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

export function SuccessModal(props: Props) {
  const {Colors} = useTheme();

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={() => props.setIsModalVisible(false)}
      swipeDirection={'down'}
      propagateSwipe={true}
      onSwipeComplete={() => props.setIsModalVisible(false)}
      testID={TestIds.ModalId}
      style={styles.modal}>
      <Container br="32 32 0 0" p="8 16 16 16" height={600}>
        <Container
          bg={Colors.NEUTRAL_300}
          br="2"
          m="0 0 12 0"
          width={36}
          height={4}
          als="center"
        />
        <Wrapper>
          <Pressable onPress={() => props.setIsModalVisible(false)}>
            <Close color={Colors.TEXT_ICON_PRIMARY} />
          </Pressable>
          <SuccessWrapper>
            <Lottie
              source={require('../../assets/animations/success.json')}
              autoPlay
              style={styles.lottie}
            />
            <Text m="54 0 16 0" type="H3">
              Congratulations!
            </Text>
            <Text ta="center" type="SUBHEAD" color={Colors.TEXT_ICON_SECONDARY}>
              {props.description}
            </Text>
          </SuccessWrapper>
          <Button m="24 0" title="Proceed" onPress={props.onBtnClick} />
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
