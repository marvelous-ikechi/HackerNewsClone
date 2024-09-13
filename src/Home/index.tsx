import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {FlatList, Text, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import ScreenContainer from 'src/components/ScreenContainer';
import {BottomTabStackParamList} from 'src/types/navigationTypes';
import {NewsData} from 'src/types/homeTypes';
import NewsRenderItem from './components/RenderItem';

type Props = NativeStackScreenProps<BottomTabStackParamList, 'Home'>;
const Home: FunctionComponent<Props> = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 10; // Number of stories to load per batch

  // Function to fetch top story IDs
  const fetchTopStories = async () => {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
    );
    const ids = await response.json();
    return ids;
  };

  // Function to fetch details of a specific story
  const fetchStoryDetails = async (storyId: number) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
    );
    const storyDetails = await response.json();
    return storyDetails;
  };

  // Function to load and append more news data (for pagination)
  const loadMoreNews = useCallback(async () => {
    if (isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const start = page * pageSize;
      const end = start + pageSize;
      const currentBatchIds = storyIds.slice(start, end);

      const storyPromises = currentBatchIds.map(fetchStoryDetails); // Fetch the current batch of story details
      const stories = await Promise.all(storyPromises);

      setNewsData(prevNewsData => [...prevNewsData, ...stories]); // Append new stories to the existing data
      setPage(prevPage => prevPage + 1); // Increment the page index
    } catch (error) {
      console.log('Error loading more news:', error);
    } finally {
      setIsLoadingMore(false); // Stop loading more indicator
    }
  }, [storyIds, page, isLoadingMore]);

  // Initial load to fetch top story IDs and first batch of stories
  const loadInitialData = useCallback(async () => {
    try {
      const topStoryIds = await fetchTopStories();
      setStoryIds(topStoryIds); // Set the story IDs
      setPage(0); // Reset the page to 0
    } catch (error) {
      console.log('Error fetching news:', error);
    } finally {
      setIsLoading(false); // Stop initial loading indicator
    }
  }, []);

  const listFooterComponent = () => {
    return isLoadingMore ? (
      <ActivityIndicator size="small" color={MD2Colors.orange500} />
    ) : null;
  };

  const renderItem = ({item}: {item: NewsData}) => {
    return <NewsRenderItem item={item} />;
  };

  // Fetch the next batch of stories when `storyIds` changes
  useEffect(() => {
    if (storyIds.length > 0) {
      loadMoreNews(); // Load the first batch of news
    }
  }, [storyIds, loadMoreNews]);

  // Fetch initial data when the component mounts
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <ScreenContainer>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={newsData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreNews} // Trigger loading more when scrolling to the bottom
            onEndReachedThreshold={0.5} // Load more when 50% from the bottom
            ListFooterComponent={listFooterComponent} // Show a loading spinner when more stories are being loaded
          />
        )}
      </View>
    </ScreenContainer>
  );
};

export default Home;
