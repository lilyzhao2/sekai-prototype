import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function ForYouScreen() {
  const [message, setMessage] = useState('');
  
  // Current story/interaction being displayed
  const currentStory = {
    characterName: 'Spider-Man',
    message: '*Tugging nervously at his mask, exposing his flushed cheeks* Wow, that was... enthusiastic! I mean, great! I just didn\'t think someone like you would actually say yes to someone like me.',
    storyTitle: 'Spider-Man\'s Scarlet Crush',
    author: '@unknown',
    likes: 2,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.pageContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>For you</Text>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Character Name and Audio Indicator */}
          <View style={styles.characterHeader}>
            <Text style={styles.characterName}>{currentStory.characterName}</Text>
            <View style={styles.audioIndicator}>
              <FontAwesome name="microphone" size={16} color="white" />
            </View>
          </View>
          
          {/* Character Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{currentStory.message}</Text>
          </View>
          
          {/* Story Info */}
          <View style={styles.storyInfo}>
            <Text style={styles.storyTitle}>
              {currentStory.storyTitle} <MaterialIcons name="play-arrow" size={18} color="white" />
            </Text>
            <Text style={styles.authorName}>{currentStory.author}</Text>
          </View>
          
          {/* Interaction Buttons */}
          <View style={styles.interactionBar}>
            <TouchableOpacity style={styles.interactionButton}>
              <FontAwesome name="heart" size={22} color="#ff3b30" />
              <Text style={styles.likeCount}>{currentStory.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="arrow-undo" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="time-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Input Box */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Say something..."
              placeholderTextColor="#aaa"
              value={message}
              onChangeText={setMessage}
            />
          </View>
          
          {/* Side Action Buttons */}
          <View style={styles.sideActionButtons}>
            <TouchableOpacity style={styles.sideButton}>
              <FontAwesome name="heart" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideButton}>
              <Ionicons name="chatbubble" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideButton}>
              <Ionicons name="time-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideButton}>
              <Ionicons name="ellipsis-vertical" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
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
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  pageContent: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 8,
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
  characterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: height * 0.5, // Position approximately in the middle of the screen
  },
  characterName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  audioIndicator: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  messageText: {
    fontSize: 18,
    color: 'white',
    lineHeight: 26,
  },
  storyInfo: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  interactionBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  likeCount: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(50,50,50,0.6)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageInput: {
    color: 'white',
    fontSize: 16,
    height: 40,
  },
  sideActionButtons: {
    position: 'absolute',
    right: 15,
    top: height * 0.35,
    alignItems: 'center',
  },
  sideButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(60,60,60,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
}); 