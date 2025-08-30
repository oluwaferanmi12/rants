import {Close} from '@assets';
import {useTheme} from '@data';
import {TestIds} from '@library';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Container} from '../container/Container';
import {ModalList} from '../modalList/ModalList';
import {Text} from '../text';

type Props = {
  isModalVisible: boolean;
  hideModal: () => void;
  title: string;
  modalList: {
    text: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    caution?: boolean;
    onPress?: () => void;
    hidden?: boolean;
    space?: boolean;
    spaceBottom?: number;
  }[];
  onPressItem?: (index: number) => void;
  header?: React.ReactNode;
};

export function ListModal(props: Props) {
  const {Colors} = useTheme();

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={props.hideModal}
      swipeDirection={'down'}
      propagateSwipe={true}
      onSwipeComplete={props.hideModal}
      testID={TestIds.ModalId}
      style={styles.modal}>
      <Container bg={Colors.NEUTRAL_100} sd="v" br="32 32 0 0" p="8 16 16 16">
        <Container
          als="center"
          bg={Colors.NEUTRAL_300}
          br={'2'}
          m="0 0 12 0"
          width={36}
          height={4}
        />
        <Container flex={1}>
          <Container
            position="absolute"
            top={0}
            left={0}
            zIndex={2}
            onPress={props.hideModal}>
            <Close color={Colors.TEXT_ICON_PRIMARY} />
          </Container>
          <Text ta="center" m="0 0 40 0" type="HEADLINE">
            {props.title}
          </Text>
          {props.header}
          {props.modalList.map((item, idx) =>
            item.hidden ? null : (
              <ModalList
                text={item.text}
                caution={item.caution}
                key={item.text}
                space={item.space}
                spaceBottom={item.spaceBottom}
                leftIcon={item.leftIcon ?? null}
                rightComponent={item.rightIcon ?? null}
                onPress={() =>
                  item.onPress ? item.onPress?.() : props.onPressItem?.(idx)
                }
              />
            ),
          )}
        </Container>
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
