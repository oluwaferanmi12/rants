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
export function EventListItemRow({
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
    <Container m="0 8 16 0" onPress={onPress}>
      <Picture width={267} height={127} source={{uri: images[0]}} />
      <Container
        jc="space-between"
        p="8"
        br="0 0 8 8"
        width={267}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          elevation: 2,
          backgroundColor: Colors.NEUTRAL_100,
          shadowColor: Colors.NEUTRAL_0,
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}>
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
        <Text type="FOOTNOTE" m="12 0 8 0">
          {title}
        </Text>
        <Text type="CAPTION2" color={Colors.TEXT_ICON_SECONDARY}>
          {`${DateTime.fromISO(startDate).toFormat(
            'dd LLL., yyyy',
          )} - ${DateTime.fromISO(endDate).toFormat(
            'dd LLL., yyyy',
          )} / ${DateTime.fromISO(startTime).toFormat(
            'hh:mm a',
          )} - ${DateTime.fromISO(endTime).toFormat('hh:mm a')}`}{' '}
        </Text>
        <Text type="CAPTION2" m="4 0 0 0" color={Colors.TEXT_ICON_DISABLED}>
          {location}
        </Text>
      </Container>
    </Container>
  );
}
