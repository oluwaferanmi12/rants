import {ArrowRight, Close} from '@assets';
import {useTheme} from '@data';
import {TestIds} from '@library';
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {Button} from '../button';
import {Text} from '../text';
import {Container} from '../container/Container';

type Props = {
  isModalVisible: boolean;
  hideModal: () => void;
  title: string;
  modalList: string[];
  modalTitle: string;
  more?: string;
  onSubmit: () => void;
};

export function LevelModal(props: Props) {
  const {Colors} = useTheme();

  const ModalContainer = styled.View`
    background-color: ${Colors.NEUTRAL_100};
    height: 600px;
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

  const Pressable = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  `;

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={props.hideModal}
      swipeDirection={'down'}
      propagateSwipe={true}
      onSwipeComplete={props.hideModal}
      testID={TestIds.ModalId}
      style={styles.modal}>
      <ModalContainer>
        <SwipeLine />
        <Wrapper>
          <Pressable onPress={props.hideModal}>
            <Close color={Colors.TEXT_ICON_PRIMARY} />
          </Pressable>
          <Text ta="center" m="0 0 40 0" type="HEADLINE">
            {props.modalTitle}
          </Text>
          <Text m="0 0 24 0" type="H4">
            {props.title}
          </Text>
          <Text m="0 0 24 0" type="FOOTNOTE">
            Provide the following:
          </Text>
          <Container fd="row" fw="wrap">
            {props.modalList.map((item, idx) => (
              <Container
                key={item}
                bg={Colors.NEUTRAL_200}
                br="4"
                m="0 16 16 0"
                p="2 8">
                <Text key={`${idx}`} opacity={0.65} type="FOOTNOTE">
                  {item}
                </Text>
              </Container>
            ))}
          </Container>
          {props.more ? (
            <>
              <Text m="16 0 8 0" type="FOOTNOTE">
                More info:
              </Text>
              <Text opacity={0.65} type="FOOTNOTE">
                {props.more}
              </Text>
            </>
          ) : null}
        </Wrapper>
        <Button
          m="20 0"
          onPress={props.onSubmit}
          title="Proceed"
          rightIcon={<ArrowRight color={Colors.NEUTRAL_0} />}
        />
      </ModalContainer>
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
