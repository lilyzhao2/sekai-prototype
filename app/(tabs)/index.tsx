import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Text, View, ImageSourcePropType, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define types
interface Story {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

interface StoryCardProps {
  story: Story;
}

export default function HomeScreen() {
  // Sample data for featured stories
  const featuredStories: Story[] = [
    {
      id: '1',
      title: 'Falling For Captain Marvel\'s Charm',
      image: { uri: 'https://placehold.co/160x200/f16522/white?text=Captain+Marvel' },
    },
    {
      id: '2',
      title: 'Black Widow saves the tech girl!',
      image: { uri: 'https://placehold.co/160x200/aa0000/white?text=Black+Widow' },
    },
    {
      id: '3',
      title: 'Scarlet Witch: Lab Troubles',
      image: { uri: 'https://placehold.co/160x200/8a0000/white?text=Scarlet+Witch' },
    },
  ];

  // Sample data for editors' choice
  const editorsChoice: Story[] = [
    {
      id: '4',
      title: 'My Bully Wants Me Forever',
      image: { uri: 'https://placehold.co/160x200/444444/white?text=Bully' },
    },
    {
      id: '5',
      title: 'Love Hashira Joins The Hot Spring!',
      image: { uri: 'https://placehold.co/160x200/7c9aff/white?text=Hot+Spring' },
    },
    {
      id: '6',
      title: 'The Military Commander Wants Me',
      image: { uri: 'https://placehold.co/160x200/223322/white?text=Military' },
    },
  ];

  // Sample data for more stories
  const moreStories: Story[] = [
    {
      id: '7',
      title: 'Siblings\' Forbidden Desire',
      image: { uri: 'https://placehold.co/160x200/ffd700/white?text=Siblings' },
    },
    {
      id: '8',
      title: 'My Hero Academia Girls Sleepover',
      image: { uri: 'https://placehold.co/160x200/9932cc/white?text=Academia' },
    },
    {
      id: '9',
      title: 'Erza Demands Her Baby',
      image: { uri: 'https://placehold.co/160x200/b22222/white?text=Erza' },
    },
  ];

  // Story card component
  const StoryCard: React.FC<StoryCardProps> = ({ story }) => (
    <TouchableOpacity style={styles.storyCard}>
      <Image source={story.image} style={styles.storyImage} />
      <View style={styles.storyTitleContainer}>
        <Text style={styles.storyTitle} numberOfLines={2}>{story.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Today's Picks For Lily Zhao (LZ)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRow}>
            {featuredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Editors' Choice</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRow}>
            {editorsChoice.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </ScrollView>

          <View style={styles.storiesGrid}>
            {moreStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 12,
  },
  storiesRow: {
    marginBottom: 20,
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  storyCard: {
    width: 160,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  storyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  storyTitleContainer: {
    padding: 8,
    height: 60,
    justifyContent: 'center',
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
