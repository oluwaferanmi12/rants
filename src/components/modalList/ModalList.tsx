import {useTheme} from '@data';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Text} from '../text';
import {Container} from '../container/Container';

type Props = {
  text: string;
  rightComponent?: ReactNode;
  caution?: boolean;
  leftIcon?: ReactNode;
  spaceBottom?: number;
  opacity?: number;
  space?: boolean;
  onPress: () => void;
};
export const ModalList = ({
  text,
  leftIcon,
  rightComponent,
  caution = false,
  onPress,
  opacity,
  spaceBottom,
  space = false,
}: Props) => {
  const {Colors} = useTheme();

  const ModalText = styled(Text)`
    flex: 1;
    margin-left: ${leftIcon ? 8 : 0}px;
  `;

  return (
    <Container
      onPress={onPress}
      fd="row"
      ai="center"
      jc="space-between"
      p="14 16"
      m={space ? '32 0 8 0' : `0 0 ${spaceBottom ?? 8} 0`}
      bg={Colors.NEUTRAL_200}
      br="4">
      {leftIcon}
      <ModalText
        type="SUBHEAD"
        opacity={opacity ?? 1}
        color={caution ? Colors.ERROR_900 : Colors.TEXT_ICON_PRIMARY}>
        {text}
      </ModalText>
      {rightComponent}
    </Container>
  );
};
