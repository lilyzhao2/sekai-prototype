import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InteractScreen() {
  const [selectedTab, setSelectedTab] = useState('played');
  const [message, setMessage] = useState('');

  const notifications = [
    {
      id: '1',
      title: 'Notifications',
      subtitle: 'See notifications here.',
      image: { uri: 'https://placehold.co/60x60/009688/white?text=Bell' },
      time: '',
    },
  ];

  const interactions = [
    {
      id: '2',
      title: 'Kryptonians and the Dark Knight',
      subtitle: 'who am I ?',
      image: { uri: 'https://placehold.co/60x60/202020/white?text=Space' },
      time: '1d',
    },
    {
      id: '3',
      title: 'Falling For Captain Marvel\'s Charm',
      subtitle: 'And second... I\'d like to hear more about your day.',
      image: { uri: 'https://placehold.co/60x60/f16522/white?text=CM' },
      time: '2d',
    },
  ];

  // For the "For You" tab content (shown in other screenshot)
  const forYouContent = {
    characterName: 'Spider-Man',
    message: '*Tugging nervously at his mask, exposing his flushed cheeks* Wow, that was... enthusiastic! I mean, great! I just didn\'t think someone like you would actually say yes to someone like me.',
    storyTitle: 'Spider-Man\'s Scarlet Crush',
    author: '@unknown',
    image: { uri: 'https://placehold.co/350x500/e51c23/white?text=Spider-Man' },
    likes: 2,
  };

  // Render the "Played" tab content
  const renderPlayedTab = () => (
    <ScrollView style={styles.tabContent}>
      {[...notifications, ...interactions].map(item => (
        <TouchableOpacity key={item.id} style={styles.interactionItem}>
          <Image source={item.image} style={styles.interactionImage} />
          <View style={styles.interactionTextContainer}>
            <Text style={styles.interactionTitle}>{item.title}</Text>
            <Text style={styles.interactionSubtitle}>{item.subtitle}</Text>
          </View>
          {item.time ? (
            <Text style={styles.timeText}>{item.time}</Text>
          ) : (
            <Text style={styles.arrowIcon}>›</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Render the "Liked" tab content (simplified)
  const renderLikedTab = () => (
    <View style={styles.emptyTabContent}>
      <Text style={styles.emptyTabText}>No liked stories yet</Text>
    </View>
  );

  // Render the "For You" tab content (from the final screenshot)
  const renderForYouTab = () => (
    <View style={styles.forYouContainer}>
      <Image source={forYouContent.image} style={styles.forYouImage} />
      <View style={styles.messageOverlay}>
        <Text style={styles.characterName}>{forYouContent.characterName}</Text>
        <Text style={styles.messageText}>{forYouContent.message}</Text>
        <View style={styles.storyInfoContainer}>
          <Text style={styles.storyTitle}>{forYouContent.storyTitle}</Text>
          <Text style={styles.authorName}>{forYouContent.author}</Text>
        </View>
        <View style={styles.interactionBar}>
          <TouchableOpacity style={styles.interactionButton}>
            <Text style={styles.heartIcon}>❤️</Text>
            <Text style={styles.likeCount}>{forYouContent.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Text style={styles.shareIcon}>➡️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Text style={styles.timeIcon}>🕒</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Say something..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsHeader}>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'liked' && styles.activeTabButton]}
          onPress={() => setSelectedTab('liked')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'liked' && styles.activeTabText]}>
            Liked
          </Text>
          {selectedTab === 'liked' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'played' && styles.activeTabButton]}
          onPress={() => setSelectedTab('played')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'played' && styles.activeTabText]}>
            Played
          </Text>
          {selectedTab === 'played' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      {selectedTab === 'played' && renderPlayedTab()}
      {selectedTab === 'liked' && renderLikedTab()}
      {selectedTab === 'forYou' && renderForYouTab()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  tabsHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    position: 'relative',
  },
  activeTabButton: {
    // Style for active tab
  },
  tabButtonText: {
    fontSize: 18,
    color: '#888',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -8,
    left: 20,
    right: 20,
    height: 3,
    backgroundColor: 'white',
  },
  tabContent: {
    flex: 1,
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  interactionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  interactionTextContainer: {
    flex: 1,
  },
  interactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  interactionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#888',
    marginLeft: 8,
  },
  emptyTabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTabText: {
    color: '#888',
    fontSize: 16,
  },
  forYouContainer: {
    flex: 1,
    position: 'relative',
  },
  forYouImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  messageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
  storyInfoContainer: {
    marginBottom: 16,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  authorName: {
    fontSize: 14,
    color: '#888',
  },
  interactionBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  interactionButton: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  likeCount: {
    color: 'white',
    fontSize: 14,
  },
  shareIcon: {
    fontSize: 20,
  },
  timeIcon: {
    fontSize: 20,
  },
  inputContainer: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageInput: {
    color: 'white',
    fontSize: 16,
  },
});
