import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackParamList} from 'src/types/navigationTypes';
import NewsDetails from 'src/Home/NewsDetails';

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="NewsDetails"
        component={NewsDetails}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
