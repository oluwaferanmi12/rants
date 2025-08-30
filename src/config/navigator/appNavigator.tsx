import React, {useContext} from 'react';

import {AppContext} from '@data';
import {AUTH_NAVIGATOR, GLOBAL_NAVIGATOR} from '@library';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteTypes} from '.';
import {AuthenticationNavigator} from './authenticationNavigtor';
import {GlobalNavigator} from './globalNavigator';

const Stack = createNativeStackNavigator<RouteTypes.AppStackParamList>();

export const AppNavigator = () => {
  const {authConfig} = useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!authConfig.isAuthenticated ? (
        <Stack.Screen
          name={AUTH_NAVIGATOR}
          component={AuthenticationNavigator}
        />
      ) : (
        <Stack.Screen name={GLOBAL_NAVIGATOR} component={GlobalNavigator} />
      )}
    </Stack.Navigator>
  );
};
