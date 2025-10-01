import React from 'react';

import {CHAT_NAVIGATOR, HOME_EVENTS} from '@library';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteTypes} from '.';
import {Chat} from '../../assets';
import {useTheme} from '../../data';
import {ChatNavigator} from './chatNavigator';
const Tab = createBottomTabNavigator<RouteTypes.BottomNavParamList>();

export const AppBottomNavigator = () => {
  const {Colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={HOME_EVENTS}
      screenOptions={{
        tabBarStyle: {backgroundColor: Colors.NEUTRAL_100},
        tabBarActiveTintColor: Colors.PRIMARY_900,
        headerShown: false,
      }}>
      {/* <Tab.Screen
        name={'Feeds'}
        component={ChatComponent}
        options={{tabBarLabel: 'Feeds', tabBarIcon: Feed}}
      />
      <Tab.Screen
        name={HOME_EVENTS}
        component={HomeEvents}
        options={{tabBarLabel: 'Events', tabBarIcon: Tent}}
      />
      <Tab.Screen
        name={'Vendors'}
        component={ChatComponent}
        options={{tabBarLabel: 'Vendors', tabBarIcon: Box}}
      /> */}
      <Tab.Screen
        name={CHAT_NAVIGATOR}
        component={ChatNavigator}
        options={{tabBarLabel: 'Chat', tabBarIcon: Chat}}
      />
      {/* <Tab.Screen
        name={'More'}
        component={ProfileNavigator}
        options={{tabBarLabel: 'Profile', tabBarIcon: MoreIcon}}
      /> */}
    </Tab.Navigator>
  );
};
