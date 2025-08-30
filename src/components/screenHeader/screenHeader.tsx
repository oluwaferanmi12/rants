import {ArrowLeft} from '@assets';
import {useTheme} from '@data';
import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {Container} from '../container/Container';
import {Text} from '../text';

type ScreenHeaderProps = {
  onBackPressed?: () => void;
  backIcon?: ReactNode;
  mb?: number;
  title?: string | ReactNode;
  rightComponent?: ReactNode;
  transparent?: boolean;
  hide?: boolean;
};

export const ScreenHeader = ({
  backIcon,
  onBackPressed,
  title = '',
  mb = 24,
  hide = false,
  rightComponent = null,
  transparent = false,
}: ScreenHeaderProps) => {
  const {Colors} = useTheme();
  const Empty = styled.TouchableOpacity`
    width: 24px;
  `;
  return (
    <Container
      m={`0 0 ${mb} 0`}
      // p={transparent ? '0' : '20 16'}
      top={0}
      width="100%"
      height={64}
      zIndex={1}
      left={0}
      position={transparent ? 'absolute' : 'relative'}
      bg={transparent ? Colors.TRANSPARENT : Colors.NEUTRAL_100}
      withBorder={!transparent}
      bc={Colors.NEUTRAL_300}
      ai="center">
      {transparent && (
        <Container opacity={0.3} position="absolute" width="100%" height={64} />
      )}
      <Container
        width="100%"
        height={64}
        p="20 16"
        bg={Colors.TRANSPARENT}
        fd="row"
        ai="center"
        jc="space-between">
        <Container
          onPress={onBackPressed}
          flex={1}
          bg={transparent ? Colors.TRANSPARENT : Colors.NEUTRAL_100}>
          {!hide &&
            (backIcon || <ArrowLeft color={Colors.TEXT_ICON_PRIMARY} />)}
        </Container>
        {typeof title === 'string' ? (
          <Text ta="center" type="HEADLINE">
            {title}
          </Text>
        ) : (
          title
        )}
        <Container
          flex={1}
          ai="flex-end"
          jc="center"
          bg={transparent ? Colors.TRANSPARENT : Colors.NEUTRAL_100}>
          {rightComponent || <Empty />}
        </Container>
      </Container>
    </Container>
  );
};
