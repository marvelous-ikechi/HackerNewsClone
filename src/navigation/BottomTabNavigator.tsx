import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from 'src/Home';
import Profile from 'src/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'src/lib/tailwind';
import {BottomTabStackParamList} from 'src/types/navigationTypes';

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

export default function BottomTabNavigator() {
  const handleIconDisplay = useCallback((routeName: string, color: string) => {
    switch (routeName) {
      case 'Home':
        return (
          <MaterialCommunityIcons
            name="newspaper-variant-outline"
            color={color}
            size={23}
          />
        );
      case 'Profile':
        return (
          <MaterialCommunityIcons name="account" color={color} size={23} />
        );
      default:
        return (
          <MaterialCommunityIcons name="alert-circle" color={color} size={23} />
        );
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0.5,
          elevation: 0,
        },
        tabBarLabelStyle: tw`font-poppinsMedium`,
        tabBarActiveTintColor: '#FF885B', // Color of the icon and label when active
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => handleIconDisplay('Home', color),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => handleIconDisplay('Profile', color),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
