import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#222', '#000']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionCard}>
              <LinearGradient
                colors={['#30E3CA', '#8BE3EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.optionGradient}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionText}>Create Sekai</Text>
                  <Image 
                    source={{ uri: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-512.png' }} 
                    style={styles.optionIcon} 
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.smallOptionsRow}>
              <TouchableOpacity style={styles.smallOptionCard}>
                <LinearGradient
                  colors={['#30E3CA', '#2FCBCA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.smallOptionGradient}
                >
                  <View style={styles.smallOptionContent}>
                    <Text style={styles.smallOptionText}>Create character</Text>
                    <Ionicons name="person-sharp" size={24} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.smallOptionCard}>
                <LinearGradient
                  colors={['#FFD166', '#FFC233']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.smallOptionGradient}
                >
                  <View style={styles.smallOptionContent}>
                    <Text style={styles.smallOptionText}>Create Story</Text>
                    <Ionicons name="book" size={24} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
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
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    position: 'relative',
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  optionCard: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  optionGradient: {
    flex: 1,
    padding: 16,
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  optionIcon: {
    width: 32,
    height: 32,
    tintColor: '#000',
  },
  smallOptionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  smallOptionCard: {
    flex: 1,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
  },
  smallOptionGradient: {
    flex: 1,
    padding: 16,
  },
  smallOptionContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  smallOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
}); 