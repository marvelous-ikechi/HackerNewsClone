import React, {FunctionComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import ScreenContainer from 'src/components/ScreenContainer';
import {MainStackParamList} from 'src/types/navigationTypes';
import tw from 'src/lib/tailwind';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<MainStackParamList, 'NewsDetails'>;

const NewsDetails: FunctionComponent<Props> = ({navigation, route}) => {
  const {url} = route.params; // Get the URL from the route params

  return (
    <ScreenContainer>
      <View style={tw`flex-1 px-2 py-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={24}
            color="orange"
          />
        </TouchableOpacity>

        <WebView source={{uri: url}} style={tw`flex-1`} />
      </View>
    </ScreenContainer>
  );
};

export default NewsDetails;
