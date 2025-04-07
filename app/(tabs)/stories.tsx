import React, { useState, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageSourcePropType, Modal, Platform, StatusBar, FlatList, Dimensions, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

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
  progress?: number; // Chapter progress (0-100%)
  lastReadChapter?: number; // Last chapter read
  narrativeStage?: 'beginning' | 'middle' | 'end'; // Story progression marker
}

// Full-screen story card component for TikTok-like scrolling
const StoryCard = ({ story, index }: { story: Story, index: number }) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showChapterNav, setShowChapterNav] = useState(false);
  
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
  
  // Generate sample chapters
  const generateChapters = () => {
    const chaptersArray = [];
    for (let i = 1; i <= story.chapters; i++) {
      chaptersArray.push(`Chapter ${i}`);
    }
    return chaptersArray;
  };
  
  // Render narrative stage badge
  const renderNarrativeStage = () => {
    if (!story.narrativeStage) return null;
    
    let color;
    switch(story.narrativeStage) {
      case 'beginning':
        color = '#4285F4'; // Blue
        break;
      case 'middle':
        color = '#FBBC05'; // Yellow
        break;
      case 'end':
        color = '#EA4335'; // Red
        break;
      default:
        color = '#4285F4';
    }
    
    return (
      <View style={[styles.narrativeStageBadge, { backgroundColor: color }]}>
        <Text style={styles.narrativeStageText}>{story.narrativeStage.toUpperCase()}</Text>
      </View>
    );
  };
  
  // Add function to open full reader
  const openFullReader = () => {
    router.push({
      pathname: '/story-reader',
      params: {
        id: story.id,
        platform: story.platform || 'Sekai',
        chapter: story.lastReadChapter || 1
      }
    });
  };
  
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
            {renderNarrativeStage()}
          </View>
          
          <View style={styles.storyScrollContent}>
            <Text style={styles.storyFullTitle}>{story.title}</Text>
            <Text style={styles.storyFullAuthor}>by {story.author || 'Anonymous'}</Text>
            
            {/* Progress indicator */}
            {story.progress !== undefined && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: story.progress ? `${story.progress}%` : '0%' }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {story.progress}% · {story.lastReadChapter ? `Ch ${story.lastReadChapter}/${story.chapters}` : `0/${story.chapters}`}
                </Text>
              </View>
            )}
            
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
              <View style={styles.storyMetaRow}>
                <Text style={styles.storyMetaBadge}>
                  {story.completed ? 'COMPLETED' : 'ONGOING'} • CH {story.chapters}
                </Text>
                
                {/* Chapter navigation button */}
                <TouchableOpacity 
                  style={styles.chapterNavButton}
                  onPress={() => setShowChapterNav(!showChapterNav)}
                >
                  <Text style={styles.chapterNavButtonText}>Chapters</Text>
                  <Ionicons name="list" size={16} color="white" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              </View>
              <Text style={styles.storyMetaStats}>
                {story.wordCount ? `${(story.wordCount / 1000).toFixed(1)}K words` : '2.5K words'} • {story.views ? `${(story.views / 1000).toFixed(1)}K views` : '4.5K views'}
              </Text>
              
              {/* Add full reader button */}
              <TouchableOpacity 
                style={styles.fullReaderButton}
                onPress={openFullReader}
              >
                <Text style={styles.fullReaderButtonText}>Open Full Reader</Text>
                <Ionicons name="book-outline" size={16} color="white" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
            
            {/* Chapter navigation modal */}
            <Modal
              visible={showChapterNav}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setShowChapterNav(false)}
            >
              <TouchableOpacity 
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowChapterNav(false)}
              >
                <View style={styles.chapterNavModal}>
                  <View style={styles.chapterNavHeader}>
                    <Text style={styles.chapterNavTitle}>Chapters</Text>
                    <TouchableOpacity onPress={() => setShowChapterNav(false)}>
                      <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                  
                  <FlatList
                    data={generateChapters()}
                    keyExtractor={(item, index) => `chapter-${index}`}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity 
                        style={[
                          styles.chapterItem, 
                          story.lastReadChapter === index + 1 && styles.currentChapterItem
                        ]}
                      >
                        <Text style={styles.chapterItemText}>{item}</Text>
                        {story.lastReadChapter === index + 1 && (
                          <View style={styles.currentChapterIndicator}>
                            <Text style={styles.currentChapterText}>CURRENT</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.chapterList}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('for-you');
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  
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
      views: 18432,
      progress: 75,
      lastReadChapter: 11,
      narrativeStage: 'middle'
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
      views: 13659,
      progress: 100,
      lastReadChapter: 12,
      narrativeStage: 'end'
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
      views: 29475,
      progress: 25,
      lastReadChapter: 6,
      narrativeStage: 'beginning'
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
      views: 45230,
      progress: 40,
      lastReadChapter: 6,
      narrativeStage: 'middle'
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
      views: 3240,
      progress: 85,
      lastReadChapter: 6,
      narrativeStage: 'end'
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
      views: 6750,
      progress: 12,
      lastReadChapter: 1,
      narrativeStage: 'beginning'
    },
  ];
  
  // Get stories user is currently reading
  const continueReadingStories = allStories.filter(story => 
    story.progress !== undefined && story.progress > 0 && story.progress < 100
  );
  
  // Filter stories based on active tab
  const getStoriesForTab = () => {
    switch (activeTab) {
      case 'for-you':
        return allStories;
      case 'following':
        return allStories.filter(story => story.platform === 'Sekai' || story.platform === 'Wattpad');
      case 'trending':
        return allStories.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case 'continue':
        return continueReadingStories;  
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

  // Add function to navigate to reader from continue reading card
  const openReaderFromContinue = (story: Story) => {
    router.push({
      pathname: '/story-reader',
      params: {
        id: story.id,
        platform: story.platform || 'Sekai',
        chapter: story.lastReadChapter || 1
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Tab Selector with proper safe area handling */}
      <Animated.View 
        style={[
          styles.tabSelector, 
          { 
            opacity: headerOpacity,
            paddingTop: insets.top + 20, // Increased from 10 to 20 for more top spacing
          }
        ]}
      >
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
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'continue' && styles.activeTabButton]} 
          onPress={() => setActiveTab('continue')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'continue' && styles.activeTabText]}>Continue</Text>
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
      
      {/* Add platform filter button */}
      <TouchableOpacity style={styles.platformFilterButton}>
        <Ionicons name="filter" size={24} color="white" />
      </TouchableOpacity>
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
    top: 0, // Set to 0 and use insets.top in the component
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingTop: 24, // Add more padding to the top to move the tabs down
    backgroundColor: 'rgba(0,0,0,0.7)', // Made slightly darker for better visibility
  },
  tabButton: {
    paddingHorizontal: 15, // Reduced to fit 4 tabs
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
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
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
  platformIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginRight: 10,
  },
  platformText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  narrativeStageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  narrativeStageText: {
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
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4285F4', // Google blue
  },
  progressText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
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
  storyMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyMetaBadge: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  storyMetaStats: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  chapterNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  chapterNavButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  chapterNavModal: {
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 30,
    maxHeight: height * 0.7,
  },
  chapterNavHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  chapterNavTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  chapterList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  chapterItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentChapterItem: {
    backgroundColor: 'rgba(66,133,244,0.1)', // Light blue background
  },
  chapterItemText: {
    color: 'white',
    fontSize: 16,
  },
  currentChapterIndicator: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  currentChapterText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  fullReaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  fullReaderButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  platformFilterButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
}); 