import {CaretRight} from '@assets';
import {useTheme} from '@data';
import React from 'react';
import {Container} from '../container/Container';
import {Text} from '../text';

type Props = {
  title: string;
  description: string;
  imageUri?: string;
  onPress: () => void;
};
export const SimpleList = ({title, description, imageUri, onPress}: Props) => {
  const {Colors} = useTheme();
  return (
    <Container
      p="8"
      m="0 0 16"
      fd="row"
      ai="center"
      bw={1}
      jc="space-between"
      onPress={onPress}
      br={'4'}>
      {imageUri !== undefined && (
        <Container
          bg={Colors.NEUTRAL_300}
          m="0 8 0 0"
          width={50}
          height={50}
          br="4"
        />
      )}
      <Container flex={1} m="0 24 0 0">
        <Text type="SUBHEAD" m="0 0 4 0">
          {title}
        </Text>
        <Text
          type="CAPTION1"
          numberOfLines={1}
          color={Colors.TEXT_ICON_SECONDARY}>
          {description}
        </Text>
      </Container>
      <CaretRight color={Colors.TEXT_ICON_PRIMARY} />
    </Container>
  );
};
