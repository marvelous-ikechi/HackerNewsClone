import {createStackNavigator} from '@react-navigation/stack';
import React, {FunctionComponent} from 'react';
import Login from 'auth/screens/Login';
import {AuthStackParamList} from 'src/types/navigationTypes';
import Signup from 'auth/screens/Signup';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={Signup}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
