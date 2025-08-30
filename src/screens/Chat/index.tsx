import {Container, Text} from '@components';
import {useTheme} from '@data';
import React, { useEffect } from 'react';
import { auth } from 'src/libs/firebase';

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
        p="16 20"
        fd="row"
        ai="center"
        bg={Colors.PRIMARY_700}
        style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
      >
        <Text color={Colors.NEUTRAL_100} type="BODY">
          Chat
        </Text>
      </Container>

      {/* Chat Messages */}
      <Container
        flex={1}
        width="100%"
        p="20 10"
        gap={12}
        jc="flex-end"
      >
        {/* Example received message */}
        <Container
          bg={Colors.PRIMARY_100}
          bc={Colors.NEUTRAL_300}
          bw={1}
          p="8 14"
          br="0 16 16 16"
          ai="flex-start"
          style={{ alignSelf: 'flex-start', maxWidth: '80%' }}
        >
          <Text color={Colors.TEXT_ICON_PRIMARY2}>Hey! How are you?</Text>
        </Container>
        {/* Example sent message */}
        
        <Container
          p="8 14"
          br="16 0 16 16"
          bg={Colors.PRIMARY_900}
          bc={Colors.NEUTRAL_300}
          bw={1}
          gap={8}
          ai="flex-end"
          style={{ alignSelf: 'flex-end', maxWidth: '80%' }}
        >
          <Text color={Colors.TEXT_ICON_PRIMARY} >I'm good, thanks!</Text>
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
          borderTopRightRadius: 16,
          gap: 8,
        }}
      >
        <Container flex={1} bg={Colors.NEUTRAL_100} br="12" p="8 12">
          <Text color={Colors.NEUTRAL_300}>Type a message...</Text>
        </Container>
        <Container
          bg={Colors.PRIMARY_700}
          br="12"
          p="8 16"
          ai="center"
          jc="center"
        >
          <Text color={Colors.NEUTRAL_100}>
        Send
          </Text>
        </Container>
      </Container>
    </Container>
  );
}

