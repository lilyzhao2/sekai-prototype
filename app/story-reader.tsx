import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import StoryReadingView from './components/StoryReadingView';
import SekaiCreationFlow from './components/SekaiCreationFlow';
import StoryCreationFlow from './components/StoryCreationFlow';
import RoleplayCreationFlow from './components/RoleplayCreationFlow';

export default function StoryReader() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get story params from the URL
  const storyId = params.id as string;
  const platform = params.platform as 'AO3' | 'Wattpad' | 'Sekai';
  const chapter = params.chapter ? parseInt(params.chapter as string, 10) : 1;
  const mode = params.mode as string;
  
  // Handle closing the reader or creator
  const handleClose = () => {
    router.back();
  };
  
  // Check if we're in a creation mode
  if (mode === 'create-sekai') {
    return <SekaiCreationFlow onClose={handleClose} />;
  }
  
  if (mode === 'create-story') {
    return <StoryCreationFlow onClose={handleClose} />;
  }
  
  if (mode === 'create-roleplay') {
    return <RoleplayCreationFlow onClose={handleClose} />;
  }
  
  // Validate params for normal story reading
  if (!storyId || !platform) {
    return (
      <StoryReadingView 
        storyId="default-story" 
        platform="Sekai" 
        onClose={handleClose} 
      />
    );
  }
  
  return (
    <StoryReadingView 
      storyId={storyId} 
      platform={platform} 
      chapter={chapter} 
      onClose={handleClose} 
    />
  );
} 