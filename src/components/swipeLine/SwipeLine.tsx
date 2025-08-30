import {useTheme} from '@data';
import React from 'react';
import {Container} from '../container/Container';

export const SwipeLine = () => {
  const {Colors} = useTheme();
  return (
    <Container
      bg={Colors.NEUTRAL_300}
      br="2"
      m="0 0 12 0"
      width={36}
      height={4}
      als="center">
      <></>
    </Container>
  );
};
