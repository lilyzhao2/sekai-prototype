import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WORLDS = [
  {
    id: '1',
    name: 'Fantasy Realm',
    creator: 'WorldBuilder',
    image: 'https://via.placeholder.com/100',
    storyCount: 24,
  },
  {
    id: '2',
    name: 'Sci-Fi Universe',
    creator: 'SpaceCreator',
    image: 'https://via.placeholder.com/100',
    storyCount: 18,
  },
  {
    id: '3',
    name: 'Medieval Kingdom',
    creator: 'HistoryBuff',
    image: 'https://via.placeholder.com/100',
    storyCount: 32,
  },
  {
    id: '4',
    name: 'Cyberpunk City',
    creator: 'NeonDreamer',
    image: 'https://via.placeholder.com/100',
    storyCount: 15,
  },
  {
    id: '5',
    name: 'Underwater Civilization',
    creator: 'OceanExplorer',
    image: 'https://via.placeholder.com/100',
    storyCount: 9,
  },
];

// Define the World type
interface World {
  id: string;
  name: string;
  creator: string;
  image: string;
  storyCount: number;
}

export default function WikiScreen() {
  const renderWorldItem = ({ item }: { item: World }) => (
    <TouchableOpacity style={styles.worldCard}>
      <View style={styles.worldImageContainer}>
        <Image source={{ uri: item.image }} style={styles.worldImage} />
      </View>
      <View style={styles.worldInfo}>
        <Text style={styles.worldName}>{item.name}</Text>
        <Text style={styles.worldCreator}>Created by {item.creator}</Text>
        <Text style={styles.worldStories}>{item.storyCount} stories</Text>
      </View>
      <TouchableOpacity style={styles.exploreButton}>
        <Text style={styles.exploreButtonText}>Explore</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>World Wiki</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Worlds</Text>
        <LinearGradient
          colors={['#4D6FFF', '#3D57CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredWorld}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredName}>Mystical Islands</Text>
            <Text style={styles.featuredDescription}>
              A vast archipelago of floating islands with unique magic systems and creatures.
            </Text>
            <TouchableOpacity style={styles.featuredButton}>
              <Text style={styles.featuredButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredStats}>
            <Text style={styles.featuredStat}>42 stories</Text>
            <Text style={styles.featuredStat}>7 contributors</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.worldsContainer}>
        <Text style={styles.sectionTitle}>All Worlds</Text>
        <FlatList
          data={WORLDS}
          renderItem={renderWorldItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  featuredContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  featuredWorld: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  featuredContent: {
    marginBottom: 16,
  },
  featuredName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    lineHeight: 24,
  },
  featuredButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  featuredStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredStat: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  worldsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  worldCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  worldImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 12,
  },
  worldImage: {
    width: '100%',
    height: '100%',
  },
  worldInfo: {
    flex: 1,
  },
  worldName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  worldCreator: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  worldStories: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  exploreButton: {
    backgroundColor: '#222',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 