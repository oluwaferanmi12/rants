import React, { useContext } from 'react';

import { AppContext } from '@data';
import {
  APP_BOTTOM_NAVIGATOR,
  PROFILE_NAVIGATOR
} from '@library';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteTypes } from '.';
import { AppBottomNavigator } from './appBottomNavigator';

const Stack = createNativeStackNavigator<RouteTypes.GlobalStackParamList>();

export const GlobalNavigator = ({route}: {route: any}) => {
  const {authConfig} = useContext(AppContext);
  return (
    <Stack.Navigator
      initialRouteName={
        !authConfig.user.username ? PROFILE_NAVIGATOR : APP_BOTTOM_NAVIGATOR
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={APP_BOTTOM_NAVIGATOR}
        component={AppBottomNavigator}
      />
    </Stack.Navigator>
  );
};
