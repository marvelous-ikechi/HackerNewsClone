import React, {FunctionComponent, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import ScreenContainer from 'components/ScreenContainer';
import tw from 'lib/tailwind';
import SubmitBtn from 'components/Button/SubmitBtn';
import {AuthStackParamList} from 'src/types/navigationTypes';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {CommonActions} from '@react-navigation/native';
import useAuth from 'src/hooks/useAuth';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import ErrorText from 'src/components/Text/ErrorText';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
const Login: FunctionComponent<Props> = ({navigation}) => {
  const {login} = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signUpSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(data.email, data.password);
      if (response.success) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'MainStack', params: {screen: 'Home'}}],
          }),
        );
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={tw`flex-1 w-full justify-center items-center`}>
        {error && <ErrorText text={error} />}
        <Controller
          control={control}
          name={'email'}
          render={({field: {value, onChange, onBlur}}) => (
            <>
              <TextInput
                placeholderTextColor={'white'}
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={tw`border-[0.5px] text-white font-poppinsRegular px-3 rounded-md w-80 border-white`}
              />
              {errors?.email?.message && (
                <ErrorText text={errors.email.message} />
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name={'password'}
          render={({field: {value, onChange, onBlur}}) => (
            <>
              <TextInput
                placeholderTextColor={'white'}
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={tw`border-[0.5px] text-white font-poppinsRegular px-3 mt-4 rounded-md w-80 border-white`}
              />
              {errors?.password?.message && (
                <ErrorText text={errors.password.message} />
              )}
            </>
          )}
        />
        <SubmitBtn
          title="Login"
          isLoading={isLoading}
          onPress={handleSubmit(handleLogin)}
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
