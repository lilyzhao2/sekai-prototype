import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform, Dimensions, ScrollView, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Define templates for different story types
const STORY_TEMPLATES = [
  {
    id: 'romance',
    title: 'Romance',
    description: 'Love stories focused on relationships and emotional connections',
    icon: 'heart-outline' as const,
    color: ['#FF5E87', '#FF8DA0'] as const,
    examples: ['Fated Lovers', 'Forbidden Romance', 'Second Chance Love']
  },
  {
    id: 'adventure',
    title: 'Adventure',
    description: 'Action-packed journeys with challenges and discoveries',
    icon: 'compass-outline' as const,
    color: ['#4BDFC3', '#8BE3EB'] as const,
    examples: ['Epic Quest', 'Treasure Hunter', 'Monster Slayer']
  },
  {
    id: 'fantasy',
    title: 'Fantasy',
    description: 'Magical worlds with supernatural elements and beings',
    icon: 'cube-outline' as const,
    color: ['#9966FF', '#B591FF'] as const,
    examples: ['Wizard Academy', 'Dragon Kingdom', 'Mythical Creatures']
  },
  {
    id: 'scifi',
    title: 'Sci-Fi',
    description: 'Futuristic settings with advanced technology and space exploration',
    icon: 'planet-outline' as const,
    color: ['#3D7CF9', '#75A2F9'] as const,
    examples: ['Space Colony', 'AI Revolution', 'Time Travel']
  },
  {
    id: 'mystery',
    title: 'Mystery',
    description: 'Intriguing cases to solve with clues and twists',
    icon: 'search-outline' as const,
    color: ['#FFD166', '#FFDC8A'] as const,
    examples: ['Detective Story', 'Unsolved Case', 'Conspiracy']
  },
  {
    id: 'horror',
    title: 'Horror',
    description: 'Frightening tales designed to scare and disturb',
    icon: 'skull-outline' as const,
    color: ['#6E1C35', '#A93156'] as const,
    examples: ['Haunted House', 'Supernatural Entity', 'Psychological Horror']
  },
];

// Creation steps for "Create Sekai" flow
enum CreationStep {
  MAIN_MENU,
  SELECT_TEMPLATE,
  DEFINE_WORLD,
  CREATE_CHARACTERS,
  STORY_OUTLINE,
  FINALIZE
}

