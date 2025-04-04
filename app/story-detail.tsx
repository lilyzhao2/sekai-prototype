import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample story data
const storyData = {
  id: '1',
  title: 'Falling For Captain Marvel\'s Charm',
  image: { uri: 'https://placehold.co/600x400/f16522/white?text=Captain+Marvel' },
  author: '@cosmic_writer',
  publishDate: 'May 15, 2025',
  chapters: 12,
  completed: true,
  rating: 4.8,
  reads: 35642,
  genre: ['Superhero', 'Romance', 'Adventure'],
  description: "You're a skilled S.H.I.E.L.D. agent with a reputation for being unflappable in any situation. But when Captain Marvel joins your mission to investigate alien technology discovered in the Arctic, you find yourself struggling to keep your cool. What starts as professional admiration quickly evolves into something more as you work side by side with the powerful hero, facing dangers that bring you closer together.",
  chapterList: [
    { number: 1, title: 'The Assignment', completed: true },
    { number: 2, title: 'First Encounter', completed: true },
    { number: 3, title: 'Arctic Tensions', completed: true },
    { number: 4, title: 'Under Fire', completed: true },
    { number: 5, title: 'Hidden Truths', completed: true },
    { number: 6, title: 'Power Surge', completed: false },
    { number: 7, title: 'Breaking Point', completed: false },
    { number: 8, title: 'Confessions', completed: false },
    { number: 9, title: 'The Choice', completed: false },
    { number: 10, title: 'Final Stand', completed: false },
    { number: 11, title: 'Beyond Earth', completed: false },
    { number: 12, title: 'New Beginnings', completed: false }
  ]
};

export default function StoryDetail() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('about');
  
  // In a real app, we would use the ID to fetch data
  // const { id } = useLocalSearchParams();
  const story = storyData;
  
  const renderAboutTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Synopsis</Text>
      <Text style={styles.description}>{story.description}</Text>
      
      <Text style={styles.sectionTitle}>Genres</Text>
      <View style={styles.genreContainer}>
        {story.genre.map((genre, index) => (
          <View key={index} style={styles.genreTag}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Story Stats</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{story.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{story.reads.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Reads</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{story.chapters}</Text>
          <Text style={styles.statLabel}>Chapters</Text>
        </View>
      </View>
    </View>
  );
  
  const renderChaptersTab = () => (
    <View style={styles.tabContent}>
      {story.chapterList.map((chapter, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.chapterItem, 
            chapter.completed ? styles.completedChapter : null
          ]}
        >
          <View style={styles.chapterNumber}>
            <Text style={styles.chapterNumberText}>{chapter.number}</Text>
          </View>
          <View style={styles.chapterInfo}>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
            {chapter.completed ? (
              <Text style={styles.chapterStatus}>Read</Text>
            ) : (
              <Text style={styles.chapterStatus}>Unread</Text>
            )}
          </View>
          <Text style={styles.chapterArrow}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton}>
            <Text style={styles.optionsButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
        
        {/* Story cover and basic info */}
        <View style={styles.storyHeader}>
          <Image source={story.image} style={styles.coverImage} />
          <View style={styles.storyInfo}>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyAuthor}>By {story.author}</Text>
            <Text style={styles.publishDate}>{story.publishDate}</Text>
            
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: story.completed ? '#4CAF50' : '#FFC107' }]}>
                <Text style={styles.statusText}>{story.completed ? 'Completed' : 'Ongoing'}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Add to Library</Text>
          </TouchableOpacity>
        </View>
        
        {/* Tabs for About and Chapters */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, selectedTab === 'about' && styles.activeTabButton]}
            onPress={() => setSelectedTab('about')}
          >
            <Text style={[styles.tabButtonText, selectedTab === 'about' && styles.activeTabText]}>About</Text>
            {selectedTab === 'about' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, selectedTab === 'chapters' && styles.activeTabButton]}
            onPress={() => setSelectedTab('chapters')}
          >
            <Text style={[styles.tabButtonText, selectedTab === 'chapters' && styles.activeTabText]}>Chapters</Text>
            {selectedTab === 'chapters' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>
        
        {/* Tab content */}
        {selectedTab === 'about' && renderAboutTab()}
        {selectedTab === 'chapters' && renderChaptersTab()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
  },
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsButtonText: {
    fontSize: 20,
    color: 'white',
  },
  storyHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  storyInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  storyAuthor: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 4,
  },
  publishDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#f16522',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTabButton: {
    // Style for active tab
  },
  tabButtonText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 3,
    backgroundColor: '#f16522',
    borderRadius: 1.5,
  },
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#CCC',
    lineHeight: 24,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: 'white',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#AAA',
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  completedChapter: {
    opacity: 0.6,
  },
  chapterNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  chapterNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chapterStatus: {
    color: '#888',
    fontSize: 14,
  },
  chapterArrow: {
    color: '#888',
    fontSize: 24,
    marginLeft: 8,
  },
}); 