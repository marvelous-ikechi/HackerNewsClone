import React, {FunctionComponent} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import ScreenContainer from 'src/components/ScreenContainer';
import tw from 'lib/tailwind';
import SubmitBtn from 'src/components/Button/SubmitBtn';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {AuthStackParamList} from 'src/types/navigationTypes';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;
const Signup: FunctionComponent<Props> = ({navigation}) => {
  return (
    <ScreenContainer>
      <View style={tw`flex-1 w-full justify-center items-center`}>
        <TextInput
          placeholderTextColor={'white'}
          placeholder="First Name"
          style={tw`border-[0.5px] font-poppinsRegular px-3 rounded-md w-80 border-white`}
        />
        <TextInput
          placeholderTextColor={'white'}
          placeholder="Last Name"
          style={tw`border-[0.5px] mt-4 px-3 font-poppinsRegular rounded-md w-80 border-white`}
        />
        <TextInput
          placeholderTextColor={'white'}
          placeholder="Email"
          keyboardType="email-address"
          style={tw`border-[0.5px] mt-4 px-3 font-poppinsRegular rounded-md w-80 border-white`}
        />
        <TextInput
          placeholderTextColor={'white'}
          placeholder="Password"
          secureTextEntry={true}
          style={tw`border-[0.5px] px-3 mt-4  rounded-md w-80 border-white`}
        />
        <SubmitBtn title="Signup" onPress={() => {}} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={tw`text-white font-poppinsRegular text-right mt-4`}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default Signup;
