import React, { useState, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageSourcePropType, Modal, Platform, StatusBar, FlatList, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define types
interface Story {
  id: string;
  title: string;
  image: ImageSourcePropType;
  chapters: number;
  completed: boolean;
  author?: string;
  platform?: string;
  genre?: string[];
  description?: string;
  wordCount?: number;
  likes?: number;
  views?: number;
  content?: string[];
}

// Full-screen story card component for TikTok-like scrolling
const StoryCard = ({ story, index }: { story: Story, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  // Sample content chunks - this would be from the actual story
  const storyContent = story.content || [
    "she was the only one left.",
    "",
    "\"System check,\" she whispered, watching as holographic displays flickered to life around her. The neural interface hummed softly, a constant reminder of the responsibility she carried.",
    "",
    "The message came without warning, text scrolling across her vision:",
    "ALERT: ANOMALY DETECTED IN SECTOR 7",
    "CIVILIAN CASUALTIES IMMINENT",
    "GUARDIAN RESPONSE REQUIRED",
    "",
    "Sarah closed her eyes, feeling the familiar surge of power through her augments. \"Well,\" she murmured, a slight smile playing at her lips, \"at least I won't be bored.\""
  ];
  
  // Show a limited preview if not expanded
  const displayContent = isExpanded ? storyContent : storyContent.slice(0, 4);
  
  return (
    <View style={[styles.storyFullCard, { backgroundColor: index % 2 === 0 ? '#121212' : '#0D0D0D' }]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.9)']}
        locations={[0, 0.4, 1]}
        style={styles.storyGradient}
      >
        <Image source={story.image} style={styles.storyBackgroundImage} />
        
        <SafeAreaView style={styles.storyContentContainer}>
          <View style={styles.storyHeader}>
            <View style={styles.platformIndicator}>
              <Text style={styles.platformText}>{story.platform || 'Sekai'}</Text>
            </View>
          </View>
          
          <View style={styles.storyScrollContent}>
            <Text style={styles.storyFullTitle}>{story.title}</Text>
            <Text style={styles.storyFullAuthor}>by {story.author || 'Anonymous'}</Text>
            
            <View style={styles.storyMetrics}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{story.wordCount ? (story.wordCount / 1000).toFixed(1) : '2.5'}K</Text>
                <Text style={styles.metricLabel}>WORDS</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{story.chapters}</Text>
                <Text style={styles.metricLabel}>CHAPTERS</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{story.views ? (story.views / 1000).toFixed(1) : '4.5'}K</Text>
                <Text style={styles.metricLabel}>VIEWS</Text>
              </View>
            </View>
            
            <View style={styles.storyTextContent}>
              {displayContent.map((paragraph, i) => {
                if (paragraph === "") {
                  return <View key={i} style={styles.paragraphSpacer} />;
                }
                
                // Special formatting for the alert message
                if (paragraph.includes("ALERT:") || paragraph.includes("CIVILIAN") || paragraph.includes("GUARDIAN")) {
                  return <Text key={i} style={styles.alertText}>{paragraph}</Text>;
                }
                
                return <Text key={i} style={styles.storyFullParagraph}>{paragraph}</Text>;
              })}
              
              {!isExpanded && storyContent.length > 4 && (
                <TouchableOpacity 
                  style={styles.expandButton}
                  onPress={() => setIsExpanded(true)}
                >
                  <Text style={styles.expandButtonText}>Read More</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <View style={styles.storyMeta}>
            <View style={styles.storyMetaInfo}>
              <Text style={styles.storyMetaBadge}>
                {story.completed ? 'COMPLETED' : 'ONGOING'}
              </Text>
            </View>
          </View>
        </SafeAreaView>
        
        {/* Side action buttons */}
        <View style={styles.sideActionButtons}>
          <TouchableOpacity 
            style={styles.sideActionButton}
            onPress={() => setLiked(!liked)}
          >
            <Ionicons 
              name={liked ? "heart" : "heart-outline"} 
              size={28} 
              color={liked ? "#FF4060" : "white"} 
            />
            <Text style={styles.sideActionText}>{story.likes ? (liked ? story.likes + 1 : story.likes) : '4.5K'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sideActionButton}
            onPress={() => setBookmarked(!bookmarked)}
          >
            <Ionicons 
              name={bookmarked ? "bookmark" : "bookmark-outline"} 
              size={28} 
              color="white" 
            />
            <Text style={styles.sideActionText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sideActionButton}>
            <Ionicons name="share-social-outline" size={28} color="white" />
            <Text style={styles.sideActionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sideActionButton}>
            <Ionicons name="chatbubble-outline" size={28} color="white" />
            <Text style={styles.sideActionText}>Comments</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default function StoriesScreen() {
  const [activeTab, setActiveTab] = useState('for-you');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Combined stories data
  const allStories: Story[] = [
    {
      id: '3',
      title: 'The Last Guardian',
      image: { uri: 'https://placehold.co/600x800/333333/white?text=Guardian' },
      chapters: 15,
      completed: true,
      author: 'StoryWeaver',
      platform: 'Sekai',
      genre: ['Sci-Fi', 'Action'],
      wordCount: 62500,
      likes: 4532,
      views: 18432
    },
    {
      id: '1',
      title: 'Falling For Captain Marvel\'s Charm',
      image: { uri: 'https://placehold.co/600x800/f16522/white?text=Captain+Marvel' },
      chapters: 12,
      completed: true,
      author: '@MarvelFan',
      platform: 'Wattpad',
      genre: ['Romance', 'Fanfiction'],
      wordCount: 45000,
      likes: 2344,
      views: 13659
    },
    {
      id: '7',
      title: 'The Dragon\'s Chosen',
      image: { uri: 'https://placehold.co/600x800/8a2be2/white?text=Dragon' },
      chapters: 24,
      completed: true,
      platform: 'AO3',
      author: 'DragonMaster',
      genre: ['Fantasy', 'Adventure'],
      wordCount: 124500,
      likes: 7890,
      views: 29475
    },
    {
      id: '4',
      title: 'My Bully Wants Me Forever',
      image: { uri: 'https://placehold.co/600x800/444444/white?text=Bully' },
      chapters: 15,
      completed: true,
      platform: 'Wattpad',
      author: 'RomanceQueen',
      genre: ['Romance', 'Drama'],
      wordCount: 87600,
      likes: 12876,
      views: 45230
    },
    {
      id: '5',
      title: 'Love Hashira Joins The Hot Spring!',
      image: { uri: 'https://placehold.co/600x800/7c9aff/white?text=Hot+Spring' },
      chapters: 7,
      completed: false,
      platform: 'AO3',
      author: 'AnimeFan22',
      genre: ['Anime', 'Romance'],
      wordCount: 18900,
      likes: 756,
      views: 3240
    },
    {
      id: '2',
      title: 'Black Widow saves the tech girl!',
      image: { uri: 'https://placehold.co/600x800/aa0000/white?text=Black+Widow' },
      chapters: 8,
      completed: false,
      platform: 'AO3',
      author: 'WidowLover',
      genre: ['Action', 'Fanfiction'],
      wordCount: 23400,
      likes: 986,
      views: 6750
    },
  ];
  
  // Filter stories based on active tab
  const getStoriesForTab = () => {
    switch (activeTab) {
      case 'for-you':
        return allStories;
      case 'following':
        return allStories.filter(story => story.platform === 'Sekai' || story.platform === 'Wattpad');
      case 'trending':
        return allStories.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      default:
        return allStories;
    }
  };
  
  // Header opacity based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <Animated.View style={[styles.tabSelector, { opacity: headerOpacity }]}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'following' && styles.activeTabButton]} 
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'for-you' && styles.activeTabButton]} 
          onPress={() => setActiveTab('for-you')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'for-you' && styles.activeTabText]}>For You</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'trending' && styles.activeTabButton]} 
          onPress={() => setActiveTab('trending')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'trending' && styles.activeTabText]}>Trending</Text>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Vertical FlatList for stories */}
      <FlatList
        data={getStoriesForTab()}
        renderItem={({ item, index }) => <StoryCard story={item} index={index} />}
        keyExtractor={item => item.id}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabSelector: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabButtonText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '700',
  },
  storyFullCard: {
    width,
    height,
  },
  storyGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  storyBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  storyContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  platformIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  platformText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  storyScrollContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  storyFullTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  storyFullAuthor: {
    fontSize: 16,
    color: 'white',
    marginBottom: 14,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  storyTextContent: {
    maxHeight: height * 0.5,
  },
  storyFullParagraph: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  alertText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    marginBottom: 10,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  paragraphSpacer: {
    height: 10,
  },
  expandButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  expandButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  storyMeta: {
    marginBottom: 20,
  },
  storyMetaInfo: {
    marginBottom: 10,
  },
  storyMetaBadge: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  storyMetrics: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  metricItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  metricValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 14,
  },
  sideActionButtons: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    alignItems: 'center',
  },
  sideActionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sideActionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
}); 