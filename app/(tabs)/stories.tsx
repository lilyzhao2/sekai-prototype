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
  // Full story - Updated Content & Platform
  {
    id: '2',
    title: 'The Last Guardian',
    image: { uri: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1170&auto=format&fit=crop' },
    chapters: 15,
    platform: 'Sekai Originals', // Changed platform
    author: 'MysticWriter',
    genre: ['Fantasy', 'Adventure'],
    completed: false,
    wordCount: 45000,
    views: 34000,
    likes: 3800,
    contentType: 'story',
    content: [
      "The air hummed, thick with an ancient energy Thorne hadn\'t felt since the Sundering. Before him, the Whispering Woods pulsed, not with the gentle life he remembered, but with a low, resonant thrum that vibrated deep within his bones.",
      "",
      "He gripped the hilt of Lumina, its familiar cool metal a stark contrast to the unnatural warmth radiating from the treeline. Elara was right, this place felt wrong, corrupted. But the faint, desperate plea he'd heard on the wind couldn't be ignored. Someone, or something, within these twisted boughs needed the last Guardian.",
      "",
      "Taking a deep breath that tasted of ozone and damp earth, Thorne stepped beneath the canopy, plunging himself into the encroaching shadows."
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
  // Full story - Updated Content & Platform
  {
    id: '5',
    title: 'The Dragon\'s Chosen',
    image: { uri: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=980&auto=format&fit=crop' },
    chapters: 24,
    platform: 'AO3', // Changed platform
    author: 'DragonTales',
    genre: ['Fantasy', 'Romance'],
    completed: true,
    wordCount: 67000,
    views: 64000,
    likes: 12000,
    contentType: 'story',
    content: [
      "The summons came not as a royal decree, but as a searing pain behind Elara's eyes, a resonance that hummed in time with the frantic beat of her own heart. It was the dragon, Vyrenth, stirring from his centuries-long slumber beneath the smoking peaks of Mount Cinder.",
      "",
      "She wasn't supposed to be the Chosen. The prophecies spoke of a warrior, a king, someone worthy of wielding the ancient power. Elara was just a village healer, more comfortable with poultices and tinctures than politics or power.",
      "",
      "Yet, the burning sigil now etched onto her palm disagreed. It pulsed with warmth, a silent command pulling her towards the mountain, towards a destiny she never asked for and wasn't sure she could survive."
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
   // Add another story for variety
  {
    id: '7',
    title: 'Neon & Chrome Heart',
    image: { uri: 'https://images.unsplash.com/photo-1519677584237-752f813512e6?q=80&w=1170&auto=format&fit=crop' },
    chapters: 30,
    platform: 'Wattpad', // Added platform
    author: 'CyberBard',
    genre: ['Sci-Fi', 'Romance', 'Cyberpunk'],
    completed: false,
    wordCount: 88000,
    views: 95000,
    likes: 15000,
    contentType: 'story',
    content: [
      "Rain slicked the chrome canyons of Neo-Veridia, reflecting the relentless neon glow that painted the perpetual night. Kai adjusted the collar of his worn synth-leather jacket, the static buzz of the city a familiar symphony against the pounding bass leaking from the club downstairs.",
      "",
      "He wasn't here for the music. He was hunting ghosts – digital echoes of a stolen past embedded in the network's deepest layers. His target tonight: a data broker known only as 'Silas', rumored to hold the key to unlocking the fragmented memories haunting Kai's cybernetic mind.",
      "",
      "The club's entrance hissed open, spilling out a wave of recycled air and dissonant beats. Time to dance with the devil in the pale moonlight... or rather, the flickering LED glow."
    ],
    narrativeStage: 'beginning',
    progress: 10,
    lastReadChapter: 3
  }
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

  // Helper to format numbers (e.g., 34000 -> 34.0K)
  const formatCount = (count?: number): string => {
    if (count === undefined || count === null) return '0';
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View style={styles.storyFullCard}>
      <Image source={item.image} style={styles.storyBackgroundImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        locations={[0.5, 1]}
        style={styles.storyGradient}
      />
      <SafeAreaView style={styles.storyContentContainer}>
        {/* Main Text Block */} 
        <View style={styles.bottomOverlay}>
          <Text style={styles.overlayPlatform}>
            {item.platform?.toUpperCase()} • {item.completed ? 'COMPLETED' : 'ONGOING'} • CH {item.chapters}
          </Text>
          <Text style={styles.overlayTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
          <Text style={styles.overlayAuthor}>
            by {item.author}
          </Text>
          {/* Paragraph Preview */} 
          {paragraphPreview !== "" && (
            <Text style={styles.overlayHookText} numberOfLines={4} ellipsizeMode="tail"> 
              {paragraphPreview}
            </Text>
          )}
          {/* Source Info - Moved here */} 
           <View style={styles.sourceInfoContainer}>
               {item.platform && <Text style={styles.platformSourceText}>From {item.platform}</Text>}
               {item.wordCount && <Text style={styles.wordCountText}>{formatCount(item.wordCount)} words</Text>}
               {item.views !== undefined && <Text style={styles.viewCountText}>• {formatCount(item.views)} views</Text>}
           </View>

          {/* Reading Progress (Optional display) - Kept for now */}
          {item.progress !== undefined && item.progress > 0 && ( 
            <View style={styles.inlineProgressContainer}>
              <View style={styles.inlineProgressBar}>
                <View style={[styles.inlineProgressFill, { width: `${item.progress}%` }]} />
              </View>
              <Text style={styles.inlineProgressText}>{item.progress}% Read</Text>
            </View>
          )}
          {/* Main Action Button - Restore */}
          <TouchableOpacity style={styles.overlayActionButton} onPress={onNavigate}>
             <Ionicons name="book-outline" size={16} color="white" style={{ marginRight: 6 }} />
            <Text style={styles.overlayActionButtonText}>
                {item.progress !== undefined && item.progress > 0 ? 'Continue Reading' : 'Start Reading'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- Bottom Action Bar (Icons Only) --- */} 
        <View style={styles.bottomActionBar}>
            {/* Info Section Removed */}
            <View style={styles.bottomActionBarIcons}>
                <TouchableOpacity style={styles.actionBarButton}>
                    <Ionicons name="heart-outline" size={26} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBarButton}>
                    <Ionicons name="bookmark-outline" size={26} color="white" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.actionBarButton}>
                    <Ionicons name="share-social-outline" size={26} color="white" />
                </TouchableOpacity>
            </View>
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
    height: height,
    position: 'relative',
    backgroundColor: '#050505',
    justifyContent: 'flex-end', // Align SafeAreaView to bottom
  },
  storyGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, 
    height: height * 0.6, // Extend gradient higher
    zIndex: 1,
  },
  storyBackgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.85,
  },
  // RE-ADD and MODIFY storyContentContainer (SafeAreaView)
  storyContentContainer: { // SafeAreaView
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15, 
    // Use SafeAreaView's inherent bottom padding, no extra needed here usually
    zIndex: 2, 
  },
  bottomOverlay: { 
    // Add margin to clear the absolutely positioned bottomActionBar
    marginBottom: 55, // Adjust as needed based on action bar height + gap
    // paddingBottom: 10, // Minimal padding at the bottom of the text block - REMOVED or keep small if needed
  },
  overlayPlatform: {
      color: '#DDD',
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 6, // Increased margin
      textTransform: 'uppercase',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
  },
  overlayTitle: {
    fontSize: 22, // Slightly larger title
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6, 
    lineHeight: 26, 
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  overlayAuthor: {
    fontSize: 14, // Slightly larger
    color: '#EEE',
    marginBottom: 12, // Increased margin
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 18,
  },
  overlayHookText: {
      fontSize: 14,
      color: '#E5E5E5',
      marginTop: 8, // Space above preview
      marginBottom: 12, // Space below preview
      lineHeight: 20, 
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
  },
  // New container for source info line
  sourceInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      marginBottom: 10, 
  },
  platformSourceText: {
      color: '#BBB',
      fontSize: 12,
      marginRight: 10,
  },
  wordCountText: {
      color: '#BBB',
      fontSize: 12,
  },
  viewCountText: {
      color: '#BBB',
      fontSize: 12,
      marginLeft: 4, // Add space before views
  },
  inlineProgressContainer: { 
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      marginTop: -5, // Adjust if needed relative to sourceInfoContainer
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
  // Styles for bottomActionBar (Icons only)
  bottomActionBar: {
      position: 'absolute', 
      // Position relative to the bottom of storyContentContainer (SafeAreaView)
      bottom: 10, // Small gap from bottom edge of safe area
      left: 15, // Corresponds to storyContentContainer paddingHorizontal
      right: 15, // Corresponds to storyContentContainer paddingHorizontal
      flexDirection: 'row',
      justifyContent: 'flex-end', // Align icons to the right
      alignItems: 'center',
      paddingVertical: 5,
      zIndex: 3, // Ensure it's visually on top if needed
  },
  bottomActionBarIcons: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  actionBarButton: {
      paddingHorizontal: 10,
      paddingVertical: 5, // Add vertical touch area
  },
  // Add back overlayActionButton styles
  overlayActionButton: {
      flexDirection: 'row',
      backgroundColor: 'rgba(75, 223, 195, 0.8)', // Use accent color
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: 10, // Space above the button
      alignSelf: 'flex-start', 
      alignItems: 'center',
  },
  overlayActionButtonText: {
      color: '#000', // Dark text on accent bg
      fontSize: 14, 
      fontWeight: 'bold',
  },
  // ... rest of styles ...
}); 