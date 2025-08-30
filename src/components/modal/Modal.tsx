import {Close} from '@assets';
import {useTheme} from '@data';
import {TestIds} from '@library';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import M from 'react-native-modal';
import styled from 'styled-components/native';
import {Container} from '../container/Container';

type Props = {
  isModalVisible: boolean;
  hideModal: () => void;
  children: ReactNode;
  height?: number;
  footer?: ReactNode;
};

export function Modal(props: Props) {
  const {Colors} = useTheme();

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

  const Pressable = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  `;

  return (
    <M
      isVisible={props.isModalVisible}
      onBackdropPress={props.hideModal}
      swipeDirection={'down'}
      propagateSwipe={true}
      onSwipeComplete={props.hideModal}
      testID={TestIds.ModalId}
      style={styles.modal}>
      <Container
        bg={Colors.NEUTRAL_100}
        height={props.height || 650}
        br="32 32 0 0"
        p="8 16 16 16">
        <SwipeLine />
        <Wrapper>
          <Pressable onPress={props.hideModal}>
            <Close color={Colors.TEXT_ICON_PRIMARY} />
          </Pressable>
          <Container flex={1}>
            <Container flex={1}>{props.children}</Container>
          </Container>
          {props.footer && <Container>{props.footer}</Container>}
        </Wrapper>
      </Container>
    </M>
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
