import React from 'react';
import styled from 'styled-components/native';
import {Text} from '../text';
import {useTheme} from '@data';

export const Divider = () => {
  const {Colors} = useTheme();
  const Container = styled.View`
    margin-vertical: 32px;
    flex-direction: row;
    align-items: center;
  `;

  const Line = styled.View`
    background-color: ${Colors.NEUTRAL_300};
    height: 1px;
    flex: 1px;
  `;

  return (
    <Container>
      <Line />
      <Text type="SUBHEAD" m="0 28">
        or
      </Text>
      <Line />
    </Container>
  );
};
