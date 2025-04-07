import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Switch,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface SekaiCreationFlowProps {
  onClose: () => void;
}

// Types for our form data
interface Character {
  id: string;
  name: string;
  role: string;
  objective: string;
  flaw: string;
  catchphrase: string;
  description: string;
  image?: string;
}

interface Sekai {
  name: string;
  genre: string;
  theme: string;
  setting: string;
  description: string;
  incitingIncident: string;
  characters: Character[];
  isPublic: boolean;
}

// Predefined genres for selection
const genres = [
  { id: 'fantasy', name: 'Fantasy', icon: 'planet' },
  { id: 'scifi', name: 'Sci-Fi', icon: 'rocket' },
  { id: 'historical', name: 'Historical', icon: 'time' },
  { id: 'romance', name: 'Romance', icon: 'heart' },
  { id: 'mystery', name: 'Mystery', icon: 'search' },
  { id: 'horror', name: 'Horror', icon: 'skull' },
  { id: 'comedy', name: 'Comedy', icon: 'happy' },
  { id: 'drama', name: 'Drama', icon: 'film' },
];

export default function SekaiCreationFlow({ onClose }: SekaiCreationFlowProps) {
  // Main Sekai data
  const [sekai, setSekai] = useState<Sekai>({
    name: '',
    genre: '',
    theme: '',
    setting: '',
    description: '',
    incitingIncident: '',
    characters: [],
    isPublic: true
  });

  // UI state
  const [currentStep, setCurrentStep] = useState<'genre' | 'world' | 'characters' | 'review'>('genre');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isAddingCharacter, setIsAddingCharacter] = useState<boolean>(false);
  const [generationPrompt, setGenerationPrompt] = useState<string>('');

  // Function to update sekai data
  const updateSekai = (key: keyof Sekai, value: any) => {
    setSekai(prev => ({ ...prev, [key]: value }));
  };

  // Generate world with AI
  const generateWorld = () => {
    setIsGenerating(true);
    // In a real app, this would call an AI service
    setTimeout(() => {
      // Simulate AI-generated content based on genre
      if (selectedGenre) {
        const genre = genres.find(g => g.id === selectedGenre)?.name || 'Fantasy';
        let worldData: Partial<Sekai> = {};
        
        switch(selectedGenre) {
          case 'fantasy':
            worldData = {
              name: 'Eldoria',
              theme: 'Power corrupts, but hope endures',
              setting: 'A medieval realm where magic flows freely through ancient ley lines',
              description: 'Eldoria is a land of towering mountains, enchanted forests, and ancient ruins. Once ruled by a wise council of mages, the realm has fallen into darkness after the Great Cataclysm shattered the magical barriers protecting it from outer realms. Now, creatures of myth and shadow roam freely, and power-hungry warlords vie for control of magical artifacts that could reshape reality itself.',
              incitingIncident: 'The last crystal guardian has been discovered murdered, with the sacred Orb of Ages missing from its centuries-old sanctuary.'
            };
            break;
            
          case 'scifi':
            worldData = {
              name: 'Nexus-7',
              theme: 'Technology without wisdom leads to destruction',
              setting: 'A space colony network at the edge of explored space in the year 2387',
              description: 'Nexus-7 is humanity\'s farthest outpost, a massive ring station orbiting a neutron star. Originally built as a research facility, it has grown into a bustling hub of commerce, science, and political intrigue. Artificial intelligence governs much of daily life, while corporations battle for resources and influence. The line between human and machine blurs as neural implants and synthetic biology advance beyond regulatory control.',
              incitingIncident: 'The station\'s quantum AI defense system has begun making decisions without oversight, locking down key sectors without explanation.'
            };
            break;
            
          default:
            worldData = {
              name: `New ${genre} World`,
              theme: 'Good versus evil in unexpected ways',
              setting: 'A world where the extraordinary meets the ordinary',
              description: `A richly detailed ${genre.toLowerCase()} world with unique cultures, conflicts, and mysteries. The balance of power is shifting, creating opportunities and dangers for those bold enough to seize them.`,
              incitingIncident: 'A long-dormant power has awakened, changing the rules that have governed society for generations.'
            };
        }
        
        setSekai(prev => ({ ...prev, ...worldData }));
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  // Generate a character with AI
  const generateCharacter = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const characterNames = [
        'Elara Nightshade', 'Thorne Blackwell', 'Cassidy Vale', 
        'Orion Frost', 'Lyra Dawnstar', 'Marcus Vex'
      ];
      
      const roles = [
        'Protagonist', 'Antagonist', 'Mentor', 
        'Ally', 'Trickster', 'Guardian'
      ];
      
      const objectives = [
        'To restore a lost legacy', 'To avenge a betrayal', 
        'To discover a hidden truth', 'To protect the innocent', 
        'To attain forbidden knowledge', 'To escape the past'
      ];
      
      const flaws = [
        'Pride', 'Fear of abandonment', 'Blind ambition', 
        'Misplaced loyalty', 'Inability to trust', 'Self-destructive impulses'
      ];
      
      const catchphrases = [
        'In darkness, truth is revealed.', 
        'The price of freedom is eternal vigilance.',
        'Not all who wander are lost.',
        'Fortune favors the bold.',
        'Trust is earned, not given.',
        'The greatest enemy lies within.'
      ];
      
      const descriptions = [
        'A complex character with a mysterious past, known for swift decisions and unwavering resolve once committed to a course of action.',
        'Charismatic and unpredictable, they hide deep wounds beneath a carefully crafted exterior of confidence and charm.',
        'Brilliant but haunted by past failures, they see patterns others miss while struggling with personal demons.',
        'Steadfast and principled, they serve as the moral compass for others while carrying burdens few could imagine.',
        'A master of adaptation who uses humor to deflect from their true feelings and motivations.'
      ];
      
      // Create a random character
      const newCharacter: Character = {
        id: Date.now().toString(),
        name: characterNames[Math.floor(Math.random() * characterNames.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        objective: objectives[Math.floor(Math.random() * objectives.length)],
        flaw: flaws[Math.floor(Math.random() * flaws.length)],
        catchphrase: catchphrases[Math.floor(Math.random() * catchphrases.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)]
      };
      
      if (editingCharacter) {
        // Update existing character
        setSekai(prev => ({
          ...prev,
          characters: prev.characters.map(c => 
            c.id === editingCharacter.id ? {...newCharacter, id: c.id} : c
          )
        }));
        setEditingCharacter(null);
      } else {
        // Add new character
        setSekai(prev => ({
          ...prev,
          characters: [...prev.characters, newCharacter]
        }));
      }
      
      setIsGenerating(false);
      setIsAddingCharacter(false);
    }, 2000);
  };

  // Handle creating the Sekai
  const handleCreateSekai = () => {
    // In a real app, this would save to a database
    console.log('Creating Sekai:', sekai);
    onClose();
  };

  // Render the genre selection screen
  const renderGenreSelection = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Choose a genre for your world</Text>
        <Text style={styles.stepDescription}>
          Select a genre to influence the AI generation of your Sekai world.
        </Text>
        
        <View style={styles.genreGrid}>
          {genres.map(genre => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreCard,
                selectedGenre === genre.id && styles.genreCardSelected
              ]}
              onPress={() => setSelectedGenre(genre.id)}
            >
              <View style={styles.genreIconContainer}>
                <Ionicons name={genre.icon as any} size={32} color={selectedGenre === genre.id ? "#4BDFC3" : "white"} />
              </View>
              <Text style={[
                styles.genreName,
                selectedGenre === genre.id && styles.genreNameSelected
              ]}>
                {genre.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.customPromptContainer}>
          <Text style={styles.customPromptLabel}>Custom prompt (optional)</Text>
          <TextInput
            style={styles.customPromptInput}
            multiline
            placeholder="Add specific details or themes you'd like in your world..."
            placeholderTextColor="#666"
            value={generationPrompt}
            onChangeText={setGenerationPrompt}
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.primaryButton,
            !selectedGenre && styles.disabledButton
          ]}
          disabled={!selectedGenre}
          onPress={() => {
            generateWorld();
            setCurrentStep('world');
          }}
        >
          <Ionicons name="flash" size={20} color="black" style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Generate World with AI</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render the world details screen
  const renderWorldDetails = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Your Sekai World</Text>
        <Text style={styles.stepDescription}>
          Edit the AI-generated world details or regenerate specific elements.
        </Text>
        
        {/* World Name */}
        <View style={styles.formGroup}>
          <View style={styles.labelWithButton}>
            <Text style={styles.formLabel}>World Name</Text>
            <TouchableOpacity 
              style={styles.regenerateButton}
              onPress={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  const names = ['Eldoria', 'Avalon', 'Nova Terra', 'Celestia', 'Arcadia'];
                  updateSekai('name', names[Math.floor(Math.random() * names.length)]);
                  setIsGenerating(false);
                }, 1000);
              }}
            >
              <Ionicons name="refresh" size={16} color="#4BDFC3" />
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter world name"
            placeholderTextColor="#666"
            value={sekai.name}
            onChangeText={(value) => updateSekai('name', value)}
          />
        </View>
        
        {/* Theme */}
        <View style={styles.formGroup}>
          <View style={styles.labelWithButton}>
            <Text style={styles.formLabel}>Theme</Text>
            <TouchableOpacity 
              style={styles.regenerateButton}
              onPress={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  const themes = [
                    'Power corrupts, but redemption is possible',
                    'The price of freedom is eternal vigilance',
                    'Technology without wisdom leads to destruction',
                    'The line between hero and villain is thin',
                    'The greatest enemy lies within'
                  ];
                  updateSekai('theme', themes[Math.floor(Math.random() * themes.length)]);
                  setIsGenerating(false);
                }, 1000);
              }}
            >
              <Ionicons name="refresh" size={16} color="#4BDFC3" />
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Main theme of your world"
            placeholderTextColor="#666"
            value={sekai.theme}
            onChangeText={(value) => updateSekai('theme', value)}
          />
        </View>
        
        {/* Setting */}
        <View style={styles.formGroup}>
          <View style={styles.labelWithButton}>
            <Text style={styles.formLabel}>Setting</Text>
            <TouchableOpacity 
              style={styles.regenerateButton}
              onPress={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  const settings = [
                    'A medieval realm where magic flows freely through ancient ley lines',
                    'A cyberpunk metropolis where corporations control every aspect of life',
                    'A space colony at the edge of explored territory',
                    'A hidden academy for those with supernatural abilities',
                    'A post-apocalyptic wasteland where resources are scarce'
                  ];
                  updateSekai('setting', settings[Math.floor(Math.random() * settings.length)]);
                  setIsGenerating(false);
                }, 1000);
              }}
            >
              <Ionicons name="refresh" size={16} color="#4BDFC3" />
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Where and when your world exists"
            placeholderTextColor="#666"
            value={sekai.setting}
            onChangeText={(value) => updateSekai('setting', value)}
          />
        </View>
        
        {/* World Description */}
        <View style={styles.formGroup}>
          <View style={styles.labelWithButton}>
            <Text style={styles.formLabel}>World Description</Text>
            <TouchableOpacity 
              style={styles.regenerateButton}
              onPress={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  const genre = genres.find(g => g.id === selectedGenre)?.name || 'Fantasy';
                  const descriptions = [
                    `A realm of ancient magic and forgotten lore, where towering mountains shelter secretive civilizations and enchanted forests hide creatures of myth. The balance of power shifts as factions vie for control of magical artifacts that could reshape reality itself.`,
                    `A sprawling cybernetic metropolis where neon lights illuminate the perpetual rain. Above, the wealthy elite live in luxury, while below, in the depths of the undercity, hackers and rebels fight against corporate control and experiment with dangerous technology.`,
                    `A world recovering from catastrophe, where pockets of civilization struggle to rebuild amid the ruins of a fallen empire. Resources are scarce, and knowledge of the past is fragmented, leading to superstition and conflict.`,
                    `A hidden society existing alongside the modern world, where those with special abilities live by their own rules and traditions. Ancient bloodlines carry powerful legacies, and secret organizations work to keep the supernatural hidden from ordinary humans.`
                  ];
                  updateSekai('description', descriptions[Math.floor(Math.random() * descriptions.length)]);
                  setIsGenerating(false);
                }, 1000);
              }}
            >
              <Ionicons name="refresh" size={16} color="#4BDFC3" />
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textAreaInput}
            multiline
            placeholder="Describe your world in detail"
            placeholderTextColor="#666"
            value={sekai.description}
            onChangeText={(value) => updateSekai('description', value)}
          />
        </View>
        
        {/* Inciting Incident */}
        <View style={styles.formGroup}>
          <View style={styles.labelWithButton}>
            <Text style={styles.formLabel}>Inciting Incident</Text>
            <TouchableOpacity 
              style={styles.regenerateButton}
              onPress={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  const incidents = [
                    "The awakening of an ancient being that was sealed away for millennia.",
                    "The disappearance of a vital resource that the society depends on.",
                    "The assassination of a beloved leader, with evidence pointing to an unlikely culprit.",
                    "The discovery of a powerful artifact that multiple factions now seek to control.",
                    "A sudden shift in the natural laws that govern magic or technology."
                  ];
                  updateSekai('incitingIncident', incidents[Math.floor(Math.random() * incidents.length)]);
                  setIsGenerating(false);
                }, 1000);
              }}
            >
              <Ionicons name="refresh" size={16} color="#4BDFC3" />
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textAreaInput}
            multiline
            placeholder="The event that disrupts the world's status quo"
            placeholderTextColor="#666"
            value={sekai.incitingIncident}
            onChangeText={(value) => updateSekai('incitingIncident', value)}
          />
        </View>
        
        {/* Privacy Setting */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Public Sekai</Text>
            <Switch
              value={sekai.isPublic}
              onValueChange={(value) => updateSekai('isPublic', value)}
              trackColor={{ false: "#333", true: "rgba(75, 223, 195, 0.4)" }}
              thumbColor={sekai.isPublic ? "#4BDFC3" : "#f4f3f4"}
              ios_backgroundColor="#333"
            />
          </View>
          <Text style={styles.toggleDescription}>
            {sekai.isPublic ? 
              "Anyone can view and interact with your Sekai" : 
              "Only people you invite can access your Sekai"}
          </Text>
        </View>
        
        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setCurrentStep('genre')}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setCurrentStep('characters')}
          >
            <Text style={styles.primaryButtonText}>Continue to Characters</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render character creation screen
  const renderCharacters = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Create Characters</Text>
        <Text style={styles.stepDescription}>
          Add characters to your world with unique traits and backgrounds.
        </Text>
        
        {/* Character List */}
        {sekai.characters.length > 0 && (
          <View style={styles.characterListContainer}>
            <Text style={styles.sectionLabel}>Characters ({sekai.characters.length})</Text>
            {sekai.characters.map(character => (
              <View key={character.id} style={styles.characterCard}>
                <View style={styles.characterHeader}>
                  <Text style={styles.characterName}>{character.name}</Text>
                  <Text style={styles.characterRole}>{character.role}</Text>
                </View>
                
                <View style={styles.characterDetail}>
                  <Text style={styles.detailLabel}>Objective:</Text>
                  <Text style={styles.detailText}>{character.objective}</Text>
                </View>
                
                <View style={styles.characterDetail}>
                  <Text style={styles.detailLabel}>Fatal Flaw:</Text>
                  <Text style={styles.detailText}>{character.flaw}</Text>
                </View>
                
                <View style={styles.characterDetail}>
                  <Text style={styles.detailLabel}>Catchphrase:</Text>
                  <Text style={styles.detailText}>"{character.catchphrase}"</Text>
                </View>
                
                <Text numberOfLines={2} style={styles.characterDescription}>
                  {character.description}
                </Text>
                
                <View style={styles.characterActions}>
                  <TouchableOpacity 
                    style={styles.characterAction}
                    onPress={() => {
                      setEditingCharacter(character);
                      generateCharacter();
                    }}
                  >
                    <Ionicons name="refresh" size={16} color="#4BDFC3" />
                    <Text style={styles.characterActionText}>Regenerate</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.characterAction}
                    onPress={() => {
                      // Remove character
                      setSekai(prev => ({
                        ...prev,
                        characters: prev.characters.filter(c => c.id !== character.id)
                      }));
                    }}
                  >
                    <Ionicons name="trash" size={16} color="#ff6b6b" />
                    <Text style={[styles.characterActionText, { color: '#ff6b6b' }]}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* Add Character Button */}
        {!isAddingCharacter ? (
          <TouchableOpacity 
            style={styles.addCharacterButton}
            onPress={() => {
              setIsAddingCharacter(true);
              generateCharacter();
            }}
          >
            <Ionicons name="add-circle" size={24} color="#4BDFC3" />
            <Text style={styles.addCharacterText}>Add Character with AI</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.generatingCharacterContainer}>
            <ActivityIndicator size="small" color="#4BDFC3" />
            <Text style={styles.generatingCharacterText}>Generating character...</Text>
          </View>
        )}
        
        {/* Tip */}
        <View style={styles.tipContainer}>
          <Ionicons name="bulb" size={20} color="#FFD166" />
          <Text style={styles.tipText}>
            A good story needs characters with clear objectives and flaws. 
            Try to include different character archetypes.
          </Text>
        </View>
        
        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setCurrentStep('world')}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.primaryButton,
              sekai.characters.length === 0 && styles.disabledButton
            ]}
            disabled={sekai.characters.length === 0}
            onPress={() => setCurrentStep('review')}
          >
            <Text style={styles.primaryButtonText}>Review & Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render review screen
  const renderReview = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Review Your Sekai</Text>
        <Text style={styles.stepDescription}>
          Review your world and characters before creating your Sekai.
        </Text>
        
        {/* World Summary */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>World</Text>
          
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Name:</Text>
            <Text style={styles.reviewValue}>{sekai.name}</Text>
          </View>
          
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Genre:</Text>
            <Text style={styles.reviewValue}>
              {genres.find(g => g.id === selectedGenre)?.name || 'Custom'}
            </Text>
          </View>
          
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Theme:</Text>
            <Text style={styles.reviewValue}>{sekai.theme}</Text>
          </View>
          
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Setting:</Text>
            <Text style={styles.reviewValue}>{sekai.setting}</Text>
          </View>
          
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Inciting Incident:</Text>
            <Text style={styles.reviewValue}>{sekai.incitingIncident}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setCurrentStep('world')}
          >
            <Ionicons name="pencil" size={16} color="#4BDFC3" />
            <Text style={styles.editButtonText}>Edit World</Text>
          </TouchableOpacity>
        </View>
        
        {/* Characters Summary */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Characters ({sekai.characters.length})</Text>
          
          {sekai.characters.map((character, index) => (
            <View key={character.id} style={styles.reviewCharacterCard}>
              <Text style={styles.reviewCharacterName}>
                {character.name} <Text style={styles.reviewCharacterRole}>({character.role})</Text>
              </Text>
              <Text style={styles.reviewCharacterDetail}>
                Objective: {character.objective}
              </Text>
              <Text style={styles.reviewCharacterDetail}>
                Fatal Flaw: {character.flaw}
              </Text>
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setCurrentStep('characters')}
          >
            <Ionicons name="pencil" size={16} color="#4BDFC3" />
            <Text style={styles.editButtonText}>Edit Characters</Text>
          </TouchableOpacity>
        </View>
        
        {/* Privacy Setting */}
        <View style={styles.reviewSection}>
          <View style={styles.toggleRow}>
            <Text style={styles.reviewSectionTitle}>Visibility</Text>
            <Switch
              value={sekai.isPublic}
              onValueChange={(value) => updateSekai('isPublic', value)}
              trackColor={{ false: "#333", true: "rgba(75, 223, 195, 0.4)" }}
              thumbColor={sekai.isPublic ? "#4BDFC3" : "#f4f3f4"}
              ios_backgroundColor="#333"
            />
          </View>
          <Text style={styles.toggleDescription}>
            {sekai.isPublic ? 
              "Anyone can view and interact with your Sekai" : 
              "Only people you invite can access your Sekai"}
          </Text>
        </View>
        
        {/* Create Button */}
        <TouchableOpacity 
          style={styles.createSekaiButton}
          onPress={handleCreateSekai}
        >
          <LinearGradient
            colors={['#4BDFC3', '#00A3FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createSekaiGradient}
          >
            <Text style={styles.createSekaiText}>Create Sekai</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backToEditButton}
          onPress={() => setCurrentStep('characters')}
        >
          <Text style={styles.backToEditText}>Back to Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Sekai</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Genre Selection */}
          {currentStep === 'genre' && renderGenreSelection()}
          
          {/* World Details */}
          {currentStep === 'world' && renderWorldDetails()}
          
          {/* Character Creation */}
          {currentStep === 'characters' && renderCharacters()}
          
          {/* Review Screen */}
          {currentStep === 'review' && renderReview()}
        </View>
      </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 16,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  stepContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#111',
    borderRadius: 16,
  },
  stepTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    color: '#AAA',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  genreCard: {
    width: '48%',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  genreCardSelected: {
    backgroundColor: 'rgba(75, 223, 195, 0.2)',
    borderWidth: 1,
    borderColor: '#4BDFC3',
  },
  genreIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  genreName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genreNameSelected: {
    color: '#4BDFC3',
  },
  customPromptContainer: {
    marginBottom: 24,
  },
  customPromptLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  customPromptInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 14,
    color: 'white',
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#4BDFC3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: 'rgba(75, 223, 195, 0.5)',
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  labelWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  regenerateText: {
    color: '#4BDFC3',
    marginLeft: 4,
    fontSize: 12,
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
  toggleContainer: {
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleDescription: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  characterListContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  characterCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  characterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 8,
  },
  characterName: {
    color: '#4BDFC3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterRole: {
    color: '#AAA',
    fontSize: 14,
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  characterDetail: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    color: '#AAA',
    fontSize: 14,
    width: 100,
  },
  detailText: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  characterDescription: {
    color: '#CCC',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 12,
  },
  characterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  characterAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  characterActionText: {
    color: '#4BDFC3',
    fontSize: 14,
    marginLeft: 4,
  },
  addCharacterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(75, 223, 195, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4BDFC3',
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 20,
  },
  addCharacterText: {
    color: '#4BDFC3',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  generatingCharacterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 20,
  },
  generatingCharacterText: {
    color: '#4BDFC3',
    fontSize: 16,
    marginLeft: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 209, 102, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  tipText: {
    color: '#FFD166',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  reviewSection: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  reviewSectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewLabel: {
    color: '#AAA',
    fontSize: 14,
    width: 120,
  },
  reviewValue: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  editButtonText: {
    color: '#4BDFC3',
    fontSize: 14,
    marginLeft: 4,
  },
  reviewCharacterCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  reviewCharacterName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  reviewCharacterRole: {
    color: '#AAA',
    fontWeight: 'normal',
  },
  reviewCharacterDetail: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 4,
  },
  createSekaiButton: {
    marginBottom: 12,
    borderRadius: 50,
    overflow: 'hidden',
  },
  createSekaiGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createSekaiText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToEditButton: {
    alignItems: 'center',
    padding: 12,
  },
  backToEditText: {
    color: '#AAA',
    fontSize: 16,
  },
}); 