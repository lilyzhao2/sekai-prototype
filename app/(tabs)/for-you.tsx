import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, Dimensions, Platform, TouchableOpacity, Image, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForYouScreen() {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();
  
  // Current story/interaction being displayed
  const currentStory = {
    characterName: 'Spider-Man',
    message: '*Tugging nervously at his mask, exposing his flushed cheeks* Wow, that was... enthusiastic! I mean, great! I just didn\'t think someone like you would actually say yes to someone like me.',
    storyTitle: 'Spider-Man\'s Scarlet Crush',
    author: '@unknown',
    likes: 2,
    backgroundImage: 'https://wallpaperaccess.com/full/1373201.jpg', // NYC sunset for Spider-Man
    characterImage: 'https://i.pinimg.com/originals/16/01/0d/16010d48d3e7631b1dc91123c35adfc1.png', // Spider-Man
  };

  // Use a subtle parallax effect on the background
  const [backgroundOffset, setBackgroundOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundOffset(prev => (prev < 10 ? prev + 0.1 : 0));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

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
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <SafeAreaView edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>For you</Text>
              <TouchableOpacity style={styles.searchButton}>
                <Ionicons name="search" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.pageContent}
        >
          {/* Main content */}
          <View style={styles.mainContent}>
            {/* Character Image (optionally visible, depends on the story) */}
            <View style={styles.characterImageContainer}>
              <Image 
                source={{ uri: currentStory.characterImage }} 
                style={styles.characterImage} 
                resizeMode="contain"
              />
            </View>
            
            {/* Character Message Bubble */}
            <View style={styles.messageBubbleContainer}>
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{currentStory.characterName}</Text>
                <View style={styles.audioIndicator}>
                  <FontAwesome name="microphone" size={14} color="white" />
                </View>
              </View>
              
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>
                  <Text style={styles.actionText}>*Tugging nervously at his mask, exposing his flushed cheeks*</Text>
                  {" Wow, that was... enthusiastic! I mean, great! I just didn't think someone like you would actually say yes to someone like me."}
                </Text>
              </View>
            </View>
            
            {/* Story Info and Actions */}
            <View style={styles.storyInfoContainer}>
              <View style={styles.storyTitleRow}>
                <Text style={styles.storyTitle}>{currentStory.storyTitle}</Text>
                <Ionicons name="play" size={16} color="white" />
              </View>
              <Text style={styles.authorText}>{currentStory.author}</Text>
            </View>
            
            {/* Interaction Buttons */}
            <View style={styles.interactionBar}>
              <TouchableOpacity style={styles.interactionButton}>
                <Ionicons name="heart" size={24} color="white" />
                <Text style={styles.interactionCount}>{currentStory.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.interactionButton}>
                <Ionicons name="arrow-redo" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.interactionButton}>
                <Ionicons name="time" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Input Area */}
          <View style={styles.inputArea}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Say something..."
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity style={styles.sendButton}>
                <Ionicons name="send" size={20} color="rgba(255,255,255,0.8)" />
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
  pageContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
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
  mainContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 80, // Space for the input area
  },
  characterImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  characterImage: {
    width: width * 0.9,
    height: height * 0.5,
  },
  messageBubbleContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  characterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  audioIndicator: {
    backgroundColor: 'rgba(60,60,60,0.8)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  messageBubble: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  actionText: {
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.7)',
  },
  storyInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  storyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 6,
  },
  authorText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  interactionBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  interactionCount: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  inputArea: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60,60,60,0.6)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    maxHeight: 80,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(100,100,100,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 