export default function CreateTab() {
  const navigation = useNavigation();
  const [creationStep, setCreationStep] = useState<CreationStep>(CreationStep.MAIN_MENU);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [worldName, setWorldName] = useState('');
  const [worldDescription, setWorldDescription] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  
  // Handle close button press
  const handleClose = () => {
    if (creationStep === CreationStep.MAIN_MENU) {
      navigation.goBack();
    } else {
      // Go back to previous step or main menu
      setCreationStep(creationStep === CreationStep.SELECT_TEMPLATE 
        ? CreationStep.MAIN_MENU 
        : creationStep - 1);
    }
  };
  
  // Start creation flow for a specific type
  const startCreation = (type: 'sekai' | 'character' | 'story') => {
    if (type === 'sekai') {
      setCreationStep(CreationStep.SELECT_TEMPLATE);
    }
    // Other types would have their own flows
  };
  
  // Select a template and move to next step
  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCreationStep(CreationStep.DEFINE_WORLD);
  };
  
  // Generate AI suggestion for world building
  const generateAiSuggestion = () => {
    setIsGeneratingSuggestion(true);
    
    // Simulate AI generation (would be an API call in real app)
    setTimeout(() => {
      const template = STORY_TEMPLATES.find(t => t.id === selectedTemplate);
      
      if (template) {
        setAiSuggestion(
          `Here's a concept for your ${template.title} world:\n\n` +
          `"A realm where ${Math.random() > 0.5 ? 'magic' : 'technology'} dictates the rules of society, ` +
          `and where individuals with special abilities must navigate complex social structures. ` +
          `The world is divided into ${Math.floor(Math.random() * 5) + 3} distinct regions, each with ` +
          `their own customs and belief systems. The main conflict centers around a ` +
          `${Math.random() > 0.5 ? 'prophecy' : 'forbidden knowledge'} that threatens to ` +
          `${Math.random() > 0.5 ? 'unite' : 'destroy'} these fragmented societies."`
        );
      }
      
      setIsGeneratingSuggestion(false);
    }, 2000);
  };
  
  // Move to next step in creation flow
  const goToNextStep = () => {
    setCreationStep(creationStep + 1);
  };
  
  // Render template selection screen
  const renderTemplateSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select a Template</Text>
      <Text style={styles.stepDescription}>
        Choose a genre to start building your world. Each template comes with 
        pre-defined elements to help you get started quickly.
      </Text>
      
      <FlatList
        data={STORY_TEMPLATES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.templateGrid}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.templateCard}
            onPress={() => selectTemplate(item.id)}
          >
            <LinearGradient
              colors={item.color}
              style={styles.templateCardGradient}
            >
              <Ionicons name={item.icon} size={32} color="#FFF" />
              <Text style={styles.templateTitle}>{item.title}</Text>
              <Text style={styles.templateDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity 
        style={styles.navigationButton}
        onPress={handleClose}
      >
        <Text style={styles.navigationButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
  
  // Render world definition screen
  const renderWorldDefinition = () => {
    const template = STORY_TEMPLATES.find(t => t.id === selectedTemplate);
    
    return (
      <ScrollView style={styles.stepContainer} contentContainerStyle={{paddingBottom: 40}}>
        <Text style={styles.stepTitle}>Define Your World</Text>
        <Text style={styles.stepDescription}>
          Build the foundation of your {template?.title.toLowerCase()} world by giving it a name and description.
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>World Name</Text>
          <TextInput
            style={styles.textInput}
            value={worldName}
            onChangeText={setWorldName}
            placeholder="Enter a name for your world..."
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>World Description</Text>
          <TextInput
            style={[styles.textInput, styles.textAreaInput]}
            value={worldDescription}
            onChangeText={setWorldDescription}
            placeholder="Describe your world, its rules, and what makes it special..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.aiAssistContainer}>
          <View style={styles.aiAssistHeader}>
            <Ionicons name="sparkles" size={20} color="#4BDFC3" />
            <Text style={styles.aiAssistTitle}>AI Writing Assistant</Text>
          </View>
          
          {aiSuggestion ? (
            <View style={styles.aiSuggestionContainer}>
              <Text style={styles.aiSuggestionText}>{aiSuggestion}</Text>
              <View style={styles.aiButtonsRow}>
                <TouchableOpacity style={styles.aiActionButton}>
                  <Text style={styles.aiActionButtonText}>Use This</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.aiActionButton, styles.secondaryButton]}
                  onPress={() => setAiSuggestion('')}
                >
                  <Text style={[styles.aiActionButtonText, styles.secondaryButtonText]}>
                    Discard
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.aiGenerateButton, isGeneratingSuggestion && styles.disabledButton]}
              onPress={generateAiSuggestion}
              disabled={isGeneratingSuggestion}
            >
              {isGeneratingSuggestion ? (
                <Text style={styles.aiGenerateButtonText}>Generating...</Text>
              ) : (
                <>
                  <Ionicons name="bulb-outline" size={18} color="#FFF" />
                  <Text style={styles.aiGenerateButtonText}>
                    Generate World Concept
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.sampleContainer}>
          <Text style={styles.sampleTitle}>Starter Ideas</Text>
          {template?.examples.map((example, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.sampleChip}
              onPress={() => setWorldName(example)}
            >
              <Text style={styles.sampleChipText}>{example}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.navigationRow}>
          <TouchableOpacity 
            style={[styles.navigationButton, styles.secondaryButton]}
            onPress={handleClose}
          >
            <Text style={[styles.navigationButtonText, styles.secondaryButtonText]}>
              Back
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.navigationButton, 
              (!worldName || !worldDescription) && styles.disabledButton
            ]}
            onPress={goToNextStep}
            disabled={!worldName || !worldDescription}
          >
            <Text style={styles.navigationButtonText}>Next: Characters</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  // Render character creation or other steps
  const renderCharacterCreation = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Create Characters</Text>
      <Text style={styles.stepDescription}>
        Bring your world to life by creating characters that inhabit it.
      </Text>
      
      <Image 
        source={{ uri: 'https://placehold.co/400x200/333/white?text=Character+Design+Interface' }}
        style={styles.placeholderImage}
      />
      
      <View style={styles.navigationRow}>
        <TouchableOpacity 
          style={[styles.navigationButton, styles.secondaryButton]}
          onPress={handleClose}
        >
          <Text style={[styles.navigationButtonText, styles.secondaryButtonText]}>
            Back
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navigationButton}
          onPress={goToNextStep}
        >
          <Text style={styles.navigationButtonText}>Next: Story Outline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  // Main render method based on current step
  const renderCurrentStep = () => {
    switch (creationStep) {
      case CreationStep.MAIN_MENU:
        return (
          <View style={styles.content}>
            {/* Main option - Create Sekai */}
            <TouchableOpacity 
              style={styles.mainOptionCard}
              onPress={() => startCreation('sekai')}
            >
              <LinearGradient
                colors={['#4BDFC3', '#9EEAEE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.mainOptionGradient}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.mainOptionText}>Create Sekai</Text>
                  <TouchableOpacity style={styles.editIcon}>
                    <Ionicons name="pencil" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Small options row */}
            <View style={styles.smallOptionsRow}>
              <TouchableOpacity 
                style={styles.smallOptionCard}
                onPress={() => startCreation('character')}
              >
                <LinearGradient
                  colors={['#4BDFC3', '#4BDFC3']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.smallOptionGradient}
                >
                  <View style={styles.smallOptionContent}>
                    <Text style={styles.smallOptionText}>Create{"\n"}character</Text>
                    <View style={styles.smallOptionIconContainer}>
                      <Ionicons name="person-outline" size={28} color="#fff" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.smallOptionCard}
                onPress={() => startCreation('story')}
              >
                <LinearGradient
                  colors={['#FFD166', '#FFD166']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.smallOptionGradient}
                >
                  <View style={styles.smallOptionContent}>
                    <Text style={styles.smallOptionText}>Create Story</Text>
                    <View style={styles.smallOptionIconContainer}>
                      <Ionicons name="book-outline" size={28} color="#fff" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            {/* Creation Flow Guide */}
            <View style={styles.flowGuideContainer}>
              <Text style={styles.flowGuideTitle}>Step-by-Step Creation Process</Text>
              <View style={styles.flowStepsList}>
                <View style={styles.flowStep}>
                  <View style={styles.flowStepNumber}>
                    <Text style={styles.flowStepNumberText}>1</Text>
                  </View>
                  <View style={styles.flowStepContent}>
                    <Text style={styles.flowStepTitle}>Choose a Template</Text>
                    <Text style={styles.flowStepDescription}>
                      Select from various genres to start your creation
                    </Text>
                  </View>
                </View>
                
                <View style={styles.flowStepConnector} />
                
                <View style={styles.flowStep}>
                  <View style={styles.flowStepNumber}>
                    <Text style={styles.flowStepNumberText}>2</Text>
                  </View>
                  <View style={styles.flowStepContent}>
                    <Text style={styles.flowStepTitle}>Define Your World</Text>
                    <Text style={styles.flowStepDescription}>
                      Create the foundation with AI assistance
                    </Text>
                  </View>
                </View>
                
                <View style={styles.flowStepConnector} />
                
                <View style={styles.flowStep}>
                  <View style={styles.flowStepNumber}>
                    <Text style={styles.flowStepNumberText}>3</Text>
                  </View>
                  <View style={styles.flowStepContent}>
                    <Text style={styles.flowStepTitle}>Create Characters</Text>
                    <Text style={styles.flowStepDescription}>
                      Design the inhabitants of your world
                    </Text>
                  </View>
                </View>
                
                <View style={styles.flowStepConnector} />
                
                <View style={styles.flowStep}>
                  <View style={styles.flowStepNumber}>
                    <Text style={styles.flowStepNumberText}>4</Text>
                  </View>
                  <View style={styles.flowStepContent}>
                    <Text style={styles.flowStepTitle}>Craft Your Story</Text>
                    <Text style={styles.flowStepDescription}>
                      Develop plot, setting, and dialogue
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      case CreationStep.SELECT_TEMPLATE:
        return renderTemplateSelection();
      case CreationStep.DEFINE_WORLD:
        return renderWorldDefinition();
      case CreationStep.CREATE_CHARACTERS:
        return renderCharacterCreation();
      // Additional steps would be rendered here
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#111', '#000']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {creationStep !== CreationStep.MAIN_MENU && (
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(creationStep / (Object.keys(CreationStep).length / 2 - 1)) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                Step {creationStep} of {Object.keys(CreationStep).length / 2 - 1}
              </Text>
            </View>
          </View>
        )}
        {renderCurrentStep()}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    padding: 8,
  },
  progressContainer: {
    flex: 1,
    marginLeft: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4BDFC3',
    borderRadius: 2,
  },
  progressText: {
    color: '#AAA',
    fontSize: 12,
  },
  content: {
    flex: 1,
    position: 'relative',
    padding: 20,
    paddingTop: 40,
  },
  stepContainer: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#BBB',
    marginBottom: 24,
  },
  mainOptionCard: {
    width: '100%',
    height: 80,
    borderRadius: 24,
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
    padding: 20,
  },
  optionContent: {
    flex: 1,
    position: 'relative',
  },
  mainOptionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  editIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallOptionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
  },
  smallOptionCard: {
    flex: 1,
    height: 200,
    borderRadius: 24,
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
    padding: 20,
  },
  smallOptionContent: {
    flex: 1,
    position: 'relative',
  },
  smallOptionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  smallOptionIconContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  // Template selection styles
  templateGrid: {
    paddingVertical: 16,
  },
  templateCard: {
    width: (width - 60) / 2,
    height: 160,
    margin: 8,
    borderRadius: 16,
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
  templateCardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 12,
  },
  templateDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  navigationButton: {
    backgroundColor: '#4BDFC3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  navigationButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // World definition styles
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
  },
  textAreaInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  aiAssistContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  aiAssistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiAssistTitle: {
    color: '#4BDFC3',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  aiGenerateButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiGenerateButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
  aiSuggestionContainer: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
  },
  aiSuggestionText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
  aiButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  aiActionButton: {
    backgroundColor: '#4BDFC3',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 0.48,
    alignItems: 'center',
  },
  aiActionButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
  },
  secondaryButtonText: {
    color: '#CCC',
  },
  sampleContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  sampleTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sampleChip: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  sampleChipText: {
    color: '#FFF',
    fontSize: 14,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginVertical: 16,
  },
  flowGuideContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
  },
  flowGuideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  flowStepsList: {
    // Make it vertical
  },
  flowStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  flowStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4BDFC3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  flowStepNumberText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flowStepContent: {
    flex: 1,
  },
  flowStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  flowStepDescription: {
    color: '#BBB',
    fontSize: 14,
  },
  flowStepConnector: {
    width: 2,
    height: 20,
    backgroundColor: '#333',
    marginLeft: 13, // Center with the circle
    marginBottom: 4,
  },
}); 