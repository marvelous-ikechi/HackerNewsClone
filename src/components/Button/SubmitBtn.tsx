import React, {FunctionComponent} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import tw from '../../lib/tailwind';

interface Props {
  title: string;
  onPress: () => void;
}

const SubmitBtn: FunctionComponent<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={tw`bg-orange mt-4 h-12 items-center w-80 rounded-md justify-center`}
      onPress={onPress}>
      <Text style={[tw`text-white font-poppinsMedium`, {}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitBtn;
