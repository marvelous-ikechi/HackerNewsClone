import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import {RootStackParamList} from 'src/types/navigationTypes';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigatior = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="AuthStack"
        component={AuthNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MainStack"
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default RootNavigatior;
