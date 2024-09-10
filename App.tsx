import React, {FunctionComponent} from 'react';
import './gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigatior from './src/navigation/RootNavigator';
import {persistor, store} from 'src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigatior />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
