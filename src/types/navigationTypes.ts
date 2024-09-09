import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
