import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CreateTab() {
  const router = useRouter();
  
  // Function to handle navigation to AI template flows
  const navigateToTemplateFlow = (type: 'sekai' | 'story' | 'roleplay') => {
    // Navigate to the appropriate creation flow based on type
    if (type === 'sekai') {
      router.push({
        pathname: '/story-reader',
        params: { mode: 'create-sekai' }
      });
    } else if (type === 'story') {
      router.push({
        pathname: '/story-reader',
        params: { mode: 'create-story' }
      });
    } else if (type === 'roleplay') {
      router.push({
        pathname: '/story-reader',
        params: { mode: 'create-roleplay' }
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#111', '#000']}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Create Sekai Button */}
            <TouchableOpacity
              style={styles.mainOptionCard}
              onPress={() => navigateToTemplateFlow('sekai')}
            >
              <LinearGradient
                colors={['#4BDFC3', '#2A7C6B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mainOptionGradient}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.mainOptionTitle}>Create Sekai</Text>
                  <Text style={styles.mainOptionDescription}>
                    Build an immersive world with characters, locations, and storylines
                  </Text>
                </View>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="planet-outline" size={44} color="#000" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Create Story Button */}
            <TouchableOpacity
              style={styles.mainOptionCard}
              onPress={() => navigateToTemplateFlow('story')}
            >
              <LinearGradient
                colors={['#FFD166', '#FFB800']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mainOptionGradient}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.mainOptionTitle}>Create Story</Text>
                  <Text style={styles.mainOptionDescription}>
                    Write a complete narrative with chapters, characters, and plot
                  </Text>
                </View>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="book-outline" size={44} color="#000" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Create Roleplay Button */}
            <TouchableOpacity
              style={styles.mainOptionCard}
              onPress={() => navigateToTemplateFlow('roleplay')}
            >
              <LinearGradient
                colors={['#FF5E87', '#FF2D6A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mainOptionGradient}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.mainOptionTitle}>Create Roleplay</Text>
                  <Text style={styles.mainOptionDescription}>
                    Design interactive conversations with AI-powered characters
                  </Text>
                </View>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="chatbubbles-outline" size={44} color="#000" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  mainOptionCard: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  mainOptionGradient: {
    flex: 1,
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-between',
  },
  optionContent: {
    flex: 1,
    justifyContent: 'center',
  },
  mainOptionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  mainOptionDescription: {
    fontSize: 16,
    color: '#000',
    opacity: 0.9,
    width: '90%',
    lineHeight: 22,
  },
  optionIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
}); 