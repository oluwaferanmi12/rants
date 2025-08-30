import {CheckboxOff, CheckboxOn} from '@assets';
import {useTheme} from '@data';
import React from 'react';
import {Container} from '../container/Container';
import {Text} from '../text';

type Props = {
  title: string;
  checked?: boolean;
  onPress?: (status: boolean) => void;
};
export const Radio = ({title, checked = false, onPress}: Props) => {
  const {Colors} = useTheme();
  return (
    <Container
      m="0 16 0 0"
      fd="row"
      ai="center"
      onPress={() => onPress?.(!checked)}>
      <Text
        type="FOOTNOTE"
        m="0 8 0 0"
        color={
          !checked ? Colors.TEXT_ICON_SECONDARY : Colors.TEXT_ICON_PRIMARY
        }>
        {title}
      </Text>
      {checked ? <CheckboxOn /> : <CheckboxOff />}
    </Container>
  );
};
