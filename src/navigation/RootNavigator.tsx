import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import {RootStackParamList} from '../types/navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigatior = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="AuthStack"
        component={AuthNavigator}
      />
    </Stack.Navigator>
  );
};

export default RootNavigatior;
