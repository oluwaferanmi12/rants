import React from 'react';
import {Button} from '../button';
import {useTheme} from '@data';
import {S1, S2, S3, S4, S5, Star as StarIcon} from '@assets';
import {Container} from '../container/Container';

type Props = {
  onPress: (val: string) => void;
  rating: string;
  selectedRating?: string;
};

export const Star = ({onPress, rating, selectedRating}: Props) => {
  const {Colors} = useTheme();
  return (
    <Container
      jc="flex-start"
      fd="row"
      ai="center"
      br="6"
      bw={2}
      p="0 2 0 0"
      m="0 12 0 0"
      bc={selectedRating === rating ? Colors.PRIMARY_900 : Colors.NEUTRAL_100}
      bg={selectedRating === rating ? Colors.PRIMARY_700 : Colors.TRANSPARENT}>
      <Button
        title={rating}
        p="6"
        m="0 8 0 0"
        rightIcon={<StarIcon />}
        bg={Colors.NEUTRAL_200}
        bc={Colors.NEUTRAL_200}
        textColor={Colors.TEXT_ICON_DISABLED}
        onPress={() => onPress(rating)}
      />
      {rating === '1.0' && <S1 />}
      {rating === '2.0' && <S2 />}
      {rating === '3.0' && <S3 />}
      {rating === '4.0' && <S4 />}
      {rating === '5.0' && <S5 />}
    </Container>
  );
};
