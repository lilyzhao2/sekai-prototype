import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock data for played stories
interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  time: string;
}

const playedStories: StoryItem[] = [
  {
    id: '1',
    title: 'Kryptonians and the Dark Knight',
    subtitle: 'who am I ?',
    image: 'https://placehold.co/60x60/333/white?text=K',
    time: '1d'
  },
  {
    id: '2',
    title: 'Falling For Captain Marvel\'s Charm',
    subtitle: 'And second... I\'d like to hear more about your research.',
    image: 'https://placehold.co/60x60/f16522/white?text=CM',
    time: '2d'
  }
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('played');
  
  // Render a story item in the list
  const renderStoryItem = ({ item }: { item: StoryItem }) => (
    <TouchableOpacity style={styles.storyItem}>
      <Image source={{ uri: item.image }} style={styles.storyItemImage} />
      <View style={styles.storyItemContent}>
        <Text style={styles.storyItemTitle}>{item.title}</Text>
        <Text style={styles.storyItemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
      </View>
      <Text style={styles.storyItemTime}>{item.time}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#000' }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://placehold.co/100x100/orange/white?text=Fox' }} 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Story</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.userName}>Lily Zhao (LZ)</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-discord" size={20} color="white" style={styles.socialButtonIcon} />
          <Text style={styles.socialButtonText}>Join on Discord</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-reddit" size={20} color="white" style={styles.socialButtonIcon} />
          <Text style={styles.socialButtonText}>Join on Reddit</Text>
        </TouchableOpacity>
      </View>

      {/* Top-level tabs for Sekai/Stories/Liked content */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.tabButton}>
            <Ionicons name="albums-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Ionicons name="videocam-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, styles.activeTabButton]}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Secondary tabs for Liked/Played */}
      <View style={styles.secondaryTabsContainer}>
        <TouchableOpacity 
          style={[styles.secondaryTab, activeTab === 'liked' && styles.activeSecondaryTab]} 
          onPress={() => setActiveTab('liked')}
        >
          <Text style={[styles.secondaryTabText, activeTab === 'liked' && styles.activeSecondaryTabText]}>
            Liked
          </Text>
          {activeTab === 'liked' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.secondaryTab, activeTab === 'played' && styles.activeSecondaryTab]} 
          onPress={() => setActiveTab('played')}
        >
          <Text style={[styles.secondaryTabText, activeTab === 'played' && styles.activeSecondaryTabText]}>
            Played
          </Text>
          {activeTab === 'played' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Tab content */}
      <View style={styles.tabContent}>
        {activeTab === 'liked' ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No liked stories yet</Text>
            <Text style={styles.emptySubText}>Stories you like will appear here</Text>
          </View>
        ) : (
          <FlatList
            data={playedStories}
            renderItem={renderStoryItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
            ListHeaderComponent={() => (
              <View style={styles.notificationsContainer}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons name="notifications-outline" size={24} color="white" />
                </View>
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationTitle}>Notifications</Text>
                  <Text style={styles.notificationSubtitle}>See notifications here.</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No activity yet</Text>
                <Text style={styles.emptySubText}>Stories you interact with will appear here</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsButton: {
    padding: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  editButton: {
    padding: 4,
  },
  socialButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  socialButtonIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tabButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#222',
  },
  activeTabButton: {
    backgroundColor: '#333',
  },
  secondaryTabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  secondaryTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  activeSecondaryTab: {
    // Style for active secondary tab
  },
  secondaryTabText: {
    fontSize: 16,
    color: '#666',
  },
  activeSecondaryTabText: {
    color: 'white',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '30%',
    height: 2,
    backgroundColor: 'white',
  },
  tabContent: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  notificationIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0E3B43',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationSubtitle: {
    color: '#999',
    fontSize: 16,
  },
  storyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  storyItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  storyItemContent: {
    flex: 1,
  },
  storyItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  storyItemSubtitle: {
    color: '#999',
    fontSize: 14,
  },
  storyItemTime: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
}); 