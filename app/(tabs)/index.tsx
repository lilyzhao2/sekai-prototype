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
  progress?: number; // Added for Continue Reading feature
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

export default function HomeScreen() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Sample data for continue reading stories
  const continueReadingStories: Story[] = [
    {
      id: '3',
      title: 'The Last Guardian',
      image: { uri: 'https://placehold.co/600x800/333333/white?text=Guardian' },
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
      image: { uri: 'https://placehold.co/600x800/8a2be2/white?text=Dragon' },
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
      image: { uri: 'https://placehold.co/600x800/444444/white?text=Bully' },
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
        image: { uri: 'https://placehold.co/160x200/f16522/white?text=Captain+Marvel' },
        platform: 'Wattpad',
        genre: 'Romance',
        wordCount: 35000,
        completionStatus: 'Ongoing',
        rating: 4.2
      },
      {
        id: '4',
        title: 'My Bully Wants Me Forever',
        image: { uri: 'https://placehold.co/160x200/444444/white?text=Bully' },
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
        image: { uri: 'https://placehold.co/160x200/8a0000/white?text=Scarlet+Witch' },
        platform: 'Sekai',
        genre: 'Fantasy',
        wordCount: 58000,
        completionStatus: 'Completed',
        rating: 4.5
      },
      {
        id: '7',
        title: 'The Dragon\'s Chosen',
        image: { uri: 'https://placehold.co/160x200/8a2be2/white?text=Dragon' },
        platform: 'AO3',
        genre: 'Fantasy',
        wordCount: 67000,
        completionStatus: 'Completed',
        rating: 4.9
      },
    ],
    'Fanfiction': [
      {
        id: '2',
        title: 'Black Widow saves the tech girl!',
        image: { uri: 'https://placehold.co/160x200/aa0000/white?text=Black+Widow' },
        platform: 'AO3',
        genre: 'Fanfiction',
        wordCount: 42000,
        completionStatus: 'Ongoing',
        rating: 4.3
      },
      {
        id: '8',
        title: 'My Hero Academia Girls Sleepover',
        image: { uri: 'https://placehold.co/160x200/9932cc/white?text=Academia' },
        platform: 'AO3',
        genre: 'Fanfiction',
        wordCount: 18000,
        completionStatus: 'Completed',
        rating: 4.1
      },
    ],
    'Drama': [
      {
        id: '5',
        title: 'Love Hashira Joins The Hot Spring!',
        image: { uri: 'https://placehold.co/160x200/7c9aff/white?text=Hot+Spring' },
        platform: 'AO3',
        genre: 'Drama',
        wordCount: 32000,
        completionStatus: 'Hiatus',
        rating: 4.0
      },
      {
        id: '9',
        title: 'Erza Demands Her Baby',
        image: { uri: 'https://placehold.co/160x200/b22222/white?text=Erza' },
        platform: 'Sekai',
        genre: 'Drama',
        wordCount: 29000,
        completionStatus: 'Ongoing',
        rating: 4.7
      },
    ],
    'Adventure': [
      {
        id: '6',
        title: 'The Military Commander Wants Me',
        image: { uri: 'https://placehold.co/160x200/223322/white?text=Military' },
        platform: 'Sekai',
        genre: 'Adventure',
        wordCount: 48000,
        completionStatus: 'Ongoing',
        rating: 4.4
      },
    ],
  };

  // Get editors' choice stories (top rated from each genre)
  const editorsChoice: Story[] = Object.values(allStoriesByGenre)
    .map(genreStories => 
      genreStories.sort((a, b) => (b.rating || 0) - (a.rating || 0))[0]
    )
    .filter(story => !!story)
    .slice(0, 3);

  // Filter stories by genre
  const getFilteredStories = (): Story[] => {
    if (!selectedGenre) {
      // If no genre is selected, return a mix of stories from all genres
      return Object.values(allStoriesByGenre)
        .flat()
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    }
    return allStoriesByGenre[selectedGenre] || [];
  };

  // Open the story reader
  const openStoryReader = (story: Story) => {
    router.push({
      pathname: '/story-reader',
      params: {
        id: story.id,
        platform: story.platform || 'Sekai',
        chapter: story.lastReadChapter || 1
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

  // Continue reading card component
  const renderContinueReadingItem = ({ item }: { item: Story }) => (
    <TouchableOpacity 
      style={styles.continueReadingCard}
      onPress={() => openStoryReader(item)}
    >
      <Image source={item.image} style={styles.continueReadingImage} />
      <View style={styles.continueReadingInfo}>
        <Text style={styles.continueReadingCardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.continueReadingMeta}>
          <Text style={styles.continueReadingMetaText}>
            {item.genre} • {item.timeToRead}
          </Text>
        </View>
        <View style={styles.continueReadingProgress}>
          <View style={styles.continueReadingProgressBar}>
            <View 
              style={[
                styles.continueReadingProgressFill, 
                { width: item.progress ? `${item.progress}%` : '0%' }
              ]} 
            />
          </View>
          <Text style={styles.continueReadingProgressText}>
            {item.progress}% • Ch {item.lastReadChapter}/{item.chapters}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Genre selector
  const renderGenreSelector = () => (
    <View style={styles.genreSelectorContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreSelector}
      >
        <TouchableOpacity 
          style={[
            styles.genreButton, 
            !selectedGenre && styles.selectedGenreButton
          ]}
          onPress={() => setSelectedGenre(null)}
        >
          <Text style={[
            styles.genreButtonText,
            !selectedGenre && styles.selectedGenreButtonText
          ]}>All</Text>
        </TouchableOpacity>
        
        {GENRES.map(genre => (
          <TouchableOpacity 
            key={genre}
            style={[
              styles.genreButton, 
              selectedGenre === genre && styles.selectedGenreButton
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text style={[
              styles.genreButtonText,
              selectedGenre === genre && styles.selectedGenreButtonText
            ]}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background image for the entire screen */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1000' }}
        style={styles.backgroundImage}
        blurRadius={3}
      />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Featured image banner */}
        <View style={styles.bannerContainer}>
          <ImageBackground 
            source={{ uri: 'https://wallpaperaccess.com/full/1373201.jpg' }}
            style={styles.bannerImage}
            imageStyle={styles.bannerImageStyle}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.bannerGradient}
            >
              <Text style={styles.bannerTitle}>Discover New Stories</Text>
              <Text style={styles.bannerSubtitle}>Explore worlds of adventure and romance</Text>
            </LinearGradient>
          </ImageBackground>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Continue Reading section */}
          {continueReadingStories.length > 0 && (
            <View style={styles.continueReadingSection}>
              <Text style={styles.sectionTitle}>Continue Reading</Text>
              <FlatList
                data={continueReadingStories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `continue-${item.id}`}
                renderItem={renderContinueReadingItem}
                contentContainerStyle={styles.continueReadingList}
              />
            </View>
          )}

          <View style={styles.todaysPicksSection}>
            <Text style={styles.sectionTitle}>Today's Picks For Lily Zhao (LZ)</Text>
            
            {renderGenreSelector()}
            
            <View style={styles.gridContainer}>
              {getFilteredStories().map(story => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onPress={() => openStoryReader(story)}
                  showMetrics={true}
                />
              ))}
            </View>
          </View>

          <Text style={styles.sectionTitle}>Editors' Choice</Text>
          <View style={styles.gridRow}>
            {editorsChoice.map(story => (
              <StoryCard 
                key={story.id} 
                story={story} 
                onPress={() => openStoryReader(story)}
                showMetrics={true}
              />
            ))}
          </View>

          {/* Bottom spacer for the tab bar */}
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
  bannerContainer: {
    height: 200,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bannerImageStyle: {
    borderRadius: 12,
  },
  bannerGradient: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#CCC',
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
    marginTop: 8,
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
  todaysPicksSection: {
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
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
    height: '70%',
    resizeMode: 'cover',
  },
  storyTitleBackground: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
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
  genreSelectorContainer: {
    marginBottom: 16,
  },
  genreSelector: {
    paddingBottom: 8,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedGenreButton: {
    backgroundColor: '#4BDFC3',
  },
  genreButtonText: {
    color: '#CCC',
    fontSize: 14,
  },
  selectedGenreButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 100,
  },
});
