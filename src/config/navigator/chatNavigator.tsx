import React from 'react';

import {RouteTypes} from '.';
import ChatComponent from '@screens/Chat/chatComponent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CHAT, CHATDETAILS} from '@library';
import ChatDetails from '@screens/Chat/conversation';

const Stack = createNativeStackNavigator<RouteTypes.ChatNavigatorParamList>();
export const ChatNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={CHATDETAILS}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={CHAT} component={ChatComponent} />
      <Stack.Screen name={CHATDETAILS} component={ChatDetails} />
    </Stack.Navigator>
  );
};
