import {useTheme} from '@data';
import React from 'react';
import {Container} from '../container/Container';
import {Text} from '../text';

type Props = {
  children: string;
  type?: 'neutral' | 'success' | 'error' | 'warning';
};

export const Tag = ({children, type = 'neutral'}: Props) => {
  const {Colors} = useTheme();

  return (
    <Container
      br="4"
      p="2 4"
      m="0 8 0 0"
      bg={
        type === 'neutral'
          ? Colors.NEUTRAL_200
          : type === 'success'
          ? Colors.SUCCESS_900
          : type === 'error'
          ? Colors.ERROR_700
          : Colors.CAUTION_700
      }>
      <Text
        color={
          type === 'neutral'
            ? Colors.TEXT_ICON_PRIMARY
            : type === 'success'
            ? Colors.SUCCESS_100
            : type === 'error'
            ? Colors.ERROR_100
            : Colors.CAUTION_100
        }
        type="CAPTION1">
        {children}
      </Text>
    </Container>
  );
};
