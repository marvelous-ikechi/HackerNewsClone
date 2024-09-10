import React, {FunctionComponent} from 'react';
import {Text} from 'react-native';
import tw from 'src/lib/tailwind';

interface Props {
  text: string;
}

const ErrorText: FunctionComponent<Props> = ({text}) => {
  return (
    <Text style={tw`text-red-500 text-xs font-poppinsMedium text-left mt-2`}>
      {text}
    </Text>
  );
};

export default ErrorText;
