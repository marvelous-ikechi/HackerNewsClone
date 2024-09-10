import React, {FunctionComponent} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import ScreenContainer from 'components/ScreenContainer';
import tw from 'lib/tailwind';
import SubmitBtn from 'components/Button/SubmitBtn';
import {AuthStackParamList} from 'src/types/navigationTypes';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {CommonActions} from '@react-navigation/native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
const Login: FunctionComponent<Props> = ({navigation}) => {
  return (
    <ScreenContainer>
      <View style={tw`flex-1 w-full justify-center items-center`}>
        <TextInput
          placeholderTextColor={'white'}
          placeholder="Email"
          style={tw`border-[0.5px] font-poppinsRegular px-3 rounded-md w-80 border-white`}
        />
        <TextInput
          placeholderTextColor={'white'}
          placeholder="Password"
          style={tw`border-[0.5px] font-poppinsRegular px-3 mt-4 rounded-md w-80 border-white`}
        />
        <SubmitBtn
          title="Login"
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'MainStack', params: {screen: 'Home'}}],
              }),
            )
          }
        />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={tw`text-white font-poppinsRegular text-right mt-4`}>
            Don't have an account? Signup
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default Login;
