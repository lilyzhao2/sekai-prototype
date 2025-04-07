import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Dimensions,
  Animated,
  Easing,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface CreateMenuProps {
  visible: boolean;
  onClose: () => void;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        })
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);
  
  const handleCreateSekai = () => {
    onClose();
    // Navigate to create sekai screen
    console.log('Create Sekai');
  };
  
  const handleCreateCharacter = () => {
    onClose();
    // Navigate to create character screen
    console.log('Create Character');
  };
  
  const handleCreateStory = () => {
    onClose();
    // Navigate to create story screen
    console.log('Create Story');
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.fullscreenContainer}>
          {/* Main option - Create Sekai */}
          <TouchableOpacity 
            style={styles.mainOptionCard}
            onPress={handleCreateSekai}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#30E3CA', '#8BE3EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainOptionGradient}
            >
              <View style={styles.optionContent}>
                <Text style={styles.mainOptionText}>Create Sekai</Text>
                <Ionicons name="pencil" size={24} color="#000" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Small options row */}
          <View style={styles.smallOptionsRow}>
            <TouchableOpacity 
              style={styles.smallOptionCard}
              onPress={handleCreateCharacter}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#30E3CA', '#2FCBCA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.smallOptionGradient}
              >
                <View style={styles.smallOptionContent}>
                  <Text style={styles.smallOptionText}>Create character</Text>
                  <Ionicons name="person" size={24} color="#000" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.smallOptionCard}
              onPress={handleCreateStory}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#FFD166', '#FFC233']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.smallOptionGradient}
              >
                <View style={styles.smallOptionContent}>
                  <Text style={styles.smallOptionText}>Create Story</Text>
                  <Ionicons name="book" size={24} color="#000" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          {/* Close button at bottom */}
          <TouchableOpacity 
            style={styles.closeButtonContainer}
            onPress={onClose}
          >
            <View style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullscreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 80, // Space for the bottom buttons
  },
  mainOptionCard: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  mainOptionGradient: {
    flex: 1,
    padding: 16,
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainOptionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
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
  closeButtonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default CreateMenu; 