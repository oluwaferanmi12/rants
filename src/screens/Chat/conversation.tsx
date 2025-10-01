import {AddWhite, IMAGES, SearchIcon} from '@assets';
import {Container, Text} from '@components';
import {RouteTypes} from '@config';
import {useTheme} from '@data';
import {CHAT} from '@library';
import React from 'react';
import {Image, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const Conversation = ({navigation}: RouteTypes.ChatDetailsProps) => {
  const {Colors} = useTheme();
  // const hadleClicked = () => {};
  return (
    <Container flex={1} position="relative">
      <Container p="16" fd="row" ai="center" jc="space-between">
        <Text type="H3" color={Colors.TEXT_ICON_PRIMARY}>
          Chats
        </Text>
        <View>
          <SearchIcon />
        </View>
      </Container>

      {/* Chat lists */}
      <Container
        width="100%"
        p="16"
        fd="row"
        ai="center"
        jc="space-between"
        style={{
          borderWidth: 0.5,
          borderTopColor: Colors.NEUTRAL_300,
          borderBottomColor: Colors.NEUTRAL_300,
        }}
        onPress={() => navigation.navigate(CHAT)}>
        <Container fd="row" gap={8} ai="center">
          <View>
            <Image source={IMAGES.groupChat} />
          </View>

          <Container gap={4}>
            <Text color={Colors.TEXT_ICON_PRIMARY} type="FOOTNOTE">
              OPEN SOURCE FESTIVAL 20231
            </Text>
            <Text color={Colors.TEXT_ICON_PRIMARY2_DISABLED} type="CAPTION2">
              Owner: The event start strictly by 12:00 PM
            </Text>
          </Container>
        </Container>
        <Container gap={4}>
          <Text color={Colors.TEXT_ICON_PRIMARY2_DISABLED} type="CAPTION2">
            12:00 PM
          </Text>
          <Svg width={20} height={20} style={{alignSelf: 'flex-end'}}>
            <Circle cx={10} cy={10} r={6.5} fill={Colors.PRIMARY_EXTRA} />
          </Svg>
        </Container>
      </Container>

      {/* new chat */}
      <Container position="absolute" p="16" right={20} bottom={100}>
        <View
          style={{
            backgroundColor: Colors.PRIMARY_900,
            width: 56,
            height: 56,
            borderRadius: 56,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AddWhite fill={Colors.TEXT_ICON_PRIMARY2} />
        </View>
      </Container>
    </Container>
  );
};

export default Conversation;
