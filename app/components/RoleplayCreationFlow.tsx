import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Image,
  Platform,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface RoleplayCreationFlowProps {
  onClose: () => void;
}

// Mock data for existing Sekais
const existingSekais = [
  { id: '1', name: 'Medieval Fantasy World', image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=200' },
  { id: '2', name: 'Cyberpunk City', image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?q=80&w=200' },
  { id: '3', name: 'Magical Academy', image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=200' },
  { id: '4', name: 'Dystopian Future', image: 'https://images.unsplash.com/photo-1542293787-a471e74dfed0?q=80&w=200' },
  { id: '5', name: 'Space Colony', image: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=200' },
  { id: '6', name: 'Ancient Empire', image: 'https://images.unsplash.com/photo-1566331126222-48f33994dce5?q=80&w=200' },
];

export default function RoleplayCreationFlow({ onClose }: RoleplayCreationFlowProps) {
  const [characterName, setCharacterName] = useState<string>('');
  const [characterDescription, setCharacterDescription] = useState<string>('');
  const [expressions, setExpressions] = useState<number>(0);
  const [avatarUploaded, setAvatarUploaded] = useState<boolean>(false);
  const [selectedSekaiId, setSelectedSekaiId] = useState<string | null>(null);
  const [isMultiplayerMode, setIsMultiplayerMode] = useState<boolean>(false);
  const [plotPoints, setPlotPoints] = useState<string>('');
  const [openingDialogue, setOpeningDialogue] = useState<string>('');
  const [audienceSettings, setAudienceSettings] = useState<'public' | 'private'>('public');
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState<boolean>(false);

  // Handle Sekai selection
  const handleSekaiSelection = (sekaiId: string) => {
    setSelectedSekaiId(sekaiId);
  };

  // Add avatar functionality
  const handleAddAvatar = () => {
    // In a real app, this would open an image picker
    console.log('Add avatar');
    setAvatarUploaded(true);
  };

  // Generate AI avatar functionality
  const handleGenerateAIAvatar = () => {
    setIsGeneratingAvatar(true);
    
    // Simulate AI avatar generation
    setTimeout(() => {
      setAvatarUploaded(true);
      setIsGeneratingAvatar(false);
    }, 2000);
  };

  // Select voice functionality
  const handleSelectVoice = () => {
    // In a real app, this would open a voice selector
    console.log('Select voice');
  };

  // Generate plot points with AI
  const handleGeneratePlotPoints = () => {
    const aiSuggestions = [
      "A mysterious stranger arrives at the village with a dire warning",
      "An ancient artifact has been uncovered that threatens to unleash chaos",
      "The character discovers they have hidden powers that mark them as special",
      "The kingdom's royal family has been secretly infiltrated by shapeshifters",
      "A powerful curse is spreading throughout the land, turning people to stone"
    ];
    setPlotPoints(aiSuggestions.join("\n• "));
  };

  // Generate opening dialogue with AI
  const handleGenerateOpeningDialogue = () => {
    const selectedSekai = existingSekais.find(s => s.id === selectedSekaiId);
    const sekaiName = selectedSekai ? selectedSekai.name : "the world";
    
    setOpeningDialogue(`*The sun casts long shadows across ${sekaiName} as ${characterName || 'your character'} approaches the town square*\n\n"I've been waiting for this moment for a long time," ${characterName || 'your character'} whispers, clutching the ancient amulet tightly. "Today, everything changes."`);
  };

  // Generate AI name functionality
  const handleGenerateAIName = () => {
    const selectedSekai = existingSekais.find(s => s.id === selectedSekaiId);
    let generatedName = "";
    
    // Generate name based on the selected Sekai world
    if (selectedSekai) {
      switch(selectedSekai.id) {
        case '1': // Medieval Fantasy
          generatedName = ['Eldric Stormhaven', 'Lyra Dawnwood', 'Thorne Ironshield', 'Seraphina Nightfall', 'Rowan Oakenhart'][Math.floor(Math.random() * 5)];
          break;
        case '2': // Cyberpunk
          generatedName = ['Nyx-7', 'Raven Blackwire', 'Zero Flux', 'Echo Valencia', 'Vex Chrome'][Math.floor(Math.random() * 5)];
          break;
        case '3': // Magical Academy
          generatedName = ['Elias Wintermoon', 'Astrid Spellweaver', 'Orion Flamecaster', 'Selene Runemark', 'Thaddeus Grimtome'][Math.floor(Math.random() * 5)];
          break;
        case '4': // Dystopian Future
          generatedName = ['Ash Nomad', 'Nova Survivor', 'Cipher Wright', 'Echo Vesper', 'Reed Lawless'][Math.floor(Math.random() * 5)];
          break;
        case '5': // Space Colony
          generatedName = ['Orion Starshield', 'Nova Eclipse', 'Atlas Nebula', 'Ceres Voidwalker', 'Zenith Comet'][Math.floor(Math.random() * 5)];
          break;
        case '6': // Ancient Empire
          generatedName = ['Marcus Aurelius', 'Livia Augusta', 'Cassius Severus', 'Helena Valeria', 'Octavian Gaius'][Math.floor(Math.random() * 5)];
          break;
        default:
          generatedName = ['Aria', 'Kai', 'Nova', 'Zephyr', 'Sage'][Math.floor(Math.random() * 5)];
      }
    } else {
      // Generic names if no Sekai selected
      generatedName = ['Aria', 'Kai', 'Nova', 'Zephyr', 'Sage'][Math.floor(Math.random() * 5)];
    }
    
    setCharacterName(generatedName);
  };

  // Create character functionality
  const handleCreate = () => {
    // In a real app, this would create the character and navigate to the next step
    console.log('Create character');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Roleplay</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Sekai Selection Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choose a Sekai</Text>
          <Text style={styles.sectionDescription}>
            Select the world where your roleplay will take place
          </Text>

          <View style={styles.sekaiGrid}>
            {existingSekais.map((sekai) => (
              <TouchableOpacity 
                key={sekai.id}
                style={[
                  styles.sekaiItem,
                  selectedSekaiId === sekai.id && styles.sekaiItemSelected
                ]}
                onPress={() => handleSekaiSelection(sekai.id)}
              >
                <Image 
                  source={{ uri: sekai.image }} 
                  style={styles.sekaiImage} 
                />
                <Text style={styles.sekaiName} numberOfLines={2}>{sekai.name}</Text>
                {selectedSekaiId === sekai.id && (
                  <View style={styles.sekaiSelectedIcon}>
                    <Ionicons name="checkmark-circle" size={24} color="#4BDFC3" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Gameplay Mode Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gameplay Mode</Text>
          
          <View style={styles.modeSelector}>
            <View style={styles.modeInfo}>
              <Text style={styles.modeTitle}>Multiplayer Mode</Text>
              <Text style={styles.modeDescription}>
                Allow other players to join your roleplay
              </Text>
            </View>
            
            <Switch
              value={isMultiplayerMode}
              onValueChange={setIsMultiplayerMode}
              trackColor={{ false: '#333', true: 'rgba(75, 223, 195, 0.5)' }}
              thumbColor={isMultiplayerMode ? '#4BDFC3' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Plot Points Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWithButton}>
            <Text style={styles.sectionTitle}>Plot Points</Text>
            <TouchableOpacity 
              style={styles.aiGenerateButton}
              onPress={handleGeneratePlotPoints}
            >
              <Ionicons name="flash" size={16} color="#4BDFC3" />
              <Text style={styles.aiGenerateText}>AI Generate</Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.textAreaInput}
            multiline
            placeholder="What's the main plot of your roleplay? List key events or themes."
            placeholderTextColor="#666"
            value={plotPoints}
            onChangeText={setPlotPoints}
          />
        </View>

        {/* Opening Dialogue Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWithButton}>
            <Text style={styles.sectionTitle}>Opening Dialogue</Text>
            <TouchableOpacity 
              style={styles.aiGenerateButton}
              onPress={handleGenerateOpeningDialogue}
            >
              <Ionicons name="flash" size={16} color="#4BDFC3" />
              <Text style={styles.aiGenerateText}>AI Generate</Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.textAreaInput}
            multiline
            placeholder="Write the opening scene or dialogue for your roleplay."
            placeholderTextColor="#666"
            value={openingDialogue}
            onChangeText={setOpeningDialogue}
          />
        </View>

        {/* Audience Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Audience Settings</Text>
          
          <View style={styles.audienceOptions}>
            <TouchableOpacity 
              style={[
                styles.audienceOption, 
                audienceSettings === 'public' && styles.audienceOptionSelected
              ]}
              onPress={() => setAudienceSettings('public')}
            >
              <Ionicons 
                name="globe-outline" 
                size={24} 
                color={audienceSettings === 'public' ? "#4BDFC3" : "white"} 
              />
              <Text style={[
                styles.audienceOptionText,
                audienceSettings === 'public' && styles.audienceOptionTextSelected
              ]}>
                Public
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.audienceOption, 
                audienceSettings === 'private' && styles.audienceOptionSelected
              ]}
              onPress={() => setAudienceSettings('private')}
            >
              <Ionicons 
                name="lock-closed-outline" 
                size={24} 
                color={audienceSettings === 'private' ? "#4BDFC3" : "white"} 
              />
              <Text style={[
                styles.audienceOptionText,
                audienceSettings === 'private' && styles.audienceOptionTextSelected
              ]}>
                Private
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Expression & Action Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Character Avatar</Text>
            <View style={styles.infoButton}>
              <Ionicons name="information-circle-outline" size={20} color="#888" />
            </View>
            <Text style={styles.expressionCount}>{expressions}/9</Text>
          </View>

          <View style={styles.avatarOptions}>
            <TouchableOpacity 
              style={styles.addAvatarContainer}
              onPress={handleAddAvatar}
            >
              {avatarUploaded ? (
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="add" size={40} color="#FFF" />
                  <Text style={styles.addAvatarText}>Upload Avatar</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.aiAvatarButton}
              onPress={handleGenerateAIAvatar}
              disabled={isGeneratingAvatar}
            >
              {isGeneratingAvatar ? (
                <Text style={styles.aiAvatarButtonText}>Generating...</Text>
              ) : (
                <>
                  <Ionicons name="flash" size={20} color="#4BDFC3" style={{marginRight: 8}} />
                  <Text style={styles.aiAvatarButtonText}>Generate with AI</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Voice Section */}
        <TouchableOpacity 
          style={styles.sectionContainer}
          onPress={handleSelectVoice}
        >
          <View style={styles.voiceSelector}>
            <Text style={styles.voiceSelectorTitle}>Voice</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
        </TouchableOpacity>

        {/* Character Profile Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.profileHeader}>
            <Ionicons name="star-outline" size={20} color="white" style={{marginRight: 8}} />
            <Text style={styles.profileHeaderTitle}>Character's Profile</Text>
          </View>

          {/* Name Field with AI Generation */}
          <View style={styles.formGroup}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.formLabel}>Name <Text style={styles.requiredAsterisk}>*</Text></Text>
              <TouchableOpacity
                style={styles.aiDescriptionButton}
                onPress={handleGenerateAIName}
              >
                <Ionicons name="flash" size={14} color="#4BDFC3" />
                <Text style={styles.aiDescriptionText}>AI Generate</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Type character's name"
              placeholderTextColor="#666"
              value={characterName}
              onChangeText={setCharacterName}
            />
          </View>

          {/* Description Field */}
          <View style={styles.formGroup}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.formLabel}>Description</Text>
              <TouchableOpacity
                style={styles.aiDescriptionButton}
                onPress={() => {
                  // Generate character description
                  const selectedSekai = existingSekais.find(s => s.id === selectedSekaiId);
                  const sekaiType = selectedSekai ? selectedSekai.name : "this world";
                  
                  setCharacterDescription(`A mysterious traveler from the outer reaches of ${sekaiType}. Known for their quick wit and resourcefulness, they carry an ancient artifact of unknown origin. Their past is shrouded in mystery, but rumors speak of noble blood and a destiny unfulfilled. Their unique abilities with elemental magic have saved them from countless dangerous situations.`);
                }}
              >
                <Ionicons name="flash" size={14} color="#4BDFC3" />
                <Text style={styles.aiDescriptionText}>AI Generate</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textAreaInput}
              multiline
              placeholder="Describe your character for an enriched persona. You can include their background, appearance, personality, and so on."
              placeholderTextColor="#666"
              value={characterDescription}
              onChangeText={setCharacterDescription}
            />
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.createButton,
            (!characterName || !selectedSekaiId) && styles.disabledButton
          ]}
          onPress={handleCreate}
          disabled={!characterName || !selectedSekaiId}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  sectionContainer: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionDescription: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 15,
  },
  sekaiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sekaiItem: {
    width: '31%',
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
    alignItems: 'center',
    position: 'relative',
  },
  sekaiItemSelected: {
    borderWidth: 2,
    borderColor: '#4BDFC3',
  },
  sekaiImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  sekaiName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  sekaiSelectedIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modeDescription: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 4,
  },
  sectionHeaderWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiGenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  aiGenerateText: {
    color: '#4BDFC3',
    marginLeft: 6,
    fontSize: 14,
  },
  textAreaInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 14,
    color: 'white',
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  audienceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  audienceOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#222',
    marginHorizontal: 5,
  },
  audienceOptionSelected: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
    borderWidth: 1,
    borderColor: '#4BDFC3',
  },
  audienceOptionText: {
    color: 'white',
    marginTop: 6,
    fontWeight: 'bold',
  },
  audienceOptionTextSelected: {
    color: '#4BDFC3',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoButton: {
    marginRight: 8,
  },
  expressionCount: {
    color: '#999',
    fontSize: 16,
  },
  avatarOptions: {
    alignItems: 'center',
  },
  addAvatarContainer: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAvatarText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  aiAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  aiAvatarButtonText: {
    color: '#4BDFC3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voiceSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voiceSelectorTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requiredAsterisk: {
    color: '#4BDFC3',
  },
  textInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 14,
    color: 'white',
    fontSize: 16,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiDescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  aiDescriptionText: {
    color: '#4BDFC3',
    marginLeft: 4,
    fontSize: 12,
  },
  bottomButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  createButton: {
    backgroundColor: '#4BDFC3',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(75, 223, 195, 0.5)',
  },
  createButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 