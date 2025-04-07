import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  StatusBar, 
  Dimensions, 
  Platform, 
  TouchableOpacity, 
  Image, 
  ImageBackground, 
  KeyboardAvoidingView,
  ScrollView,
  FlatList
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// Define story character type
interface Character {
  id: string;
  name: string;
  image: string;
}

// Define story type
interface StoryInteraction {
  id: string;
  title: string;
  backgroundImage: string;
  characters: Character[];
  authorName: string;
  authorUsername: string;
  likes: number;
  isSinglePlayer: boolean;
  currentMessage?: {
    character: string;
    content: string;
    isAction: boolean;
  }
}

export default function ForYouScreen() {
  const [message, setMessage] = useState('');
  const [selectedModeFilter, setSelectedModeFilter] = useState<'all' | 'single' | 'multi'>('all');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('all');
  const [showContinueOptions, setShowContinueOptions] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const insets = useSafeAreaInsets();

  // Sample data for stories/roleplay interactions
  const stories: StoryInteraction[] = [
    {
      id: '1',
      title: 'The Kingdom of Enchanted Isles',
      backgroundImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1064&auto=format&fit=crop',
      characters: [
        { id: '1', name: 'Prince Alaric', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=987&auto=format&fit=crop' },
        { id: '2', name: 'Sorceress Elara', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=987&auto=format&fit=crop' },
        { id: '3', name: 'Captain Thorne', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=987&auto=format&fit=crop' },
        { id: '4', name: 'Lady Seraphina', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=961&auto=format&fit=crop' }
      ],
      authorName: 'World Builder',
      authorUsername: '@worldbuilder',
      likes: 425,
      isSinglePlayer: false,
      currentMessage: {
        character: 'Sorceress Elara',
        content: 'The ancient spell is almost complete. With your royal bloodline and my magic, we can seal the rift before the shadow creatures escape.',
        isAction: false
      }
    },
    {
      id: '2',
      title: 'Celestial Academy Universe',
      backgroundImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1022&auto=format&fit=crop',
      characters: [
        { id: '1', name: 'Nova', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=964&auto=format&fit=crop' },
        { id: '2', name: 'Professor Orion', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop' }
      ],
      authorName: 'AstralWriter',
      authorUsername: '@astralwriter',
      likes: 318,
      isSinglePlayer: true,
      currentMessage: {
        character: 'Nova',
        content: 'I never asked for these powers. How am I supposed to control celestial energy when I can barely pass my regular classes?',
        isAction: false
      }
    }
  ];
  
  // Use a subtle parallax effect on the background
  const [backgroundOffset, setBackgroundOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundOffset(prev => (prev < 10 ? prev + 0.1 : 0));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Get the current story based on index
  const currentStory = stories[currentStoryIndex];

  // Filter stories by mode (single player or multiplayer)
  const getFilteredStories = () => {
    if (selectedModeFilter === 'all') return stories;
    return stories.filter(story => 
      (selectedModeFilter === 'single' && story.isSinglePlayer) || 
      (selectedModeFilter === 'multi' && !story.isSinglePlayer)
    );
  };

  // Navigate to the next story
  const goToNextStory = () => {
    const filteredStories = getFilteredStories();
    const nextIndex = (currentStoryIndex + 1) % filteredStories.length;
    setCurrentStoryIndex(nextIndex);
  };

  // Set filter for single/multiplayer
  const setFilter = (filter: 'all' | 'single' | 'multi') => {
    setSelectedModeFilter(filter);
    setCurrentStoryIndex(0); // Reset to first story when changing filters
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Image with Overlay */}
      <ImageBackground 
        source={{ uri: currentStory.backgroundImage }}
        style={[styles.backgroundImage, { top: -backgroundOffset * 5, left: -backgroundOffset }]}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>
      
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.headerContainer}>
          <SafeAreaView edges={['top']}>
            {/* Header with search button moved back */}
            <View style={styles.header}>
              <View style={{flex: 1}}>
                {/* Empty space */}
              </View>
              <TouchableOpacity style={styles.searchButton}>
                <Ionicons name="search" size={22} color="white" />
              </TouchableOpacity>
            </View>

            {/* Mode Filter without search button */}
            <View style={styles.modeFilterContainer}>
              <TouchableOpacity 
                style={[styles.filterButton, selectedModeFilter === 'all' && styles.activeFilterButton]}
                onPress={() => setFilter('all')}
              >
                <Text style={[styles.filterText, selectedModeFilter === 'all' && styles.activeFilterText]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, selectedModeFilter === 'single' && styles.activeFilterButton]}
                onPress={() => setFilter('single')}
              >
                <Text style={[styles.filterText, selectedModeFilter === 'single' && styles.activeFilterText]}>
                  <Ionicons name="person" size={14} color={selectedModeFilter === 'single' ? '#4BDFC3' : '#FFF'} /> Single-player
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, selectedModeFilter === 'multi' && styles.activeFilterButton]}
                onPress={() => setFilter('multi')}
              >
                <Text style={[styles.filterText, selectedModeFilter === 'multi' && styles.activeFilterText]}>
                  <Ionicons name="people" size={14} color={selectedModeFilter === 'multi' ? '#4BDFC3' : '#FFF'} /> Multiplayer
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Genre Filters */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.genreFilterContainer}
              contentContainerStyle={styles.genreFilterContent}
            >
              <TouchableOpacity 
                style={[styles.genreButton, selectedGenreFilter === 'all' && styles.activeGenreButton]}
                onPress={() => setSelectedGenreFilter('all')}
              >
                <Text style={[styles.genreText, selectedGenreFilter === 'all' && styles.activeGenreText]}>All Genres</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genreButton, selectedGenreFilter === 'fantasy' && styles.activeGenreButton]}
                onPress={() => setSelectedGenreFilter('fantasy')}
              >
                <Text style={[styles.genreText, selectedGenreFilter === 'fantasy' && styles.activeGenreText]}>Fantasy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genreButton, selectedGenreFilter === 'scifi' && styles.activeGenreButton]}
                onPress={() => setSelectedGenreFilter('scifi')}
              >
                <Text style={[styles.genreText, selectedGenreFilter === 'scifi' && styles.activeGenreText]}>Sci-Fi</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genreButton, selectedGenreFilter === 'romance' && styles.activeGenreButton]}
                onPress={() => setSelectedGenreFilter('romance')}
              >
                <Text style={[styles.genreText, selectedGenreFilter === 'romance' && styles.activeGenreText]}>Romance</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genreButton, selectedGenreFilter === 'horror' && styles.activeGenreButton]}
                onPress={() => setSelectedGenreFilter('horror')}
              >
                <Text style={[styles.genreText, selectedGenreFilter === 'horror' && styles.activeGenreText]}>Horror</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genreButton, selectedGenreFilter === 'mystery' && styles.activeGenreButton]}
                onPress={() => setSelectedGenreFilter('mystery')}
              >
                <Text style={[styles.genreText, selectedGenreFilter === 'mystery' && styles.activeGenreText]}>Mystery</Text>
              </TouchableOpacity>
            </ScrollView>
            
            {/* Story title and author - moved here */}
            <View style={styles.storyTitleHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.storyTitleText}>{currentStory.title}</Text>
                <View style={styles.titleActions}>
                  <View style={styles.charactersPreview}>
                    <View style={styles.avatarRow}>
                      {currentStory.characters.slice(0, 3).map((character, index) => (
                        <Image 
                          key={character.id} 
                          source={{ uri: character.image }} 
                          style={[styles.avatarCircle, { marginLeft: index > 0 ? -10 : 0 }]} 
                        />
                      ))}
                    </View>
                    <Text style={styles.characterCount}>{currentStory.characters.length}</Text>
                  </View>
                  <TouchableOpacity style={styles.titleActionButton}>
                    <Ionicons name="heart" size={18} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.titleActionButton}>
                    <Ionicons name="share-outline" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.pageContent}
        >
          {/* Main content */}
          <View style={styles.mainContent}>
            {/* AI Summary Section - Smaller */}
            <View style={styles.catchupContainer}>
              <View style={styles.catchupHeader}>
                <Text style={styles.catchupLabel}>
                  <Ionicons name="flash" size={12} color="#4BDFC3" /> AI Summary
                </Text>
              </View>
              <Text style={styles.catchupText}>
                Prince Alaric and Sorceress Elara have been working together to close a magical rift.
              </Text>
            </View>
            
            {/* Timeline of previous conversation - always visible */}
            <View style={styles.timelineContainer}>
              <View style={styles.timelineHeader}>
                <Text style={styles.timelineTitle}>Previous Messages</Text>
              </View>
              
              <ScrollView style={styles.dialogueHistory} contentContainerStyle={{paddingRight: 8}}>
                <View style={styles.dialogueEntry}>
                  <Image 
                    source={{ uri: currentStory.characters[0].image }} 
                    style={styles.dialogueAvatar} 
                  />
                  <View style={styles.dialogueBubble}>
                    <Text style={styles.dialogueName}>{currentStory.characters[0].name}</Text>
                    <Text style={styles.dialogueText}>We need to gather the ancient artifacts before the eclipse.</Text>
                  </View>
                </View>
                
                <View style={styles.dialogueEntry}>
                  <Image 
                    source={{ uri: currentStory.characters[1].image }} 
                    style={styles.dialogueAvatar} 
                  />
                  <View style={styles.dialogueBubble}>
                    <Text style={styles.dialogueName}>{currentStory.characters[1].name}</Text>
                    <Text style={styles.dialogueText}>The rift is growing stronger by the hour. My magic can only slow it temporarily.</Text>
                  </View>
                </View>
                
                <View style={styles.dialogueEntry}>
                  <View style={styles.userDialogueAvatar}>
                    <Text style={styles.userDialogueText}>You</Text>
                  </View>
                  <View style={[styles.dialogueBubble, styles.userDialogueBubble]}>
                    <Text style={styles.dialogueText}>I'll help you gather what you need. Where should we look first?</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
            
            {/* Character Message Section */}
            <View style={styles.speakerContainer}>
              <View style={styles.speakerHeader}>
                <Text style={styles.speakerTitle}>{currentStory.currentMessage?.character}</Text>
                <View style={styles.audioControl}>
                  <Ionicons name="volume-medium" size={16} color="#FFFFFF" />
                </View>
              </View>
              
              <ScrollView style={styles.messageContainer}>
                {currentStory.currentMessage?.isAction && (
                  <Text style={styles.actionText}>
                    *Descends from the sky, eyes glowing with cold calculation*
                  </Text>
                )}
                <Text style={styles.messageText}>
                  {currentStory.currentMessage?.content}
                </Text>
              </ScrollView>
            </View>
            
            {/* Continue Story Options - Helps users jump into ongoing stories */}
            {showContinueOptions && (
              <View style={styles.continueOptionsContainer}>
                <View style={styles.continueHeader}>
                  <Text style={styles.continueTitle}>Story Timeline</Text>
                  <TouchableOpacity onPress={() => setShowContinueOptions(false)}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.dialogueHistory} contentContainerStyle={{paddingRight: 10}}>
                  <View style={styles.dialogueEntry}>
                    <Image 
                      source={{ uri: currentStory.characters[0].image }} 
                      style={styles.dialogueAvatar} 
                    />
                    <View style={styles.dialogueBubble}>
                      <Text style={styles.dialogueName}>{currentStory.characters[0].name}</Text>
                      <Text style={styles.dialogueText}>We need to gather the ancient artifacts before the eclipse.</Text>
                    </View>
                  </View>
                  
                  <View style={styles.dialogueEntry}>
                    <Image 
                      source={{ uri: currentStory.characters[1].image }} 
                      style={styles.dialogueAvatar} 
                    />
                    <View style={styles.dialogueBubble}>
                      <Text style={styles.dialogueName}>{currentStory.characters[1].name}</Text>
                      <Text style={styles.dialogueText}>The rift is growing stronger by the hour. My magic can only slow it temporarily.</Text>
                    </View>
                  </View>
                  
                  <View style={styles.dialogueEntry}>
                    <View style={styles.userDialogueAvatar}>
                      <Text style={styles.userDialogueText}>You</Text>
                    </View>
                    <View style={[styles.dialogueBubble, styles.userDialogueBubble]}>
                      <Text style={styles.dialogueText}>I'll help you gather what you need. Where should we look first?</Text>
                    </View>
                  </View>
                  
                  <View style={styles.dialogueEntry}>
                    <Image 
                      source={{ uri: currentStory.characters[1].image }} 
                      style={styles.dialogueAvatar} 
                    />
                    <View style={styles.dialogueBubble}>
                      <Text style={styles.dialogueName}>{currentStory.characters[1].name}</Text>
                      <Text style={styles.dialogueText}>{currentStory.currentMessage?.content}</Text>
                    </View>
                  </View>
                </ScrollView>
                
                {/* Timeline action buttons removed */}
              </View>
            )}
          </View>
          
          {/* Input Area */}
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Say something..."
                  placeholderTextColor="#999"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                />
                
                {/* AI Suggestion Button */}
                <TouchableOpacity 
                  style={styles.aiSuggestionButton}
                  onPress={() => {
                    // Demo suggestion - in real app, would call an AI API
                    setMessage("Perhaps we should seek shelter before the storm arrives. The forest ahead looks dense enough to provide cover.");
                  }}
                >
                  <View style={styles.aiButtonInner}>
                    <Text style={styles.aiButtonText}>AI</Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              {/* Voice Input Button */}
              <TouchableOpacity style={styles.voiceInputButton}>
                <Ionicons name="mic" size={24} color="#FFF" />
              </TouchableOpacity>
              
              {/* Send Button */}
              <TouchableOpacity 
                style={[styles.sendButton, message.length > 0 && styles.sendButtonActive]}
                disabled={message.length === 0}
              >
                <Ionicons name="send" size={24} color={message.length > 0 ? "#4BDFC3" : "#555"} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width + 20, // Add extra width for the parallax effect
    height: height + 20,
    opacity: 0.8,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pageContent: {
    flex: 1,
    paddingBottom: 60, // Add padding at the bottom to prevent overlap
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activeFilterButton: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
  },
  filterText: {
    color: '#FFF',
    fontSize: 12,
  },
  activeFilterText: {
    color: '#4BDFC3',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 20,
  },
  storyTitleContainer: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyTitleLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  charactersPreview: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#111',
  },
  characterCount: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  catchupContainer: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(75, 223, 195, 0.3)',
    maxHeight: 70,
  },
  catchupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  catchupLabel: {
    color: '#4BDFC3',
    fontWeight: 'bold',
    fontSize: 12,
  },
  catchupText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.15)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  timeButtonText: {
    color: '#4BDFC3',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  speakerContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    marginBottom: 30,
  },
  speakerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  speakerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  audioControl: {
    backgroundColor: 'rgba(60,60,60,0.8)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  messageContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionText: {
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    marginBottom: 6,
  },
  messageText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 19,
  },
  storyControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  titleAndAuthor: {
    flex: 1,
  },
  storyTitleSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  authorName: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  interactionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionButton: {
    paddingHorizontal: 12,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(50,50,50,0.8)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    paddingVertical: 8,
    maxHeight: 100,
  },
  aiSuggestionButton: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiButtonInner: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#4BDFC3',
  },
  aiButtonText: {
    color: '#4BDFC3',
    fontWeight: 'bold',
    fontSize: 12,
  },
  voiceInputButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(40, 40, 40, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: 'rgba(75, 223, 195, 0.3)',
  },
  genreFilterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  genreFilterContent: {
    alignItems: 'center',
  },
  genreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activeGenreButton: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
  },
  genreText: {
    color: '#FFF',
    fontSize: 12,
  },
  activeGenreText: {
    color: '#4BDFC3',
    fontWeight: '600',
  },
  continueOptionsContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 10,
    margin: 15,
    marginTop: 5,
    maxHeight: 220,
  },
  continueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  continueTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dialogueHistory: {
    maxHeight: 150,
  },
  dialogueEntry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dialogueAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  dialogueBubble: {
    backgroundColor: 'rgba(60,60,60,0.8)',
    borderRadius: 10,
    padding: 8,
    flex: 1,
  },
  dialogueName: {
    color: '#4BDFC3',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dialogueText: {
    color: 'white',
    fontSize: 13,
    lineHeight: 16,
  },
  userDialogueAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userDialogueText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timelineContainer: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#333',
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineTitle: {
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
  },
  userDialogueBubble: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
  },
  storyTitleHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storyTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  titleActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleActionButton: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  searchButtonSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
}); 