import {ArrowLeft} from '@assets';
import {Button, ButtonTypes, Container, Text} from '@components';
import {useTheme} from '@data';
import React from 'react';
import {Image, View} from 'react-native';
import {IMAGES} from '@assets';

export default function Chat() {
  // const signOut = async () => {
  //   await auth.signOut();
  // };

  // useEffect(() => {
  //   signOut();
  // }, []);
  const {Colors} = useTheme();
  return (
    <Container bg={Colors.NEUTRAL_100} flex={1} jc="center" ai="center">
      {/* Chat Header */}
      <Container
        width="100%"
        p="16"
        fd="row"
        ai="center"
        jc="space-between"
        bg={Colors.LINE_LIGHT}>
        <View>
          <ArrowLeft width={24} height={24} fill={Colors.TEXT_ICON_DISABLED2} />
        </View>
        <Container fd="row" gap={8} bg={Colors.LINE_LIGHT} ai="center">
          <View>
            <Image source={IMAGES.groupChat} />
          </View>

          <Container bg={Colors.LINE_LIGHT} gap={2}>
            <Text color={Colors.TEXT_ICON_PRIMARY2} type="CAPTION2">
              Attendees & Vendors
            </Text>
            <Text color={Colors.TEXT_ICON_PRIMARY2_DISABLED} type="FOOTNOTE">
              OPEN SOURCE FESTIVAL 2023
            </Text>
          </Container>
        </Container>
        <Button type={ButtonTypes.SECONDARY_BLANK} title="More" />
      </Container>

      {/* Chat Messages */}
      <Container flex={1} width="100%" p="20 10" gap={12} jc="flex-end">
        {/* Example received message */}

        <Container gap={6}>
          <Container fd="row" gap={4} ai="center">
            <Text type="FOOTNOTE" color={Colors.TEXT_ICON_PRIMARY2}>
              Katherine Moss
            </Text>
            <Container br="4" bg={Colors.GREY_GRADIENT}>
              <Text type="CAPTION2" p="2 4" color={Colors.TEXT_ICON_PRIMARY}>
                Owner
              </Text>
            </Container>
          </Container>
          <Container
            bg={Colors.PRIMARY_100}
            bc={Colors.NEUTRAL_300}
            bw={1}
            p="12"
            br="0 12 12 12"
            ai="flex-end"
            style={{alignSelf: 'flex-start', maxWidth: '80%'}}>
            <Text color={Colors.TEXT_ICON_PRIMARY2} type="CAPTION3">
              Thanks Olivia! Almost there. I&apos;ll work on making those
              changes you suggested and will shoot it over.
            </Text>
            <Text color={Colors.TEXT_ICON_PRIMARY2_DISABLED} type="CAPTION2">
              10:16am
            </Text>
          </Container>
        </Container>
        {/* Example sent message */}

        <Container gap={6}>
          <Text ta="right" type="FOOTNOTE">
            You
          </Text>
          <Container
            p="8 14"
            br="16 0 16 16"
            bg={Colors.PRIMARY_900}
            bc={Colors.NEUTRAL_300}
            bw={1}
            ai="flex-end"
            style={{alignSelf: 'flex-end', maxWidth: '80%'}}>
            <Text color={Colors.TEXT_ICON_PRIMARY} type="CAPTION3">
              Thanks Olivia! Almost there. I&apos;ll work on making those
              changes you suggested and will shoot it over.
            </Text>
            <Text color={Colors.TEXT_ICON_SECONDARY} type="CAPTION2">
              10:16am
            </Text>
          </Container>
        </Container>
      </Container>

      {/* Chat Input */}
      <Container
        width="100%"
        fd="row"
        ai="center"
        p="12 20"
        bg={Colors.NEUTRAL_300}
        style={{
          borderTopLeftRadius: 16,
          gap: 8,
          borderTopRightRadius: 16,
        }}>
        <Container flex={1} bg={Colors.NEUTRAL_100} br="12" p="8 12">
          <Text color={Colors.NEUTRAL_300}>Type a message...</Text>
        </Container>
        <Container
          bg={Colors.PRIMARY_700}
          br="12"
          p="8 16"
          ai="center"
          jc="center">
          <Text color={Colors.NEUTRAL_100}>Send</Text>
        </Container>
      </Container>
    </Container>
  );
}
