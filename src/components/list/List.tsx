import {CaretRight} from '@assets';
import {useTheme} from '@data';
import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container} from '../container/Container';
import {Text} from '../text';

type Props = {
  category: string;
  samples: string;
  onPress: () => void;
  isActive?: boolean;
  withBorder?: boolean;
  levelBadge?: ReactNode;
};
export const List = ({
  category,
  samples,
  onPress,
  isActive = true,
  withBorder = false,
  levelBadge = null,
}: Props) => {
  const {Colors} = useTheme();
  return (
    <Container
      p="16 8"
      m="0 0 16"
      fd="row"
      ai="center"
      jc="space-between"
      bw={withBorder ? 1 : 0}
      opacity={isActive ? 1 : 0.4}
      onPress={onPress}
      disabled={!isActive}
      br={'4'}>
      <Container flex={1} m="0 24 0 0">
        <Text type="SUBHEAD" m="0 0 4 0">
          {category}
        </Text>
        <Text
          type="CAPTION1"
          numberOfLines={1}
          color={Colors.TEXT_ICON_SECONDARY}>
          {samples}
        </Text>
      </Container>
      {levelBadge}
      <CaretRight color={Colors.TEXT_ICON_PRIMARY} />
    </Container>
  );
};
