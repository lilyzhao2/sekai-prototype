import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stories');
  
  // No Sekai created yet
  const isEmptyState = true;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Top header with only search button */}
        <View style={[styles.header, {borderBottomWidth: 0}]}>
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Main header with username and buttons */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>@olivia</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="play-circle-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Profile Info Section */}
          <View style={styles.profileSection}>
            {/* Avatar */}
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }} 
                  style={styles.avatar} 
                />
                <TouchableOpacity style={styles.cameraButton}>
                  <Ionicons name="camera" size={14} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Stats (Story, Followers, Following) */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Sekais</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>218</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>452</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
              </View>
            </View>

            {/* Username with edit button */}
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>Olivia</Text>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="pencil" size={18} color="white" />
              </TouchableOpacity>
            </View>

            {/* Social buttons - smaller size with additional platforms */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-discord" size={16} color="#5865F2" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Discord</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-reddit" size={16} color="#FF4500" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Reddit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="book-outline" size={16} color="#FF6900" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Wattpad</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="library-outline" size={16} color="#990000" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>AO3</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab navigation - Instagram style */}
          <View style={styles.tabBar}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'stories' && styles.activeTabButton]}
              onPress={() => setActiveTab('stories')}
            >
              <Ionicons 
                name="book-outline" 
                size={22} 
                color={activeTab === 'stories' ? '#4BDFC3' : '#999'} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'sekai' && styles.activeTabButton]}
              onPress={() => setActiveTab('sekai')}
            >
              <Ionicons 
                name="planet-outline" 
                size={22} 
                color={activeTab === 'sekai' ? '#4BDFC3' : '#999'} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'interacted' && styles.activeTabButton]}
              onPress={() => setActiveTab('interacted')}
            >
              <Ionicons 
                name="chatbubble-outline" 
                size={22} 
                color={activeTab === 'interacted' ? '#4BDFC3' : '#999'} 
              />
            </TouchableOpacity>
          </View>

          {/* Tab indicator - remove text labels, Instagram doesn't have them */}
          <View style={styles.tabIndicatorRow}>
            <View style={styles.tabLabelsContainer}>
              <Text style={[styles.tabLabel, activeTab === 'stories' && styles.activeTabLabel]}>
                Stories <Text style={styles.tabCount}>0</Text>
              </Text>
              <Text style={[styles.tabLabel, activeTab === 'sekai' && styles.activeTabLabel]}>
                Sekai <Text style={styles.tabCount}>12</Text>
              </Text>
              <Text style={[styles.tabLabel, activeTab === 'interacted' && styles.activeTabLabel]}>
                Interacted <Text style={styles.tabCount}>0</Text>
              </Text>
            </View>
          </View>

          {/* Empty state message with clickable icon */}
          {isEmptyState && (
            <View style={styles.emptyStateContainer}>
              <TouchableOpacity 
                style={styles.emptyStateIcon}
                onPress={() => router.push('/create')}
              >
                <Ionicons name="add" size={40} color="#4BDFC3" />
              </TouchableOpacity>
              <Text style={styles.emptyStateTitle}>Nothing Yet</Text>
              <Text style={styles.emptyStateSubtitle}>
                Create your first story and start building your world.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 18,
  },
  settingsButton: {
    marginLeft: 18,
  },
  profileSection: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#333',
    borderWidth: 0.5,
    borderColor: '#555',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4BDFC3',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 4,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  editButton: {
    opacity: 0.7,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50,50,50,0.8)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 3,
  },
  socialIcon: {
    marginRight: 6,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#333',
    paddingVertical: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#4BDFC3',
  },
  tabIndicatorRow: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabLabel: {
    fontSize: 14,
    color: '#999',
    paddingHorizontal: 10,
  },
  activeTabLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabCount: {
    opacity: 0.7,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 100,
  },
  emptyStateIcon: {
    marginBottom: 20,
    backgroundColor: '#222',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
}); 