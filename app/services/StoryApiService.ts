import { Platform } from 'react-native';

// Types for API responses
export interface StoryChapter {
  id: string;
  title: string;
  content: string[];
  chapterNumber: number;
}

export interface StoryDetails {
  id: string;
  title: string;
  author: string;
  platform: 'AO3' | 'Wattpad' | 'Sekai';
  totalChapters: number;
  wordCount: number;
  completed: boolean;
}

// Story API Service
class StoryApiService {
  // AO3 API methods (mock implementation)
  async fetchAO3StoryDetails(storyId: string): Promise<StoryDetails> {
    // In a real app, this would make an API call to AO3's API
    // or use a web scraper with permission from AO3
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response
    return {
      id: storyId,
      title: "The Dragon's Chosen",
      author: "DragonMaster",
      platform: "AO3",
      totalChapters: 24,
      wordCount: 124500,
      completed: true
    };
  }
  
  async fetchAO3Chapter(storyId: string, chapterNumber: number): Promise<StoryChapter> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock chapter data
    return {
      id: `${storyId}-ch${chapterNumber}`,
      title: `Chapter ${chapterNumber}: The Beginning of the End`,
      chapterNumber: chapterNumber,
      content: [
        "The dragon soared above the mountains, its massive wings casting shadows across the valley below.",
        "",
        "Aera watched from her hiding spot among the rocks, heart pounding. She had traveled for weeks to reach this place, following the ancient texts that spoke of the last dragon sanctuary.",
        "",
        "\"I must be insane,\" she whispered to herself, clutching the scroll tighter in her trembling hands. According to the prophecy, only the dragon's chosen could communicate with the great beasts—and she had convinced herself that she was that person."
      ],
    };
  }
  
  // Wattpad API methods (mock implementation)
  async fetchWattpadStoryDetails(storyId: string): Promise<StoryDetails> {
    // In a real app, this would use Wattpad's official API
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response
    return {
      id: storyId,
      title: "My Bully Wants Me Forever",
      author: "RomanceQueen",
      platform: "Wattpad",
      totalChapters: 15,
      wordCount: 87600,
      completed: true
    };
  }
  
  async fetchWattpadChapter(storyId: string, chapterNumber: number): Promise<StoryChapter> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock chapter data
    return {
      id: `${storyId}-ch${chapterNumber}`,
      title: `Chapter ${chapterNumber}: Unexpected Encounter`,
      chapterNumber: chapterNumber,
      content: [
        "I was late for class again.",
        "",
        "Racing through the hallway, I clutched my books tighter against my chest, praying I wouldn't run into anyone—especially not him.",
        "",
        "The universe, it seemed, had other plans.",
        "",
        "As I rounded the corner, I slammed directly into a solid wall of muscle. My books scattered across the floor as I stumbled backward, already knowing who I'd find when I looked up.",
        "",
        "\"Watch where you're going, Green Eyes,\" he said, his voice deep and annoyingly amused."
      ],
    };
  }
  
  // Generic method to fetch story details from any platform
  async fetchStoryDetails(storyId: string, platform: 'AO3' | 'Wattpad' | 'Sekai'): Promise<StoryDetails> {
    switch (platform) {
      case 'AO3':
        return this.fetchAO3StoryDetails(storyId);
      case 'Wattpad':
        return this.fetchWattpadStoryDetails(storyId);
      case 'Sekai':
        // For Sekai, we would fetch from our own backend
        throw new Error('Sekai API not implemented yet');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
  
  // Generic method to fetch a chapter from any platform
  async fetchChapter(storyId: string, platform: 'AO3' | 'Wattpad' | 'Sekai', chapterNumber: number): Promise<StoryChapter> {
    switch (platform) {
      case 'AO3':
        return this.fetchAO3Chapter(storyId, chapterNumber);
      case 'Wattpad':
        return this.fetchWattpadChapter(storyId, chapterNumber);
      case 'Sekai':
        // For Sekai, we would fetch from our own backend
        throw new Error('Sekai API not implemented yet');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
  
  // Search stories across platforms
  async searchStories(query: string, platforms: ('AO3' | 'Wattpad' | 'Sekai')[] = ['AO3', 'Wattpad', 'Sekai']): Promise<StoryDetails[]> {
    // In a real app, this would search across the selected platforms
    // For now, we'll return mock results
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock search results
    const results: StoryDetails[] = [
      {
        id: 'ao3-12345',
        title: "The Dragon's Chosen",
        author: "DragonMaster",
        platform: "AO3",
        totalChapters: 24,
        wordCount: 124500,
        completed: true
      },
      {
        id: 'wattpad-67890',
        title: "My Bully Wants Me Forever",
        author: "RomanceQueen",
        platform: "Wattpad",
        totalChapters: 15,
        wordCount: 87600,
        completed: true
      },
      {
        id: 'ao3-54321',
        title: "Love Hashira Joins The Hot Spring!",
        author: "AnimeFan22",
        platform: "AO3",
        totalChapters: 7,
        wordCount: 18900,
        completed: false
      },
      {
        id: 'wattpad-09876',
        title: "Falling For Captain Marvel's Charm",
        author: "@MarvelFan",
        platform: "Wattpad",
        totalChapters: 12,
        wordCount: 45000,
        completed: true
      }
    ];
    
    // Filter by platforms if specified
    return results.filter(story => platforms.includes(story.platform));
  }
}

// Export a singleton instance
export default new StoryApiService(); 