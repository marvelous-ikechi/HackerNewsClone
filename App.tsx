import React, {FunctionComponent} from 'react';
import './gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigatior from './src/navigation/RootNavigator';

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <RootNavigatior />
    </NavigationContainer>
  );
};

export default App;
