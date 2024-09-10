import React, {FunctionComponent} from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import tw from '../../lib/tailwind';

interface Props {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

const SubmitBtn: FunctionComponent<Props> = ({title, onPress, isLoading}) => {
  return (
    <TouchableOpacity
      style={tw`bg-orange mt-4 h-12 items-center w-80 rounded-md justify-center`}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={tw`text-white font-poppinsMedium text-base`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitBtn;
