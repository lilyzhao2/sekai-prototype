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

// Bottom component - Modified to link to Wiki
const GoToWikiButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.bottomActionButton}
      onPress={() => router.push({pathname: '/(tabs)/wiki'})}
    >
      <LinearGradient colors={['#4BDFC3', '#9EEAEE']} style={styles.bottomActionGradient}>
        <Ionicons name="library-outline" size={20} color="#000" />
        <Text style={styles.bottomActionButtonText}>Wiki</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const ExploreWorldsButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.bottomActionButton}
      onPress={() => router.push({pathname: '/(tabs)/explore'})}
    >
      <LinearGradient colors={['#888', '#BBB']} style={styles.bottomActionGradient}> 
        <Ionicons name="planet-outline" size={20} color="#000" />
        <Text style={styles.bottomActionButtonText}>Explore</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const InteractButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.bottomActionButton}
      onPress={() => router.push({pathname: '/(tabs)/for-you'})}
    >
      <LinearGradient colors={['#f16522', '#f58549']} style={styles.bottomActionGradient}>
        <Ionicons name="chatbubbles-outline" size={20} color="#FFF" /> 
        <Text style={[styles.bottomActionButtonText, { color: '#FFF' }]}>Interact</Text>
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

  // Sample data for top interactions (NEW)
  const topInteractions: Story[] = [
    {
      id: '40',
      title: 'Roleplay: Midnight Heist',
      image: { uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1170&auto=format&fit=crop' }, // Placeholder image
      platform: 'Sekai',
      genre: 'Roleplay',
      rating: 4.6,
      completionStatus: 'Ongoing' // Maybe track sessions?
    },
    {
      id: '41',
      title: 'Choose Your Adventure: Space Pirate',
      image: { uri: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1171&auto=format&fit=crop' }, // Placeholder image
      platform: 'Sekai',
      genre: 'Interactive',
      rating: 4.8,
      completionStatus: 'Ongoing'
    },
    {
      id: '42',
      title: 'Collaborative Story: The Lost City',
      image: { uri: 'https://images.unsplash.com/photo-1527489377706-5ae97e67f65d?q=80&w=1170&auto=format&fit=crop' }, // Placeholder image
      platform: 'Sekai',
      genre: 'Collaboration',
      rating: 4.5,
      completionStatus: 'Completed'
    }
  ];

  // Open the story reader
  const openStoryReader = (story: Story) => {
    router.push({
      pathname: '/story-reader',
      params: {
        id: story.id,
        platform: story.platform || 'Sekai',
        title: story.title,
      }
    });
  };

  // Story card component - Enhanced to show progress if available
  const StoryCard: React.FC<StoryCardProps> = ({ story, onPress, showMetrics = false }) => (
    <TouchableOpacity style={styles.storyCard} onPress={onPress}>
      <Image source={story.image} style={styles.storyImage} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.storyTitleGradient}>
        <Text style={styles.storyTitleText} numberOfLines={2}>{story.title}</Text>
        {showMetrics && (
          <View style={styles.storyMetrics}>
            {/* Show Progress if available (Continue Viewing section uses this) */}
            {story.progress !== undefined && story.lastReadChapter !== undefined && story.chapters !== undefined && (
              <View style={styles.progressMetricItem}>
                 <View style={styles.continueReadingProgressBarSmall}> 
                   <View style={[styles.continueReadingProgressFillSmall, { width: `${story.progress}%` }]} />
                 </View>
                 <Text style={styles.progressMetricText}>
                   {story.progress}% · Ch {story.lastReadChapter}/{story.chapters}
                 </Text>
              </View>
            )}
            {/* Show Word Count/Rating if progress is not available */}
            {story.progress === undefined && (
              <>
                <View style={styles.metricItem}>
                  <Ionicons name="book-outline" size={12} color="#BBB" />
                  <Text style={styles.metricText}>{Math.round(story.wordCount ? story.wordCount / 1000 : 0)}K</Text>
                </View>
                <View style={styles.metricItem}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.metricText}>{story.rating}</Text>
                </View>
              </>
            )}
            {/* Always show completion status badge */}
            {story.completionStatus && (
              <View style={[styles.statusBadgeSmall, 
                story.completionStatus === 'Completed' ? styles.statusBadgeCompleted 
                : story.completionStatus === 'Hiatus' ? styles.statusBadgeHiatus 
                : styles.statusBadgeOngoing ]
              }>
                <Text style={styles.statusTextSmall}>{story.completionStatus}</Text>
              </View>
            )}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sekai</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.contentScrollView} showsVerticalScrollIndicator={false}>
          <DiscoverNewStoriesSection />
          
          {/* Updated Section: Continue Viewing */} 
          {continueReadingStories.length > 0 && (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Continue Viewing</Text> 
                <TouchableOpacity>
                  <Text style={styles.seeAllButton}>See All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
                {continueReadingStories.map((story) => (
                  <StoryCard // Use the enhanced StoryCard
                    key={story.id} 
                    story={story} 
                    onPress={() => openStoryReader(story)} 
                    showMetrics={true} // Ensure metrics (including progress) are shown
                  />
                ))}
              </ScrollView>
            </View>
          )}
          
          {/* Top 10 Stories (Horizontal Scroll) */} 
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Stories</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
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
          
          {/* Top Interactions (Horizontal Scroll) */} 
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Interactions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
              {topInteractions.map((interaction) => (
                <StoryCard 
                  key={interaction.id} 
                  story={interaction} 
                  onPress={() => { /* Define navigation */ }}
                  showMetrics={true}
                />
              ))}
            </ScrollView>
          </View>

          {/* Top 10 Worlds (Horizontal Scroll) */} 
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Worlds</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
              {top10Worlds.map((story) => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onPress={() => { /* Define navigation */ }}
                  showMetrics={true}
                />
              ))}
            </ScrollView>
          </View>
          
          {/* --- New Bottom Actions Container --- */}
          <View style={styles.bottomActionsContainer}>
             <ExploreWorldsButton />
             <InteractButton />
             <GoToWikiButton />
          </View>
          
          <View style={styles.bottomSpacer} />
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
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
  contentScrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  seeAllButton: {
    color: '#4BDFC3',
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalScrollContent: {
    paddingHorizontal: 16,
  },
  storyCard: {
    width: 150,
    height: 220,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  storyTitleGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    paddingTop: 15,
  },
  storyTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
    lineHeight: 17,
    marginBottom: 5,
  },
  storyMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 3,
  },
  metricText: {
    fontSize: 11,
    color: '#BBB',
    marginLeft: 3,
  },
  progressMetricItem: {
    flexDirection: 'column',
    marginRight: 6,
    marginBottom: 3,
  },
  continueReadingProgressBarSmall: {
    height: 4,
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 2,
  },
  continueReadingProgressFillSmall: {
    height: '100%',
    backgroundColor: '#4BDFC3',
    borderRadius: 2,
  },
  progressMetricText: {
    fontSize: 10,
    color: '#CCC',
  },
  statusBadgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 3,
  },
  statusBadgeCompleted: { backgroundColor: '#4BDFC3' },
  statusBadgeOngoing: { backgroundColor: '#666' },
  statusBadgeHiatus: { backgroundColor: '#FFD166' },
  statusTextSmall: {
    fontSize: 9,
    color: '#000',
    fontWeight: 'bold',
  },
  bottomSpacer: { height: 120 },
  discoverContainer: { height: 180, marginHorizontal: 16, marginBottom: 24, borderRadius: 16, overflow: 'hidden' },
  discoverBackground: { width: '100%', height: '100%' },
  discoverGradient: { width: '100%', height: '100%' },
  discoverContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  discoverTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  discoverSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 16, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  discoverButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignSelf: 'flex-start' },
  discoverButtonText: { color: 'white', fontSize: 14, fontWeight: '600', marginRight: 8 },
  bottomActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  bottomActionButton: { 
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden', 
    elevation: 2, 
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2 
  },
  bottomActionGradient: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 10,
    paddingHorizontal: 12 
  },
  bottomActionButtonText: { 
    color: '#000', 
    fontSize: 14,
    fontWeight: 'bold', 
    marginLeft: 6 
  },
});
