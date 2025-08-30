import React from 'react';
import {Text} from '../text';
import styled from 'styled-components/native';
import {useTheme} from '@data';

const Container = styled.View`
  margin-bottom: 40px;
`;
const Header = styled(Text)`
  margin-bottom: 16px;
`;
const Description = styled(Text)``;

type AuthHeaderProps = {
  headerText: string;
  description: string;
};

export const AuthHeader = ({headerText, description}: AuthHeaderProps) => {
  const {Colors} = useTheme();
  return (
    <Container>
      <Header color={Colors.TEXT_ICON_PRIMARY} type="H2">
        {headerText}
      </Header>
      <Description color={Colors.TEXT_ICON_SECONDARY} type="FOOTNOTE">
        {description}
      </Description>
    </Container>
  );
};
