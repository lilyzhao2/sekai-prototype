import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Text, View, ImageSourcePropType, StatusBar, Platform, FlatList, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Define types
interface Story {
  id: string;
  title: string;
  image: ImageSourcePropType;
  platform?: string;
  progress?: number;
  lastReadChapter?: number;
  chapters?: number;
  genre?: string;
  wordCount?: number;
  completionStatus?: 'Ongoing' | 'Completed' | 'Hiatus';
  rating?: number;
  timeToRead?: string;
}

interface StoryCardProps {
  story: Story;
  onPress: () => void;
  showMetrics?: boolean;
}

// Genre categories
const GENRES = ['Romance', 'Fantasy', 'Sci-Fi', 'Adventure', 'Fanfiction', 'Drama'];

// Top component to discover new stories
const DiscoverNewStoriesSection = () => {
  const router = useRouter();
  
  return (
    <TouchableOpacity
      style={styles.discoverContainer}
      onPress={() => router.push({pathname: '/(tabs)/stories'})}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
        style={styles.discoverGradient}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1512519829533-a985fb6fbea1?q=80&w=1064&auto=format&fit=crop' }}
          style={styles.discoverBackground}
        >
          <View style={styles.discoverContent}>
            <Text style={styles.discoverTitle}>Discover New Stories</Text>
            <Text style={styles.discoverSubtitle}>Find your next favorite adventure</Text>
            <View style={styles.discoverButton}>
              <Text style={styles.discoverButtonText}>Browse All Stories</Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Bottom component to explore worlds
const ExploreNewWorldsButton = () => {
  const router = useRouter();
  
  return (
    <TouchableOpacity
      style={styles.exploreWorldsButton}
      onPress={() => router.push({pathname: '/(tabs)/wiki'})}
    >
      <LinearGradient
        colors={['#4BDFC3', '#9EEAEE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.exploreGradient}
      >
        <Ionicons name="planet-outline" size={22} color="#000" />
        <Text style={styles.exploreButtonText}>Explore New Worlds</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Sample data for continue reading stories
  const continueReadingStories: Story[] = [
    {
      id: '3',
      title: 'The Last Guardian',
      image: { uri: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1170&auto=format&fit=crop' },
      chapters: 15,
      platform: 'Sekai',
      progress: 75,
      lastReadChapter: 11,
      genre: 'Fantasy',
      wordCount: 45000,
      completionStatus: 'Ongoing',
      rating: 4.7,
      timeToRead: '15 min left'
    },
    {
      id: '7',
      title: 'The Dragon\'s Chosen',
      image: { uri: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=980&auto=format&fit=crop' },
      chapters: 24,
      platform: 'AO3',
      progress: 25,
      lastReadChapter: 6,
      genre: 'Fantasy',
      wordCount: 67000,
      completionStatus: 'Completed',
      rating: 4.9,
      timeToRead: '48 min left'
    },
    {
      id: '4',
      title: 'My Bully Wants Me Forever',
      image: { uri: 'https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=687&auto=format&fit=crop' },
      chapters: 15,
      platform: 'Wattpad',
      progress: 40,
      lastReadChapter: 6,
      genre: 'Romance',
      wordCount: 26000,
      completionStatus: 'Ongoing',
      rating: 3.8,
      timeToRead: '25 min left'
    }
  ];
  
  // Sample data for all stories grouped by genre
  const allStoriesByGenre: Record<string, Story[]> = {
    'Romance': [
      {
        id: '1',
        title: 'Falling For Captain Marvel\'s Charm',
        image: { uri: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=735&auto=format&fit=crop' },
        platform: 'Wattpad',
        genre: 'Romance',
        wordCount: 35000,
        completionStatus: 'Ongoing',
        rating: 4.2
      },
      {
        id: '4',
        title: 'My Bully Wants Me Forever',
        image: { uri: 'https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=687&auto=format&fit=crop' },
        platform: 'Wattpad',
        genre: 'Romance',
        wordCount: 26000,
        completionStatus: 'Ongoing',
        rating: 3.8
      },
    ],
    'Fantasy': [
      {
        id: '3',
        title: 'Scarlet Witch: Lab Troubles',
        image: { uri: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1015&auto=format&fit=crop' },
        platform: 'Sekai',
        genre: 'Fantasy',
        wordCount: 58000,
        completionStatus: 'Completed',
        rating: 4.5
      },
      {
        id: '7',
        title: 'The Dragon\'s Chosen',
        image: { uri: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=980&auto=format&fit=crop' },
        platform: 'AO3',
        genre: 'Fantasy',
        wordCount: 67000,
        completionStatus: 'Completed',
        rating: 4.9
      },
    ],
  };

  // Sample data for editors' choice
  const editorsChoice: Story[] = [
    {
      id: '10',
      title: 'The Academy of Elements',
      image: { uri: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=987&auto=format&fit=crop' },
      platform: 'Sekai',
      genre: 'Fantasy',
      wordCount: 72000,
      completionStatus: 'Ongoing',
      rating: 4.9
    },
    {
      id: '11',
      title: 'His Dangerous Addiction',
      image: { uri: 'https://images.unsplash.com/photo-1525145770200-ecb9a96bfcbd?q=80&w=1064&auto=format&fit=crop' },
      platform: 'Wattpad',
      genre: 'Romance',
      wordCount: 55000,
      completionStatus: 'Completed',
      rating: 4.7
    },
  ];

  // Sample data for top 10 stories
  const top10Stories: Story[] = [
    {
      id: '20',
      title: 'The Demon Prince\'s Forbidden Love',
      image: { uri: 'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=987&auto=format&fit=crop' },
      platform: 'Sekai',
      genre: 'Romance',
      wordCount: 85000,
      completionStatus: 'Ongoing',
      rating: 4.9
    },
    {
      id: '21',
      title: 'The Kingdom of Enchanted Isles',
      image: { uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1064&auto=format&fit=crop' },
      platform: 'Sekai',
      genre: 'Fantasy',
      wordCount: 120000,
      completionStatus: 'Ongoing',
      rating: 4.8
    },
    {
      id: '22',
      title: 'The CEO\'s Secret Arrangement',
      image: { uri: 'https://images.unsplash.com/photo-1604328471151-b52226907017?q=80&w=1064&auto=format&fit=crop' },
      platform: 'Sekai',
      genre: 'Romance',
      wordCount: 68000,
      completionStatus: 'Completed',
      rating: 4.7
    }
  ];

  // Sample data for top 10 worlds
  const top10Worlds: Story[] = [
    {
      id: '30',
      title: 'Celestial Academy Universe',
      image: { uri: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1022&auto=format&fit=crop' },
      platform: 'Sekai',
      genre: 'Fantasy',
      wordCount: 250000,
      completionStatus: 'Ongoing',
      rating: 4.9
    },
    {
      id: '31',
      title: 'Elysium: The Fallen Empire',
      image: { uri: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=1039&auto=format&fit=crop' },
      platform: 'Sekai',
      genre: 'Science Fiction',
      wordCount: 320000,
      completionStatus: 'Ongoing',
      rating: 4.8
    },
    {
      id: '32',
      title: 'Modern Mystics',
      image: { uri: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=1039&auto=format&fit=crop' },
      platform: 'Sekai',
      genre: 'Urban Fantasy',
      wordCount: 185000,
      completionStatus: 'Ongoing',
      rating: 4.7
    }
  ];

  // Open the story reader
  const openStoryReader = (story: Story) => {
    router.push({
      pathname: '/story-reader',
      params: {
        id: story.id,
        title: story.title,
      }
    });
  };

  // Story card component
  const StoryCard: React.FC<StoryCardProps> = ({ story, onPress, showMetrics = false }) => (
    <TouchableOpacity style={styles.storyCard} onPress={onPress}>
      <Image source={story.image} style={styles.storyImage} />
      <View style={styles.storyTitleBackground}>
        <Text style={styles.storyTitle} numberOfLines={2}>{story.title}</Text>
        {showMetrics && (
          <View style={styles.storyMetrics}>
            <View style={styles.metricItem}>
              <Ionicons name="book-outline" size={12} color="#BBB" />
              <Text style={styles.metricText}>{Math.round(story.wordCount ? story.wordCount / 1000 : 0)}K</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.metricText}>{story.rating}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: story.completionStatus === 'Completed' ? '#4BDFC3' : 
                              story.completionStatus === 'Hiatus' ? '#FFD166' : '#666' }
            ]}>
              <Text style={styles.statusText}>{story.completionStatus}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Add Discover New Stories section at the top */}
          <DiscoverNewStoriesSection />
          
          {/* Continue Reading Section */}
          <View style={{marginBottom: 24}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 16}}>
              <Text style={styles.sectionTitle}>Continue Reading</Text>
              <TouchableOpacity>
                <Text style={{color: '#4BDFC3', fontSize: 14}}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {/* Continue Reading Stories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 16}}>
              {continueReadingStories.map((story) => (
                <View key={story.id} style={styles.continueReadingCard}>
                  <TouchableOpacity onPress={() => openStoryReader(story)}>
                    <Image source={story.image} style={styles.continueReadingImage} />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12}}
                    >
                      <Text style={styles.continueReadingCardTitle}>{story.title}</Text>
                      <View style={{marginTop: 8}}>
                        <View style={styles.continueReadingProgressBar}>
                          <View style={[
                            styles.continueReadingProgressFill, 
                            { width: story.progress ? `${story.progress}%` : '0%' }
                          ]} />
                        </View>
                        <Text style={styles.continueReadingProgressText}>
                          {story.progress}% · Ch {story.lastReadChapter}/{story.chapters}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                        <Text style={{color: '#CCC', fontSize: 12}}>{story.timeToRead}</Text>
                        <Text style={{color: '#CCC', fontSize: 12}}>{story.platform}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          
          {/* Top 10 Stories */}
          <View style={{marginBottom: 24}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 16}}>
              <Text style={styles.sectionTitle}>Top 10 Stories</Text>
              <TouchableOpacity>
                <Text style={{color: '#4BDFC3', fontSize: 14}}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 16}}>
              {top10Stories.map((story) => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onPress={() => openStoryReader(story)} 
                  showMetrics={true}
                />
              ))}
            </ScrollView>
          </View>
          
          {/* Top 10 Worlds */}
          <View style={{marginBottom: 24}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 16}}>
              <Text style={styles.sectionTitle}>Top 10 Worlds</Text>
              <TouchableOpacity>
                <Text style={{color: '#4BDFC3', fontSize: 14}}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 16}}>
              {top10Worlds.map((story) => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onPress={() => openStoryReader(story)} 
                  showMetrics={true}
                />
              ))}
            </ScrollView>
          </View>
          
          {/* Explore New Worlds Button at the bottom */}
          <ExploreNewWorldsButton />
          
          {/* Add spacing at the bottom */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    marginTop: 16,
  },
  continueReadingSection: {
    marginBottom: 24,
  },
  continueReadingList: {
    paddingRight: 16,
  },
  continueReadingCard: {
    width: 300,
    height: 120,
    backgroundColor: 'rgba(30,30,30,0.6)',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  continueReadingImage: {
    width: 80,
    height: '100%',
    resizeMode: 'cover',
  },
  continueReadingInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  continueReadingCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  continueReadingMeta: {
    marginBottom: 8,
  },
  continueReadingMetaText: {
    fontSize: 12,
    color: '#BBB',
  },
  continueReadingProgress: {
    marginTop: 4,
  },
  continueReadingProgressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginBottom: 6,
    overflow: 'hidden',
  },
  continueReadingProgressFill: {
    height: '100%',
    backgroundColor: '#4BDFC3',
    borderRadius: 2,
  },
  continueReadingProgressText: {
    fontSize: 12,
    color: '#CCC',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  storyCard: {
    width: '48%',
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(30,30,30,0.6)',
  },
  storyImage: {
    width: '100%',
    height: '63%',
    resizeMode: 'cover',
  },
  storyTitleBackground: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  storyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    lineHeight: 16,
    marginBottom: 4,
  },
  storyMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  metricText: {
    fontSize: 11,
    color: '#BBB',
    marginLeft: 2,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#666',
  },
  statusText: {
    fontSize: 9,
    color: '#000',
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 100,
  },
  // Discover New Stories styles
  discoverContainer: {
    height: 180,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  discoverBackground: {
    width: '100%',
    height: '100%',
  },
  discoverGradient: {
    width: '100%',
    height: '100%',
  },
  discoverContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  discoverTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  discoverSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  discoverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  discoverButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  
  // Explore New Worlds button styles
  exploreWorldsButton: {
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  exploreGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  exploreButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // ... existing styles ...
});
