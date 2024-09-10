import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ScreenContainer from 'src/components/ScreenContainer';
import tw from 'src/lib/tailwind';
import {RootState} from 'src/redux/store';

const Profile: FunctionComponent = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <ScreenContainer>
      <View style={tw`justify-center items-center`}>
        <Text style={tw`text-white font-poppinsMedium`}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={tw`text-white font-poppinsMedium`}>{user.email}</Text>
      </View>
    </ScreenContainer>
  );
};

export default Profile;
