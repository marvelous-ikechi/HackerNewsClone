import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import {RootStackParamList} from 'src/types/navigationTypes';
import BottomTabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';
import Splashscreen from 'src/components/Splashscreen';
import MainStackNavigator from './MainStackNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigatior = () => {
  const user = useSelector((state: RootState) => state.user);
  const [initialRoute, setInitialRoute] = React.useState<
    keyof RootStackParamList | undefined
  >(undefined);

  useEffect(() => {
    if (user.email) {
      setInitialRoute('BottomTabStack');
    } else {
      setInitialRoute('AuthStack');
    }
  }, [user]);

  if (!initialRoute) {
    return <Splashscreen />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        options={{headerShown: false}}
        name="AuthStack"
        component={AuthNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTabStack"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MainStack"
        component={MainStackNavigator}
      />
    </Stack.Navigator>
  );
};

export default RootNavigatior;
