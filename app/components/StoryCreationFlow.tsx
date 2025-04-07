import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  ActivityIndicator,
  Platform,
  Switch,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StoryCreationFlowProps {
  onClose: () => void;
}

// Mock data for existing Sekais
const existingSekais = [
  { id: '1', name: 'Medieval Fantasy World', image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=200' },
  { id: '2', name: 'Cyberpunk City', image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?q=80&w=200' },
  { id: '3', name: 'Magical Academy', image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=200' },
];

export default function StoryCreationFlow({ onClose }: StoryCreationFlowProps) {
  const [storyType, setStoryType] = useState<string>('');
  const [plotPoints, setPlotPoints] = useState<string>('');
  const [previousChapter, setPreviousChapter] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [storyLength, setStoryLength] = useState<'medium' | 'long'>('medium');
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [chapterNumber, setChapterNumber] = useState<string>('1');
  const [episodeNumber, setEpisodeNumber] = useState<string>('1');
  const [isPublishModalVisible, setIsPublishModalVisible] = useState<boolean>(false);
  const [useExistingSekai, setUseExistingSekai] = useState<boolean>(false);
  const [selectedSekaiId, setSelectedSekaiId] = useState<string | null>(null);

  // AI Story Generator function
  const generateStoryWithAI = () => {
    setIsGenerating(true);
    
    // Simulate AI generation (would call actual API in production)
    setTimeout(() => {
      let sekaiContext = '';
      if (useExistingSekai && selectedSekaiId) {
        const sekai = existingSekais.find(s => s.id === selectedSekaiId);
        if (sekai) {
          sekaiContext = `In the world of ${sekai.name}, `;
        }
      }
      
      const baseText = `${sekaiContext}Once upon a time in a world of magic and wonder, a young hero embarked on a journey. ` +
        `${plotPoints ? `Their goal was clear: ${plotPoints}. ` : ''}` +
        `The path ahead was fraught with danger, but they were determined to succeed.\n\n` +
        `${previousChapter ? 'Continuing from the previous events, the hero now faced new challenges. ' : ''}` +
        `Dragons soared overhead as the mountains loomed in the distance. ` +
        `"I must reach the ancient temple before nightfall," the hero whispered, clutching their magical amulet tightly.\n\n` +
        `The villagers had warned about the cursed forest, but there was no other way. ` +
        `As darkness fell, strange sounds echoed through the trees. ` +
        `Was it just the wind, or something more sinister?`;
      
      // Add additional content if user requested a longer story
      const additionalContent = storyLength === 'long' ? 
        `\n\nThe hero's footsteps quickened as they navigated through the thick underbrush. Every shadow seemed to move with a life of its own, and the air grew colder with each passing minute. The ancient amulet began to glow faintly, casting an eerie blue light on the path ahead.\n\n"Stay calm," the hero muttered, more to themselves than anyone else. The stories told of creatures that fed on fear, entities that could sense the slightest tremor of doubt in one's heart.\n\nA twig snapped somewhere to the left. The hero froze, hand instinctively reaching for their sword. Silence fell over the forest again, but it was different now—expectant, like the forest itself was holding its breath.\n\nAnd then, from between the gnarled trunks of ancient trees, a figure emerged. Not the monster the hero had feared, but an old woman, her face weathered by time but her eyes sharp and knowing.\n\n"You seek the temple," she said. It wasn't a question.\n\nThe hero nodded, grip still tight on their weapon. "How did you know?"\n\nThe old woman smiled, revealing teeth too perfect for someone of her apparent age. "The amulet you carry has not been seen in these lands for a thousand years. Its return can mean only one thing." She gestured deeper into the forest. "Come. The path you seek cannot be found without a guide."` : '';
      
      const aiGeneratedText = baseText + additionalContent;
      
      setGeneratedStory(aiGeneratedText);
      setIsGenerating(false);
    }, 2000);
  };

  // Save story function
  const saveStory = () => {
    // Would save to database in production
    onClose();
  };

  // Publish story function
  const publishStory = () => {
    // Would publish to platform in production
    setIsPublishModalVisible(false);
    onClose();
  };

  // Toggle publish modal
  const togglePublishModal = () => {
    if (!isPublishModalVisible) {
      // Pre-populate title from story type if empty
      if (!storyTitle && storyType) {
        setStoryTitle(storyType);
      }
    }
    setIsPublishModalVisible(!isPublishModalVisible);
  };

  // Toggle between using existing Sekai or creating a new story
  const toggleUseExistingSekai = () => {
    setUseExistingSekai(!useExistingSekai);
    // Reset the selected Sekai when toggling off
    if (useExistingSekai) {
      setSelectedSekaiId(null);
    }
  };

  // Handle Sekai selection
  const handleSekaiSelection = (sekaiId: string) => {
    setSelectedSekaiId(sekaiId);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Story</Text>
          <View style={styles.placeholder} />
        </View>

        {/* AI Story Creation Form */}
        <View style={styles.formContainer}>
          {/* Option to use existing Sekai or create new story */}
          <View style={styles.sekaiOptionContainer}>
            <Text style={styles.inputLabel}>Story Setting</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                style={[styles.toggleOption, !useExistingSekai && styles.toggleOptionActive]} 
                onPress={() => setUseExistingSekai(false)}
              >
                <Text style={[styles.toggleOptionText, !useExistingSekai && styles.toggleOptionTextActive]}>
                  New Story Type
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleOption, useExistingSekai && styles.toggleOptionActive]} 
                onPress={() => setUseExistingSekai(true)}
              >
                <Text style={[styles.toggleOptionText, useExistingSekai && styles.toggleOptionTextActive]}>
                  Use Existing Sekai
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {useExistingSekai ? (
            <View style={styles.sekaiSelectionContainer}>
              <Text style={styles.sekaiSelectionLabel}>Select a Sekai</Text>
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
          ) : (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>What type of story do you want to create?</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Fantasy adventure, romance, sci-fi thriller, etc."
                placeholderTextColor="#666"
                value={storyType}
                onChangeText={setStoryType}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Key plot points or elements to include</Text>
            <View style={styles.inputWithButtonContainer}>
              <TextInput
                style={[styles.textAreaInput, {marginBottom: 0}]}
                multiline
                placeholder="Main character needs to defeat a dragon, find a lost artifact, reunite with long lost sibling, etc."
                placeholderTextColor="#666"
                value={plotPoints}
                onChangeText={setPlotPoints}
              />
              <TouchableOpacity 
                style={styles.aiHelpButton}
                onPress={() => {
                  // Simulate AI generating plot points
                  const aiSuggestions = [
                    "The protagonist discovers they have a rare magical ability",
                    "A forgotten prophecy about the protagonist is revealed",
                    "The protagonist must solve an ancient puzzle to unlock a hidden door",
                    "The antagonist is revealed to be the protagonist's long-lost relative",
                    "A trusted ally betrays the protagonist at a crucial moment"
                  ];
                  setPlotPoints(aiSuggestions.join("\n• "));
                }}
              >
                <Ionicons name="flash" size={16} color="#4BDFC3" />
                <Text style={styles.aiHelpButtonText}>AI Suggest</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Previous chapter or context (optional)</Text>
            <View style={styles.inputWithButtonContainer}>
              <TextInput
                style={[styles.textAreaInput, {marginBottom: 0}]}
                multiline
                placeholder="Paste your previous chapter or describe what happened before this part of the story."
                placeholderTextColor="#666"
                value={previousChapter}
                onChangeText={setPreviousChapter}
              />
              <TouchableOpacity 
                style={styles.aiHelpButton}
                onPress={() => {
                  // Simulate AI generating previous chapter summary
                  const prevChapterSummary = "In the previous chapter, our hero discovered a mysterious map in the abandoned library. After narrowly escaping a group of masked pursuers, they found refuge in a small village on the outskirts of the kingdom. There, an elderly shopkeeper recognized the symbols on the map and warned about the dangers that lay ahead. Despite the warnings, the hero decided to continue their journey, determined to uncover the truth about their heritage.";
                  setPreviousChapter(prevChapterSummary);
                }}
              >
                <Ionicons name="flash" size={16} color="#4BDFC3" />
                <Text style={styles.aiHelpButtonText}>AI Summarize</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.storyLengthContainer}>
            <Text style={styles.inputLabel}>Story Length</Text>
            <View style={styles.storyLengthOptions}>
              <TouchableOpacity 
                style={[
                  styles.lengthOption, 
                  storyLength === 'medium' && styles.lengthOptionSelected
                ]}
                onPress={() => setStoryLength('medium')}
              >
                <Text style={[
                  styles.lengthOptionText,
                  storyLength === 'medium' && styles.lengthOptionTextSelected
                ]}>Medium (~500 words)</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.lengthOption, 
                  storyLength === 'long' && styles.lengthOptionSelected
                ]}
                onPress={() => setStoryLength('long')}
              >
                <Text style={[
                  styles.lengthOptionText,
                  storyLength === 'long' && styles.lengthOptionTextSelected
                ]}>Long (~1000 words)</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[
              styles.generateButton,
              (!storyType && !useExistingSekai) || (useExistingSekai && !selectedSekaiId) ? styles.generateButtonDisabled : {}
            ]}
            onPress={generateStoryWithAI}
            disabled={isGenerating || (!storyType && !useExistingSekai) || (useExistingSekai && !selectedSekaiId)}
          >
            <Ionicons name="flash" size={20} color="black" style={{marginRight: 8}} />
            <Text style={styles.generateButtonText}>
              {isGenerating ? 'Generating Story...' : 'Generate Story with AI'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Generated Story Section */}
        {isGenerating ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4BDFC3" />
            <Text style={styles.loadingText}>Creating your story...</Text>
          </View>
        ) : generatedStory ? (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <TouchableOpacity style={styles.regenerateButton} onPress={generateStoryWithAI}>
                <Ionicons name="refresh" size={16} color="#4BDFC3" />
                <Text style={styles.regenerateText}>Regenerate</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.storyContainer}>
              <Text style={styles.storyText}>{generatedStory}</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom Buttons (only show if there's a generated story) */}
      {generatedStory && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveStory}>
            <Text style={styles.saveButtonText}>Save Draft</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.publishButton} onPress={togglePublishModal}>
            <Text style={styles.publishButtonText}>Publish Story</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Publish Modal */}
      {isPublishModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Publish Your Story</Text>
            
            <View style={styles.modalInputGroup}>
              <Text style={styles.modalInputLabel}>Title</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Enter a title for your story"
                placeholderTextColor="#666"
                value={storyTitle}
                onChangeText={setStoryTitle}
              />
            </View>
            
            <View style={styles.rowInputs}>
              <View style={[styles.modalInputGroup, {flex: 1, marginRight: 8}]}>
                <Text style={styles.modalInputLabel}>Chapter</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="1"
                  placeholderTextColor="#666"
                  value={chapterNumber}
                  onChangeText={setChapterNumber}
                  keyboardType="number-pad"
                />
              </View>
              
              <View style={[styles.modalInputGroup, {flex: 1, marginLeft: 8}]}>
                <Text style={styles.modalInputLabel}>Episode</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="1"
                  placeholderTextColor="#666"
                  value={episodeNumber}
                  onChangeText={setEpisodeNumber}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton} 
                onPress={togglePublishModal}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalPublishButton} 
                onPress={publishStory}
                disabled={!storyTitle}
              >
                <Text style={styles.modalPublishButtonText}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  formContainer: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
  },
  sekaiOptionContainer: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 2,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleOptionActive: {
    backgroundColor: '#4BDFC3',
  },
  toggleOptionText: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toggleOptionTextActive: {
    color: 'black',
  },
  sekaiSelectionContainer: {
    marginBottom: 20,
  },
  sekaiSelectionLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
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
    marginBottom: 10,
    padding: 8,
    alignItems: 'center',
    position: 'relative',
  },
  sekaiItemSelected: {
    borderWidth: 2,
    borderColor: '#4BDFC3',
  },
  sekaiImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 14,
    color: 'white',
    fontSize: 16,
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
  storyLengthContainer: {
    marginBottom: 20,
  },
  storyLengthOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lengthOption: {
    flex: 1,
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  lengthOptionSelected: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
    borderWidth: 1,
    borderColor: '#4BDFC3',
  },
  lengthOptionText: {
    color: '#AAA',
    fontSize: 14,
  },
  lengthOptionTextSelected: {
    color: '#4BDFC3',
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#4BDFC3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  generateButtonDisabled: {
    backgroundColor: '#2a7c6b',
    opacity: 0.7,
  },
  generateButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 40,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
  },
  resultContainer: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  regenerateText: {
    color: '#4BDFC3',
    marginLeft: 4,
    fontSize: 14,
  },
  storyContainer: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
  },
  storyText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  bottomButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#333',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  publishButton: {
    backgroundColor: '#4BDFC3',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  publishButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 500,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInputGroup: {
    marginBottom: 16,
  },
  modalInputLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  modalTextInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  modalCancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalPublishButton: {
    flex: 1,
    backgroundColor: '#4BDFC3',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  modalPublishButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWithButtonContainer: {
    position: 'relative',
  },
  aiHelpButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  aiHelpButtonText: {
    color: '#4BDFC3',
    marginLeft: 4,
    fontSize: 12,
  },
}); 