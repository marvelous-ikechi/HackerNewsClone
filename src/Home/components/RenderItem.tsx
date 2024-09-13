import React, {memo, useCallback} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {NewsData} from 'src/types/homeTypes';
import {truncaText} from 'src/utils/truncatext';
import tw from 'src/lib/tailwind';
import {useNavigation} from '@react-navigation/native';
import {convertTimestampToTimeString} from 'src/utils/timeConverter';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface NewsRenderItemProps {
  item: NewsData;
}

const NewsRenderItem: React.FC<NewsRenderItemProps> = ({item}) => {
  const navigation = useNavigation<any>();

  const handlePress = useCallback(() => {
    navigation.navigate('MainStack', {
      screen: 'NewsDetails',
      params: {
        url: item.url,
      },
    });
  }, [navigation, item.url]);

  return (
    <TouchableOpacity onPress={handlePress} style={tw`mb-6`}>
      <Text style={tw`font-poppinsRegular text-orange text-xs`}>
        {truncaText(item.title)}
      </Text>
      <View style={tw`flex-row mt-2 items-center`}>
        <Text style={tw`font-poppinsRegular text-[10px] text-white`}>
          <Text style={tw`text-gray-500`}>Author: </Text> {item.by}
        </Text>
        <Text style={tw`font-poppinsRegular ml-2 text-[10px] text-white`}>
          <Text style={tw`text-gray-500`}>Type: </Text> {item.type}
        </Text>
        <Text style={tw`font-poppinsRegular ml-2 text-[10px] text-white`}>
          <MaterialCommunityIcons name="clock-outline" color={'gray'} />{' '}
          {convertTimestampToTimeString(item.time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(NewsRenderItem);
