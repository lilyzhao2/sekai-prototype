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
  const navigateToContent = () => {
    if (item.contentType === 'roleplay') {
      router.push({
        pathname: '/for-you',
        params: { id: item.id }
      });
    } else if (item.contentType === 'story') {
      router.push({
        pathname: '/story-reader',
        params: {
          id: item.id,
          platform: item.platform,
          chapter: item.lastReadChapter || 1
        }
      });
    } else if (item.contentType === 'sekai') {
      router.push({
        pathname: '/create',
        params: { id: item.id }
      });
    }
  };

  // Render based on content type
  if (item.contentType === 'roleplay') {
    return <RoleplayCard item={item} index={index} onNavigate={navigateToContent} />;
  } else if (item.contentType === 'story') {
    return <FullStoryCard item={item} index={index} onNavigate={navigateToContent} />;
  } else if (item.contentType === 'sekai') {
    return <SekaiCard item={item} index={index} onNavigate={navigateToContent} />;
  }
  
  return null;
};

// Roleplay card component
const RoleplayCard = ({ item, index, onNavigate }: { item: Story, index: number, onNavigate: () => void }) => {
  return (
    <View style={[styles.storyFullCard, { backgroundColor: index % 2 === 0 ? '#121212' : '#0D0D0D' }]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.9)']}
        locations={[0, 0.4, 1]}
        style={styles.storyGradient}
      >
        <Image source={item.image} style={styles.storyBackgroundImage} />
        
        <SafeAreaView style={styles.storyContentContainer}>
          <View style={styles.storyHeader}>
            <View style={styles.platformIndicator}>
              <Text style={styles.platformText}>{item.platform}</Text>
            </View>
          </View>
          
          <View style={styles.storyScrollContent}>
            <Text style={styles.storyFullTitle}>{item.title}</Text>
            <Text style={styles.storyFullAuthor}>by {item.author}</Text>
            
            {/* Dialogue content */}
            <View style={styles.dialogueContainer}>
              {item.dialogue?.map((entry, i) => (
                <View key={i} style={styles.dialogueEntry}>
                  <Image source={{ uri: entry.image }} style={styles.dialogueAvatar} />
                  <View style={styles.dialogueBubble}>
                    <Text style={styles.dialogueName}>{entry.character}</Text>
                    <Text style={styles.dialogueText}>{entry.message}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.storyMeta}>
            <View style={styles.storyMetaInfo}>
              <View style={styles.storyMetaRow}>
                <Text style={styles.storyMetaBadge}>
                  ROLEPLAY
                </Text>
              </View>
              <Text style={styles.storyMetaStats}>
                {item.views ? `${(item.views / 1000).toFixed(1)}K views` : '4.5K views'} • {item.likes ? `${(item.likes / 1000).toFixed(1)}K likes` : '2.3K likes'}
              </Text>
              
              <TouchableOpacity 
                style={styles.fullReaderButton}
                onPress={onNavigate}
              >
                <Text style={styles.fullReaderButtonText}>Continue Roleplay</Text>
                <Ionicons name="chatbubbles-outline" size={16} color="white" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

// Full story card component
const FullStoryCard = ({ item, index, onNavigate }: { item: Story, index: number, onNavigate: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayContent = isExpanded ? item.content : item.content?.slice(0, 3);
  
  return (
    <View style={[styles.storyFullCard, { backgroundColor: index % 2 === 0 ? '#121212' : '#0D0D0D' }]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.9)']}
        locations={[0, 0.4, 1]}
        style={styles.storyGradient}
      >
        <Image source={item.image} style={styles.storyBackgroundImage} />
        
        <SafeAreaView style={styles.storyContentContainer}>
          <View style={styles.storyHeader}>
            <View style={styles.platformIndicator}>
              <Text style={styles.platformText}>{item.platform}</Text>
            </View>
            {item.narrativeStage && (
              <View style={[
                styles.narrativeStageBadge, 
                { 
                  backgroundColor: 
                    item.narrativeStage === 'beginning' ? '#4285F4' : 
                    item.narrativeStage === 'middle' ? '#FBBC05' : '#EA4335' 
                }
              ]}>
                <Text style={styles.narrativeStageText}>{item.narrativeStage.toUpperCase()}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.storyScrollContent}>
            <Text style={styles.storyFullTitle}>{item.title}</Text>
            <Text style={styles.storyFullAuthor}>by {item.author}</Text>
            
            {/* Progress indicator */}
            {item.progress !== undefined && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: item.progress ? `${item.progress}%` : '0%' }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {item.progress}% · {item.lastReadChapter ? `Ch ${item.lastReadChapter}/${item.chapters}` : `0/${item.chapters}`}
                </Text>
              </View>
            )}
            
            <View style={styles.storyTextContent}>
              {displayContent?.map((paragraph, i) => {
                if (paragraph === "") {
                  return <View key={i} style={styles.paragraphSpacer} />;
                }
                return <Text key={i} style={styles.storyFullParagraph}>{paragraph}</Text>;
              })}
              
              {!isExpanded && item.content && item.content.length > 3 && (
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
                  {item.completed ? 'COMPLETED' : 'ONGOING'} • CH {item.chapters}
                </Text>
              </View>
              <Text style={styles.storyMetaStats}>
                {item.wordCount ? `${(item.wordCount / 1000).toFixed(1)}K words` : '2.5K words'} • {item.views ? `${(item.views / 1000).toFixed(1)}K views` : '4.5K views'}
              </Text>
              
              <TouchableOpacity 
                style={styles.fullReaderButton}
                onPress={onNavigate}
              >
                <Text style={styles.fullReaderButtonText}>Open Full Reader</Text>
                <Ionicons name="book-outline" size={16} color="white" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

// Sekai world card component
const SekaiCard = ({ item, index, onNavigate }: { item: Story, index: number, onNavigate: () => void }) => {
  return (
    <View style={[styles.storyFullCard, { backgroundColor: index % 2 === 0 ? '#121212' : '#0D0D0D' }]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.9)']}
        locations={[0, 0.4, 1]}
        style={styles.storyGradient}
      >
        <Image source={item.image} style={styles.storyBackgroundImage} />
        
        <SafeAreaView style={styles.storyContentContainer}>
          <View style={styles.storyHeader}>
            <View style={[styles.platformIndicator, {backgroundColor: 'rgba(75, 223, 195, 0.3)'}]}>
              <Text style={[styles.platformText, {color: '#4BDFC3'}]}>
                {item.platform}
              </Text>
            </View>
          </View>
          
          <View style={styles.storyScrollContent}>
            <Text style={styles.storyFullTitle}>{item.title}</Text>
            <Text style={styles.storyFullAuthor}>by {item.author}</Text>
            
            <View style={styles.sekaiStatsContainer}>
              <View style={styles.sekaiStat}>
                <Ionicons name="people-outline" size={20} color="#4BDFC3" />
                <Text style={styles.sekaiStatValue}>{item.charactersCount}</Text>
                <Text style={styles.sekaiStatLabel}>Characters</Text>
              </View>
              <View style={styles.sekaiStat}>
                <Ionicons name="git-branch-outline" size={20} color="#4BDFC3" />
                <Text style={styles.sekaiStatValue}>{item.storylinesCount}</Text>
                <Text style={styles.sekaiStatLabel}>Storylines</Text>
              </View>
              <View style={styles.sekaiStat}>
                <Ionicons name="heart-outline" size={20} color="#4BDFC3" />
                <Text style={styles.sekaiStatValue}>{(item.likes! / 1000).toFixed(1)}K</Text>
                <Text style={styles.sekaiStatLabel}>Likes</Text>
              </View>
            </View>
            
            <View style={styles.sekaiDescriptionContainer}>
              <Text style={styles.sekaiDescription}>{item.worldDescription}</Text>
            </View>
          </View>
          
          <View style={styles.storyMeta}>
            <View style={styles.storyMetaInfo}>
              <View style={styles.storyMetaRow}>
                <Text style={styles.storyMetaBadge}>
                  WORLD
                </Text>
              </View>
              <Text style={styles.storyMetaStats}>
                {item.views ? `${(item.views / 1000).toFixed(1)}K views` : '5K views'} • {item.genre?.join(' • ')}
              </Text>
              
              <TouchableOpacity 
                style={[styles.fullReaderButton, {backgroundColor: 'rgba(75, 223, 195, 0.3)'}]}
                onPress={onNavigate}
              >
                <Text style={[styles.fullReaderButtonText, {color: '#4BDFC3'}]}>Explore World</Text>
                <Ionicons name="planet-outline" size={16} color="#4BDFC3" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default function StoriesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('for-you');
  const viewRef = useRef(null);
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Stories</Text>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => router.push({
              pathname: '/',
              params: { search: 'true' }
            })}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Main content */}
        <FlatList
          data={stories}
          renderItem={({ item, index }) => (
            <StoryCard item={item} index={index} />
          )}
          keyExtractor={item => item.id}
          snapToInterval={height}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50
          }}
          contentContainerStyle={styles.listContainer}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
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
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  storyFullCard: {
    width: width,
    height: height,
    position: 'relative',
  },
  storyGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  storyBackgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.7,
  },
  storyContentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    zIndex: 2,
    width: '100%',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  platformIndicator: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  platformText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  narrativeStageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  narrativeStageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  storyScrollContent: {
    flex: 1,
    paddingBottom: 10,
    width: '100%',
  },
  storyFullTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  storyFullAuthor: {
    fontSize: 16,
    color: '#CCC',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  progressContainer: {
    marginBottom: 20,
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginBottom: 6,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4BDFC3',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#CCC',
  },
  storyTextContent: {
    marginTop: 10,
    width: '100%',
  },
  storyFullParagraph: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    marginBottom: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  paragraphSpacer: {
    height: 14,
  },
  expandButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
  },
  expandButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  storyMeta: {
    marginTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    width: '100%',
  },
  storyMetaInfo: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 14,
    width: '100%',
  },
  storyMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storyMetaBadge: {
    color: '#CCC',
    fontSize: 14,
    fontWeight: '600',
  },
  storyMetaStats: {
    color: '#999',
    fontSize: 14,
    marginBottom: 14,
  },
  fullReaderButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  fullReaderButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  // Dialogue styles for roleplay
  dialogueContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  dialogueEntry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    width: '100%',
  },
  dialogueAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  dialogueBubble: {
    backgroundColor: 'rgba(40,40,40,0.8)',
    borderRadius: 16,
    padding: 12,
    flex: 1,
    maxWidth: '85%',
  },
  dialogueName: {
    color: '#4BDFC3',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dialogueText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
  // Sekai world styles
  sekaiStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  sekaiStat: {
    alignItems: 'center',
  },
  sekaiStatValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  sekaiStatLabel: {
    color: '#999',
    fontSize: 12,
  },
  sekaiDescriptionContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    width: '100%',
  },
  sekaiDescription: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
}); 