import {createStackNavigator} from '@react-navigation/stack';
import React, {FunctionComponent} from 'react';
import Login from '../auth/screens/Login';
import {AuthStackParamList} from '../types/navigationTypes';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
