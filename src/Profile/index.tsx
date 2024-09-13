import React, {FunctionComponent} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenContainer from 'src/components/ScreenContainer';
import tw from 'src/lib/tailwind';
import {RootState} from 'src/redux/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SubmitBtn from 'src/components/Button/SubmitBtn';
import {clearUser, setUser} from 'src/redux/slices';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {BottomTabStackParamList} from 'src/types/navigationTypes';
import {CommonActions} from '@react-navigation/native';
import useAuth from 'src/hooks/useAuth';

type Props = NativeStackScreenProps<BottomTabStackParamList, 'Profile'>;
const Profile: FunctionComponent<Props> = ({navigation}) => {
  const user = useSelector((state: RootState) => state.user);
  const [canEdit, setCanEdit] = React.useState<boolean>(false);
  const [bio, setBio] = React.useState<string>('');
  const dispatch = useDispatch();
  const {updateUser} = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  console.log('user', user);

  const handleBioUpdate = async () => {
    console.log('bio', {...user, bio});
    setIsSubmitting(true);
    await updateUser(user.email, user.firstName, user.lastName, bio)
      .then(response => {
        if (response.success) {
          console.log('User updated successfully');
        } else {
          console.log('Error updating user:', response.error);
        }
      })
      .catch(err => console.error(err));
    dispatch(setUser({...user, bio}));
    setCanEdit(false);
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setCanEdit(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack', params: {screen: 'Login'}}],
      }),
    );
  };

  return (
    <ScreenContainer>
      <View style={tw`justify-center  items-center`}>
        <View style={tw`w-full flex-row items-center justify-between`}>
          <Pressable onPress={handleLogout} style={tw`flex-row items-center`}>
            <MaterialCommunityIcons
              name="power-standby"
              size={25}
              color="white"
            />
            <Text
              style={tw`text-${
                canEdit ? 'gray-500' : 'white'
              } font-poppinsMedium ml-1`}>
              Logout
            </Text>
          </Pressable>
          <Pressable
            style={tw`flex-row items-center`}
            onPress={() => setCanEdit(prev => !prev)}>
            <Text
              style={tw`text-${
                canEdit ? 'gray-500' : 'white'
              } font-poppinsMedium`}>
              Edit Bio{' '}
            </Text>
            <MaterialCommunityIcons
              name="pencil"
              size={25}
              color={canEdit ? 'gray' : 'white'}
            />
          </Pressable>
        </View>
        <View style={tw`relative`}>
          <MaterialCommunityIcons
            name="account-circle"
            size={100}
            color="white"
          />
        </View>
        <Text style={tw`text-white font-poppinsMedium`}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={tw`text-white font-poppinsMedium`}>{user.email}</Text>
        {!canEdit && (
          <Text style={tw`text-gray-500 mt-10 font-poppinsMedium`}>
            {user.bio}
          </Text>
        )}
        {canEdit && (
          <View
            style={tw` w-full h-30 border-[0.5px] rounded-md   border-white `}>
            <TextInput
              placeholder="about me"
              placeholderTextColor={'white'}
              multiline={true}
              value={bio}
              onChangeText={setBio}
              style={tw`text-white  p-3 w-full  font-poppinsMedium`}
            />
          </View>
        )}
      </View>
      {canEdit && (
        <View style={tw`w-full flex-1 justify-end items-end mb-10 `}>
          <SubmitBtn
            isLoading={isSubmitting}
            title="Save"
            disabled={bio === user.bio || bio === '' || isSubmitting}
            onPress={handleBioUpdate}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

export default Profile;
