import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://placehold.co/100x100/orange/white?text=Fox' }} 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Text>📷</Text>
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
          <Text>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonIcon}>👾</Text>
          <Text style={styles.socialButtonText}>Join on Discord</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonIcon}>🤖</Text>
          <Text style={styles.socialButtonText}>Join on Reddit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabIcon}>📘</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabIcon}>📽️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, styles.activeTabButton]}>
            <Text style={styles.tabIcon}>❤️</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.tabContent}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentLabel}>Sekai 0</Text>
          <Text style={styles.contentLabel}>Storylines 0</Text>
          <Text style={styles.contentLabel}>Stories 0</Text>
          <Text style={styles.contentLabel}>Roleplayed 1</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Uh oh, no sekai found yet!</Text>
          <Text style={styles.emptySubText}>Click "Create New Sekai" or the Add button below to start!</Text>
          
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create New Sekai</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 8,
    paddingBottom: 16,
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
    fontSize: 18,
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
  tabIcon: {
    fontSize: 20,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  contentLabel: {
    color: 'white',
    fontSize: 14,
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
}); 