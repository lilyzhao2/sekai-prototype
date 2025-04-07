import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Platform, StatusBar, ImageBackground } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Updated worlds data with better image URLs
const WORLDS = [
  {
    id: '1',
    name: 'Fantasy Realm',
    creator: 'WorldBuilder',
    image: 'https://wallpaperaccess.com/full/1103825.jpg',
    storyCount: 24,
  },
  {
    id: '2',
    name: 'Sci-Fi Universe',
    creator: 'SpaceCreator',
    image: 'https://wallpaperaccess.com/full/1223408.jpg',
    storyCount: 18,
  },
  {
    id: '3',
    name: 'Medieval Kingdom',
    creator: 'HistoryBuff',
    image: 'https://wallpaperaccess.com/full/167243.jpg',
    storyCount: 32,
  },
  {
    id: '4',
    name: 'Cyberpunk City',
    creator: 'NeonDreamer',
    image: 'https://wallpaperaccess.com/full/1264158.jpg',
    storyCount: 15,
  },
  {
    id: '5',
    name: 'Underwater Civilization',
    creator: 'OceanExplorer',
    image: 'https://wallpaperaccess.com/full/201655.jpg',
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
  const insets = useSafeAreaInsets();
  
  const renderWorldItem = ({ item }: { item: World }) => (
    <TouchableOpacity style={styles.worldCard}>
      <Image source={{ uri: item.image }} style={styles.worldImage} />
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background visual element */}
      <Image 
        source={{ uri: 'https://i.pinimg.com/originals/b2/00/58/b200580630345efcb8c2fb222a910c9e.jpg' }} 
        style={styles.backgroundDecoration}
        blurRadius={8}
      />
      
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#000' }}>
        <View style={styles.header}>
          <Text style={styles.title}>World Wiki</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      <SafeAreaView style={styles.safeContainer} edges={['bottom']}>
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured Worlds</Text>
          <ImageBackground
            source={{ uri: 'https://wallpaperaccess.com/full/3218576.jpg' }}
            style={styles.featuredWorld}
            imageStyle={styles.featuredWorldImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
              style={styles.featuredGradient}
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
          </ImageBackground>
        </View>
        
        {/* Categories of worlds */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryItem}>
              <ImageBackground 
                source={{ uri: 'https://wallpaperaccess.com/full/2825704.jpg' }}
                style={styles.categoryImage}
                imageStyle={styles.categoryImageStyle}
              >
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryText}>Fantasy</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <ImageBackground 
                source={{ uri: 'https://wallpaperaccess.com/full/982923.jpg' }}
                style={styles.categoryImage}
                imageStyle={styles.categoryImageStyle}
              >
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryText}>Sci-Fi</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <ImageBackground 
                source={{ uri: 'https://wallpaperaccess.com/full/1433763.jpg' }}
                style={styles.categoryImage}
                imageStyle={styles.categoryImageStyle}
              >
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryText}>Romance</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <ImageBackground 
                source={{ uri: 'https://wallpaperaccess.com/full/1309191.jpg' }}
                style={styles.categoryImage}
                imageStyle={styles.categoryImageStyle}
              >
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryText}>Horror</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 300,
    height: 300,
    opacity: 0.2,
  },
  safeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 24,
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
  featuredContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  featuredWorld: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredWorldImage: {
    borderRadius: 16,
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end',
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    aspectRatio: 1.5,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryImageStyle: {
    borderRadius: 12,
  },
  categoryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
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