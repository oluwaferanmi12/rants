import React from 'react';

import {useTheme} from '@data';
import {Container} from '../container/Container';
import {Tag} from '../Tag/Tag';
import {Text} from '../text';
import {Event} from '../../libs';
import {DateTime} from 'luxon';
import {Picture} from '../image/Image';
interface Props {
  onPress?: () => void;
  event: Event;
}
export function EventListItem({
  event: {
    privacy,
    ticketType: type,
    name: title,
    venue: location,
    startDate,
    endDate,
    startTime,
    endTime,
    capacity,
    images,
  },
  onPress,
}: Props) {
  const {Colors} = useTheme();
  const isOnSale =
    DateTime.fromISO(endDate).toJSDate() > DateTime.now().toJSDate() &&
    type === 'priced';
  const isClosed =
    DateTime.fromISO(endDate).toJSDate() < DateTime.now().toJSDate();
  const isSoldOut = !capacity;
  const isTagHidden = type === 'free' && !isClosed && !isSoldOut;

  return (
    <Container fd="row" m="0 0 16 0" onPress={onPress}>
      <Picture width={84} height={84} br="8" source={{uri: images[0]}} />
      <Container jc="space-between" m="2 0 2 8" flex={1}>
        <Container fd="row" ai="center">
          <Tag>{privacy === 'public' ? 'Public Event' : 'Private Event'}</Tag>
          {!isTagHidden && (
            <Tag
              type={
                isOnSale
                  ? 'success'
                  : !capacity
                  ? 'error'
                  : isClosed
                  ? 'warning'
                  : 'neutral'
              }>
              {isOnSale ? 'Ticket on sales' : isSoldOut ? 'Sold out' : 'Closed'}
            </Tag>
          )}
        </Container>
        <Text type="CAPTION1" numberOfLines={1}>
          {title}
        </Text>
        <Text
          type="CAPTION2"
          color={Colors.TEXT_ICON_SECONDARY}
          numberOfLines={1}>
          {`${DateTime.fromISO(startDate).toFormat(
            'dd LLL., yyyy',
          )} - ${DateTime.fromISO(endDate).toFormat(
            'dd LLL., yyyy',
          )} / ${DateTime.fromISO(startTime).toFormat(
            'hh:mm a',
          )} - ${DateTime.fromISO(endTime).toFormat('hh:mm a')}`}{' '}
        </Text>
        <Text
          type="CAPTION2"
          color={Colors.TEXT_ICON_DISABLED}
          numberOfLines={1}>
          {location}
        </Text>
      </Container>
    </Container>
  );
}
