import {CheckboxOff, CheckboxOn, Close} from '@assets';
import {useTheme} from '@data';
import {TestIds} from '@library';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {ModalList} from '../modalList/ModalList';
import {Text} from '../text';
import {Container} from '../container/Container';

type Props = {
  isModalVisible: boolean;
  hideModal: () => void;
  title: string;
  modalList: {
    text: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  }[];
  onPressItem: (index: number) => void;
  description?: string;
  selectedItem: string;
};

export function SelectModal(props: Props) {
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
  // const Container = styled.View`
  //   background-color: ${Colors.NEUTRAL_100};
  //   height: 650px;
  //   border-radius: 32px 32px 0 0;
  //   padding: 8px 16px 16px 16px;
  // `;

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={props.hideModal}
      swipeDirection={'down'}
      propagateSwipe={true}
      onSwipeComplete={props.hideModal}
      testID={TestIds.ModalId}
      style={styles.modal}>
      <Container
        bg={Colors.NEUTRAL_100}
        height={650}
        br="32 32 0 0"
        p="8 16 16 16">
        <SwipeLine />
        <Wrapper>
          <Pressable onPress={props.hideModal}>
            <Close color={Colors.TEXT_ICON_PRIMARY} />
          </Pressable>
          <Text ta="center" m="0 0 40 0" type="HEADLINE">
            {props.title}
          </Text>
          {props.description && (
            <Text ta="left" m="0 16 40 16" type="SUBHEAD">
              {props.description}
            </Text>
          )}
          <Container sd="v">
            {props.modalList.map((item, idx) => (
              <ModalList
                text={item.text}
                opacity={props.selectedItem === item.text ? 1 : 0.5}
                key={item.text}
                leftIcon={item.leftIcon ?? null}
                rightComponent={
                  props.selectedItem === item.text ? (
                    <CheckboxOn />
                  ) : (
                    <CheckboxOff />
                  )
                }
                onPress={() => props.onPressItem(idx)}
              />
            ))}
          </Container>
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
