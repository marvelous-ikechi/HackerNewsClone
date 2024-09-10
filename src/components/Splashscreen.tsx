import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import ScreenContainer from './ScreenContainer';
import tw from 'src/lib/tailwind';

const Splashscreen: FunctionComponent = () => {
  return (
    <ScreenContainer>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-orange text-4xl font-poppinsBold`}>HN</Text>
      </View>
    </ScreenContainer>
  );
};

export default Splashscreen;
