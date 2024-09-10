import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const ScreenContainer: FunctionComponent<Props> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default ScreenContainer;
