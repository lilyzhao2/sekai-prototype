import React, { useState, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageSourcePropType, Modal, Platform, StatusBar, FlatList, Dimensions, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define content types
type ContentType = 'story' | 'roleplay' | 'sekai';

// Define dialogue entry
interface DialogueEntry {
  character: string;
  message: string;
  image: string;
}

// Define types
interface Story {
  id: string;
  title: string;
  image: ImageSourcePropType;
  chapters?: number;
  completed?: boolean;
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
  contentType: ContentType; // Type of content
  dialogue?: DialogueEntry[]; // For roleplay content
  worldDescription?: string; // For sekai content
  charactersCount?: number; // For sekai content
  storylinesCount?: number; // For sekai content
}

// Stories data
const stories: Story[] = [
  // Roleplay stories
  {
    id: '1',
    title: 'Falling For Captain Marvel',
    image: { uri: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=735&auto=format&fit=crop' },
    platform: 'Roleplay',
    author: 'MarvelFan22',
    genre: ['Romance', 'Fanfiction'],
    views: 12500,
    likes: 2300,
    contentType: 'roleplay',
    dialogue: [
      {
        character: 'Captain Marvel',
        message: 'So you\'re the new scientist everyone\'s been talking about?',
        image: 'https://randomuser.me/api/portraits/women/90.jpg'
      },
      {
        character: 'You',
        message: 'I... yes. I\'ve been working on quantum entanglement theories that might help with interstellar travel.',
        image: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      {
        character: 'Captain Marvel',
        message: 'Impressive. Maybe you could explain your work to me over coffee sometime?',
        image: 'https://randomuser.me/api/portraits/women/90.jpg'
      }
    ]
  },
  // Full story
  {
    id: '2',
    title: 'The Last Guardian',
    image: { uri: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1170&auto=format&fit=crop' },
    chapters: 15,
    platform: 'Story',
    author: 'MysticWriter',
    genre: ['Fantasy', 'Adventure'],
    completed: false,
    wordCount: 45000,
    views: 34000,
    likes: 3800,
    contentType: 'story',
    content: [
      "The air was thick with magic as Thorne approached the ancient forest.",
      "",
      "\"We shouldn't be here,\" whispered Elara, clutching her staff tightly. \"This place is forbidden for a reason.\"",
      "",
      "But Thorne had no choice. As the last guardian of the sacred trees, only he could sense the growing darkness that threatened to consume everything."
    ],
    narrativeStage: 'beginning',
    progress: 35,
    lastReadChapter: 5
  },
  // Sekai world
  {
    id: '3',
    title: 'Elysium: Fallen Empire',
    image: { uri: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=1039&auto=format&fit=crop' },
    platform: 'Sekai',
    author: 'CosmicCreator',
    genre: ['Science Fiction', 'Space Opera'],
    contentType: 'sekai',
    worldDescription: 'Once the greatest civilization in the galaxy, the Elysium Empire has fallen. Explore the remnants of this advanced society, where ancient technology meets mystical powers. Create your character and choose your path: rebuild the empire, join the rebellion, or chase treasures among the stars.',
    charactersCount: 24,
    storylinesCount: 7,
    views: 56000,
    likes: 8900
  },
  // Roleplay story
  {
    id: '4',
    title: 'Meeting The Dark Knight',
    image: { uri: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1170&auto=format&fit=crop' },
    platform: 'Roleplay',
    author: 'GothamNights',
    genre: ['Action', 'Fanfiction'],
    views: 18300,
    likes: 3200,
    contentType: 'roleplay',
    dialogue: [
      {
        character: 'Batman',
        message: 'Gotham isn\'t safe tonight. You should be home.',
        image: 'https://randomuser.me/api/portraits/men/40.jpg'
      },
      {
        character: 'You',
        message: 'I was following a lead on the recent disappearances. I think I found something important.',
        image: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      {
        character: 'Batman',
        message: 'Show me. But stay behind me.',
        image: 'https://randomuser.me/api/portraits/men/40.jpg'
      }
    ]
  },
  // Full story
  {
    id: '5',
    title: 'The Dragon\'s Chosen',
    image: { uri: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=980&auto=format&fit=crop' },
    chapters: 24,
    platform: 'Story',
    author: 'DragonTales',
    genre: ['Fantasy', 'Romance'],
    completed: true,
    wordCount: 67000,
    views: 64000,
    likes: 12000,
    contentType: 'story',
    content: [
      "It began with fire, as all great stories do.",
      "",
      "The ancient dragon Vyrenth had slumbered for centuries, waiting for the one soul brave enough—or perhaps foolish enough—to awaken him.",
      "",
      "Elara never intended to be that person. But fate, it seemed, had other plans."
    ],
    narrativeStage: 'middle',
    progress: 75,
    lastReadChapter: 18
  },
  // Sekai world
  {
    id: '6',
    title: 'Modern Mystics',
    image: { uri: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=1039&auto=format&fit=crop' },
    platform: 'Sekai',
    author: 'UrbanMage',
    genre: ['Urban Fantasy', 'Mystery'],
    contentType: 'sekai',
    worldDescription: 'In modern-day cities, magic exists hidden in plain sight. Secret societies of mystics, warlocks, and enchanters live among us, maintaining the delicate balance between the mundane and magical worlds. Create your magical character and discover the hidden powers that flow beneath the surface of our reality.',
    charactersCount: 36,
    storylinesCount: 12,
    views: 42000,
    likes: 7500
  },
];

// Component for story card
const StoryCard = ({ item, index }: { item: Story, index: number }) => {
  const router = useRouter();
  
  // Handle navigation based on content type
  const navigateToStoryReader = () => {
    router.push({
      pathname: '/story-reader',
      params: {
        id: item.id,
        platform: item.platform,
        chapter: item.lastReadChapter || 1
      }
    });
  };

  // Render only FullStoryCard now
  return <FullStoryCard item={item} index={index} onNavigate={navigateToStoryReader} />;
};

// Full story card component
const FullStoryCard = ({ item, index, onNavigate }: { item: Story, index: number, onNavigate: () => void }) => {

  // Function to get the first paragraph preview
  const getParagraphPreview = (content?: string[]): string => {
    if (!content || content.length === 0) {
      return "";
    }
    const firstNonEmptyIndex = content.findIndex(line => line.trim() !== "");
    if (firstNonEmptyIndex === -1) {
      return "";
    }
    
    let preview = content[firstNonEmptyIndex];
    
    // Optionally add the next non-empty line if it exists immediately after
    // const secondNonEmptyIndex = content.findIndex((line, idx) => line.trim() !== "" && idx > firstNonEmptyIndex);
    // if (secondNonEmptyIndex === firstNonEmptyIndex + 1) {
    //    preview += " " + content[secondNonEmptyIndex];
    // }

    // Let's just use the first non-empty line for now to keep it concise
    return preview;
  };

  const paragraphPreview = getParagraphPreview(item.content);

  return (
    <View style={styles.storyFullCard}>
      <Image source={item.image} style={styles.storyBackgroundImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']} // Slightly darker gradient
        locations={[0.55, 1]} // Adjust gradient start
        style={styles.storyGradient}
      />
      <SafeAreaView style={styles.storyContentContainer}>
        {/* Interaction Icons Side Bar */}
        <View style={styles.sideBar}>
           <TouchableOpacity style={styles.sideBarButton}>
            <Ionicons name="heart-outline" size={28} color="white" />
            {/* Moved like count to overlay */}
           </TouchableOpacity>
          <TouchableOpacity style={styles.sideBarButton}>
            <Ionicons name="chatbubble-outline" size={28} color="white" />
            <Text style={styles.sideBarText}>Discuss</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideBarButton}>
            <Ionicons name="share-social-outline" size={28} color="white" />
            {/* <Text style={styles.sideBarText}>Share</Text> // Text optional */}
          </TouchableOpacity>
           <TouchableOpacity style={styles.sideBarButton}>
            <Ionicons name="bookmark-outline" size={28} color="white" />
            {/* <Text style={styles.sideBarText}>Save</Text> // Text optional */}
          </TouchableOpacity>
        </View>

        {/* Bottom Info Overlay - Adjusted for fit */}
        <View style={styles.bottomOverlay}>
          <Text style={styles.overlayPlatform}>
            {item.platform?.toUpperCase()} • {item.completed ? 'COMPLETED' : 'ONGOING'} • CH {item.chapters}
          </Text>
          <Text style={styles.overlayTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
          <Text style={styles.overlayAuthor}>
            by {item.author} • {(item.views || 0) / 1000 >= 1 ? `${((item.views || 0) / 1000).toFixed(1)}K` : item.views} views • {(item.likes || 0) / 1000 >= 1 ? `${((item.likes || 0) / 1000).toFixed(1)}K` : item.likes} likes
          </Text>
          {item.progress !== undefined && item.progress > 0 && ( // Show progress only if started
            <View style={styles.inlineProgressContainer}>
              <View style={styles.inlineProgressBar}>
                <View style={[styles.inlineProgressFill, { width: `${item.progress}%` }]} />
              </View>
              <Text style={styles.inlineProgressText}>{item.progress}% Read</Text>
            </View>
          )}
          {/* Paragraph Preview */}
          {paragraphPreview !== "" && (
            <Text style={styles.overlayHookText} numberOfLines={3} ellipsizeMode="tail">
              {paragraphPreview}
            </Text>
          )}
          {/* TODO: Add Roleplay/Sekai connection display here if data model supports it */}
          <TouchableOpacity style={styles.overlayActionButton} onPress={onNavigate}>
             <Ionicons name="book-outline" size={16} color="white" style={{ marginRight: 6 }} />
            <Text style={styles.overlayActionButtonText}>
                {item.progress !== undefined && item.progress > 0 ? 'Continue Reading' : 'Start Reading'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default function StoriesScreen() {
  const router = useRouter();
  // const [activeTab, setActiveTab] = useState<string>('for-you'); // State seems unused
  const viewRef = useRef(null);

  // Filter stories data to only include 'story' type
  const filteredStories = stories.filter(story => story.contentType === 'story');
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* Header can remain if needed */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover Stories</Text> 
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => router.push({
              pathname: '/', // Assuming search is on the home/root screen
              params: { search: 'true' }
            })}
          >
            <Ionicons name="search" size={22} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Main content */}
        <FlatList
          data={filteredStories} // Use filtered data
          renderItem={({ item, index }) => (
            <StoryCard item={item} index={index} />
          )}
          keyExtractor={item => item.id}
          snapToInterval={height} // Keeps the full-screen snap
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          pagingEnabled // Ensures snapping to full pages
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50 // Keep this for potential future logic
          }}
          contentContainerStyle={styles.listContainer} // Ensure this doesn't add extra padding
          ref={viewRef}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeAreaContainer: {
    flex: 1,
    // Remove potential top padding if header is absolutely positioned or part of the card
  },
  header: {
    position: 'absolute', // Make header overlay on top
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 44, // Adjust top based on OS status bar
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent background
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18, // Slightly smaller header title
    fontWeight: 'bold',
    color: 'white',
     textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  searchButton: {
     padding: 5, // Make touch target slightly larger if needed
  },
  listContainer: {
    // Removed flexGrow: 1 as FlatList takes full height by default when inside a flex:1 container
    width: '100%',
  },
  storyFullCard: {
    width: width,
    height: height, // Ensure full screen height
    position: 'relative',
    backgroundColor: '#050505', // Slightly off-black background
    justifyContent: 'flex-end', // Align content container to bottom
  },
  storyGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, 
    height: height * 0.5, // Gradient covers lower half for better text readability
    zIndex: 1,
  },
  storyBackgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.85, // Slightly reduce image opacity if needed behind text
  },
  storyContentContainer: {
    // Removed flex: 1 and justifyContent, handled by storyFullCard
    position: 'absolute', // Position absolutely within the card
    bottom: Platform.OS === 'ios' ? 50 : 60, // Adjusted bottom padding for nav bar
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 15,
  },
  // Styles for TikTok layout - Adjusted
  sideBar: {
    position: 'absolute',
    right: 5, // Closer to edge
    bottom: 10, // Relative to storyContentContainer bottom padding now
    alignItems: 'center',
    zIndex: 3,
  },
  sideBarButton: {
    alignItems: 'center',
    marginBottom: 20, // Slightly less margin
  },
  sideBarText: {
    color: 'white',
    fontSize: 11, // Smaller text
    fontWeight: '500',
    marginTop: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomOverlay: {
     width: '83%', // Adjusted width to give sidebar space
     paddingBottom: 5, // Add a little padding at the very bottom
  },
  overlayPlatform: {
      color: '#DDD', // Lighter grey
      fontSize: 12, // Smaller font size
      fontWeight: '600', // Slightly bolder
      marginBottom: 4,
      textTransform: 'uppercase',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
  },
  overlayTitle: {
    fontSize: 20, // Slightly smaller title
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5, // Less margin
    lineHeight: 24, // Adjust line height for multi-line titles
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  overlayAuthor: {
    fontSize: 13, // Smaller font size
    color: '#EEE',
    marginBottom: 8, // Less margin
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 18,
  },
  overlayActionButton: {
      flexDirection: 'row', // Icon and text side-by-side
      backgroundColor: 'rgba(255, 255, 255, 0.25)', // Slightly more visible
      paddingVertical: 8, // Smaller button
      paddingHorizontal: 12,
      borderRadius: 6,
      marginTop: 8, // Less margin
      alignSelf: 'flex-start', 
      alignItems: 'center', // Center icon and text
  },
  overlayActionButtonText: {
      color: 'white',
      fontSize: 13, // Smaller text
      fontWeight: '600',
  },
  overlayHookText: {
      fontSize: 13, // Smaller font size
      color: '#E5E5E5', // Slightly brighter
      marginTop: 5, // Less margin
      marginBottom: 10, // Less margin
      lineHeight: 18, // Adjust line height
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
  },
  // Inline progress for FullStoryCard
  inlineProgressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8, // Less margin
      marginTop: 2, // Add a little top margin
      width: '100%',
  },
  inlineProgressBar: {
      height: 2.5, // Thinner bar
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: 1.5,
      flex: 1, 
      marginRight: 6,
  },
  inlineProgressFill: {
      height: '100%',
      backgroundColor: '#4BDFC3', 
      borderRadius: 1.5,
  },
  inlineProgressText: {
      fontSize: 11, // Smaller text
      color: '#DDD',
      fontWeight: '500',
  },

  // REMOVED Sekai related styles: sekaiInlineStats, sekaiInlineStatText
}); 