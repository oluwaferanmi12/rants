import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FORGOT_PASSWORD, INTRODUCTION, LOGIN, REGISTER} from '@library';
import {
  ForgotPassword,
  Introduction,
  Login,
  Register,
} from '@screens/Authentication';
import {RouteTypes} from '.';

const Stack =
  createNativeStackNavigator<RouteTypes.AuthenticationStackParamList>();

export const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={INTRODUCTION}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={INTRODUCTION} component={Introduction} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTER} component={Register} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};
