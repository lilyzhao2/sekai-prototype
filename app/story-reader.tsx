import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import StoryReadingView from './components/StoryReadingView';

export default function StoryReader() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get story params from the URL
  const storyId = params.id as string;
  const platform = params.platform as 'AO3' | 'Wattpad' | 'Sekai';
  const chapter = params.chapter ? parseInt(params.chapter as string, 10) : 1;
  
  // Handle closing the reader
  const handleClose = () => {
    router.back();
  };
  
  // Validate params
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