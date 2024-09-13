import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTabStack: NavigatorScreenParams<BottomTabStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type BottomTabStackParamList = {
  Home: undefined;
  Profile: undefined;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type MainStackParamList = {
  NewsDetails: {
    url: string;
  };
};
