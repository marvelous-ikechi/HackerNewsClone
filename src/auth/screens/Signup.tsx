import React, {FunctionComponent, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenContainer from 'src/components/ScreenContainer';
import tw from 'lib/tailwind';
import SubmitBtn from 'src/components/Button/SubmitBtn';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {AuthStackParamList} from 'src/types/navigationTypes';
import {CommonActions} from '@react-navigation/native';
import useAuth from 'src/hooks/useAuth';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {IFormInput} from 'src/types/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ErrorText from 'src/components/Text/ErrorText';
import {useDispatch} from 'react-redux';
import {setUser} from 'src/redux/slices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup: FunctionComponent<Props> = ({navigation}) => {
  const {signup} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSignup = async (data: IFormInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signup(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
      );
      if (response.success) {
        console.log(response);
        dispatch(setUser(response.user));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTabStack', params: {screen: 'Home'}}],
          }),
        );
      } else {
        setError(response.error);
      }
      console.log('response', response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={tw`flex-1 w-full justify-center items-center`}>
        <ScrollView
          contentContainerStyle={tw`flex-1 w-full justify-center items-center`}>
          <Text style={tw`text-white font-poppinsBold mb-8 text-2xl`}>
            Sign Up
          </Text>
          {error && <ErrorText text={error} />}
          <Controller
            control={control}
            name={'firstName'}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <TextInput
                  placeholderTextColor={'white'}
                  placeholder="First Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={tw`border-[0.5px] text-white font-poppinsRegular px-3 rounded-md w-80 border-white`}
                />
                {errors?.firstName?.message && (
                  <ErrorText text={errors.firstName?.message} />
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name={'lastName'}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <TextInput
                  placeholderTextColor={'white'}
                  placeholder="Last Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={tw`border-[0.5px] text-white mt-4 px-3 font-poppinsRegular rounded-md w-80 border-white`}
                />
                {errors?.lastName?.message && (
                  <ErrorText text={errors.lastName?.message} />
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name={'email'}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <TextInput
                  placeholderTextColor={'white'}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={tw`border-[0.5px] text-white mt-4 px-3 font-poppinsRegular rounded-md w-80 border-white`}
                />
                {errors?.email?.message && (
                  <ErrorText text={errors.email?.message} />
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name={'password'}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <View
                  style={tw`border-[0.5px] flex-row mt-4 rounded-md  border-white`}>
                  <TextInput
                    placeholderTextColor={'white'}
                    placeholder="Password"
                    value={value}
                    secureTextEntry={showPassword}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={tw` text-white font-poppinsRegular px-3  w-80 `}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye-off' : 'eye-outline'}
                      size={20}
                      color="white"
                      style={tw`absolute right-3 top-3`}
                    />
                  </TouchableOpacity>
                </View>
                {errors?.password?.message && (
                  <ErrorText text={errors.password?.message} />
                )}
              </>
            )}
          />
          <View style={tw`mt-4 w-80`}>
            <SubmitBtn
              title="Sign up"
              isLoading={isLoading}
              onPress={handleSubmit(handleSignup)}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-white font-poppinsRegular text-right mt-4`}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default Signup;
