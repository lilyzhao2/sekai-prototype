import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Modal,
  FlatList,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import StoryApiService, { StoryChapter, StoryDetails } from '../services/StoryApiService';

// Extend the StoryDetails interface to include summary
interface ExtendedStoryDetails extends StoryDetails {
  summary?: string;
}

const { width, height } = Dimensions.get('window');

const StoryReadingView = ({
  storyId,
  platform,
  chapter = 1,
  onClose
}: {
  storyId: string;
  platform: 'AO3' | 'Wattpad' | 'Sekai';
  chapter?: number;
  onClose: () => void;
}) => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storyDetails, setStoryDetails] = useState<ExtendedStoryDetails | null>(null);
  const [chapterData, setChapterData] = useState<StoryChapter | null>(null);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showStorySoFar, setShowStorySoFar] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [distractionFreeMode, setDistractionFreeMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [readingProgress, setReadingProgress] = useState(0);

  // Fetch story data from API service
  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      try {
        // Fetch story details from the API
        const details = await StoryApiService.fetchStoryDetails(storyId, platform);
        setStoryDetails(details);
        
        // Fetch chapter data from the API
        const chapterContent = await StoryApiService.fetchChapter(storyId, platform, chapter);
        setChapterData(chapterContent);
      } catch (err) {
        console.error('Failed to fetch story:', err);
        setError('Failed to load story. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [storyId, platform, chapter]);

  const navigateToChapter = async (chapterNum: number) => {
    setLoading(true);
    setShowChapters(false);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    try {
      const chapterContent = await StoryApiService.fetchChapter(storyId, platform, chapterNum);
      setChapterData(chapterContent);
      // In a real app, we might also update the URL/route
    } catch (err) {
      console.error('Failed to fetch chapter:', err);
      setError('Failed to load chapter. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeMultiplier > 0.8) {
      setFontSizeMultiplier(prev => prev - 0.1);
    }
  };

  const increaseFontSize = () => {
    if (fontSizeMultiplier < 1.4) {
      setFontSizeMultiplier(prev => prev + 0.1);
    }
  };

  const toggleControls = () => {
    if (distractionFreeMode) return;
    setShowControls(prev => !prev);
  };

  const toggleDistractFreeMode = () => {
    setDistractionFreeMode(prev => !prev);
    if (!distractionFreeMode) {
      setShowControls(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start();
    } else {
      setShowControls(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
    const progress = Math.max(0, Math.min(1, scrollPosition / contentHeight));
    setReadingProgress(progress);
  };

  const toggleAudioPlayback = async () => {
    if (isPlaying && sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      return;
    }

    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
      return;
    }

    // This is a placeholder for actual TTS implementation
    try {
      // Using an online sample MP3 instead of a local file
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      
      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading story...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onClose}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with controls - show only when showControls is true */}
      {showControls && (
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.storyTitle}>{storyDetails?.title}</Text>
            <Text style={styles.chapterTitle}>
              {chapterData?.title || `Chapter ${chapter}`}
            </Text>
            <Text style={styles.authorText}>by {storyDetails?.author}</Text>
          </View>
          
          <TouchableOpacity style={styles.menuButton} onPress={() => setShowChapters(true)}>
            <Ionicons name="list-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Reading progress indicator */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${readingProgress * 100}%` }]} />
      </View>
      
      {/* Main content with gradient background */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        onTouchStart={toggleControls}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(20,20,30,0.9)']}
          style={styles.gradientBackground}
        >
          {/* Story So Far Button */}
          {chapter > 1 && (
            <TouchableOpacity 
              style={styles.storySoFarButton}
              onPress={() => setShowStorySoFar(true)}
            >
              <Ionicons name="bookmark" size={18} color="#4BDFC3" />
              <Text style={styles.storySoFarText}>Story So Far</Text>
            </TouchableOpacity>
          )}

          {chapterData?.content.map((paragraph, index) => {
            if (paragraph === "") {
              return <View key={index} style={styles.paragraphSpacer} />;
            }
            
            // Special formatting for the alert message
            if (paragraph.includes("ALERT:") || paragraph.includes("CIVILIAN") || paragraph.includes("GUARDIAN RESPONSE")) {
              return (
                <Text 
                  key={index} 
                  style={[
                    styles.alertText,
                    { fontSize: 16 * fontSizeMultiplier }
                  ]}
                >
                  {paragraph}
                </Text>
              );
            }
            
            return (
              <Text 
                key={index} 
                style={[
                  styles.paragraph,
                  { fontSize: 16 * fontSizeMultiplier }
                ]}
              >
                {paragraph}
              </Text>
            );
          })}
          
          {/* Footer with chapter information */}
          <View style={styles.sourceInfo}>
            <Text style={styles.sourceText}>
              From {storyDetails?.platform} • {storyDetails?.wordCount.toLocaleString()} words
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
      
      {/* Footer with controls - show only when showControls is true */}
      {showControls && (
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <View style={styles.chapterControls}>
            <TouchableOpacity 
              style={[styles.chapterButton, chapter <= 1 && styles.disabledButton]}
              disabled={chapter <= 1}
              onPress={() => navigateToChapter(chapter - 1)}
            >
              <Ionicons 
                name="chevron-back" 
                size={24} 
                color={chapter <= 1 ? "#666" : "white"} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.chapterIndicator}
              onPress={() => setShowChapters(true)}
            >
              <Text style={styles.chapterIndicatorText}>
                {chapter} / {storyDetails?.totalChapters}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.chapterButton, 
                chapter >= (storyDetails?.totalChapters || 1) && styles.disabledButton
              ]}
              disabled={chapter >= (storyDetails?.totalChapters || 1)}
              onPress={() => navigateToChapter(chapter + 1)}
            >
              <Ionicons 
                name="chevron-forward" 
                size={24} 
                color={chapter >= (storyDetails?.totalChapters || 1) ? "#666" : "white"} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={decreaseFontSize}>
              <Ionicons name="text-outline" size={18} color="white" />
              <Text style={styles.sizeButtonText}>-</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={increaseFontSize}>
              <Ionicons name="text-outline" size={24} color="white" />
              <Text style={styles.sizeButtonText}>+</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={toggleAudioPlayback}>
              <Ionicons name={isPlaying ? "pause" : "volume-high-outline"} size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={toggleDistractFreeMode}>
              <Ionicons name={distractionFreeMode ? "eye" : "eye-outline"} size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Chapter List Modal */}
      <Modal
        visible={showChapters}
        transparent
        animationType="slide"
        onRequestClose={() => setShowChapters(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chapters</Text>
              <TouchableOpacity onPress={() => setShowChapters(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={Array.from({ length: storyDetails?.totalChapters || 0 }, (_, i) => i + 1)}
              keyExtractor={(item) => `chapter-${item}`}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.chapterItem, 
                    item === chapter && styles.activeChapter
                  ]}
                  onPress={() => navigateToChapter(item)}
                >
                  <Text style={[
                    styles.chapterItemText,
                    item === chapter && styles.activeChapterText
                  ]}>
                    Chapter {item}
                    {item === chapter && " (Current)"}
                  </Text>
                  {item < chapter && (
                    <Ionicons name="checkmark-circle" size={16} color="#4BDFC3" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Story So Far Modal */}
      <Modal
        visible={showStorySoFar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStorySoFar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Story So Far</Text>
              <TouchableOpacity onPress={() => setShowStorySoFar(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.storySoFarContent}>
              <Text style={styles.storySoFarSummary}>
                {storyDetails?.summary || "No summary available."}
              </Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.previousChaptersTitle}>
                Previous Chapters:
              </Text>
              
              {Array.from({ length: chapter - 1 }, (_, i) => i + 1).map((prevChapter) => (
                <View key={`recap-${prevChapter}`} style={styles.recapChapter}>
                  <Text style={styles.recapChapterTitle}>
                    Chapter {prevChapter}
                  </Text>
                  <Text style={styles.recapChapterSummary}>
                    {/* This would come from the API in a real implementation */}
                    {`Summary of events from chapter ${prevChapter}. This would provide context about what happened previously in the story to help the reader remember where they left off.`}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#FFF',
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  errorText: {
    color: '#FFF',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4BDFC3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backButton: {
    padding: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  storyTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chapterTitle: {
    color: '#CCC',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
  authorText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  menuButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  gradientBackground: {
    paddingHorizontal: 20,
    paddingTop: 20,
    minHeight: height - 180,
  },
  paragraph: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  paragraphSpacer: {
    height: 16,
  },
  alertText: {
    color: '#FFD166',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  sourceInfo: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  sourceText: {
    color: '#999',
    fontSize: 12,
  },
  footer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 10,
  },
  chapterControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  chapterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  disabledButton: {
    backgroundColor: '#222',
  },
  chapterIndicator: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    marginHorizontal: 10,
  },
  chapterIndicatorText: {
    color: '#FFF',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  actionButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: height * 0.7,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chapterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  activeChapter: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
  },
  chapterItemText: {
    color: '#FFF',
    fontSize: 16,
  },
  activeChapterText: {
    color: '#4BDFC3',
    fontWeight: 'bold',
  },
  storySoFarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  storySoFarText: {
    color: '#4BDFC3',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  storySoFarContent: {
    padding: 15,
  },
  storySoFarSummary: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
  },
  previousChaptersTitle: {
    color: '#4BDFC3',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recapChapter: {
    marginBottom: 15,
  },
  recapChapterTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recapChapterSummary: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 22,
  },
  progressBarContainer: {
    height: 2,
    width: '100%',
    backgroundColor: '#222',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4BDFC3',
  },
});

export default StoryReadingView; 