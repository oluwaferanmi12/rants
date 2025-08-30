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
      <Text>Coming soon!</Text>
    </Container>
  );
}

