import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Custom tab without label, just icon
function CustomTab({ 
  iconName, 
  color, 
  focused 
}: { 
  iconName: IconSymbolName; 
  color: string; 
  focused: boolean;
}) {
  return (
    <View style={styles.tabContainer}>
      <IconSymbol size={26} name={iconName} color={color} />
      {focused && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          height: 80,
          backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 25 : 15,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarItemStyle: {
          flex: 1,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CustomTab iconName="house.fill" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="for-you"
        options={{
          title: 'For You',
          tabBarIcon: ({ color, focused }) => (
            <CustomTab iconName="wand.and.stars" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wiki"
        options={{
          title: 'Wiki',
          tabBarIcon: ({ color, focused }) => (
            <CustomTab iconName="book.fill" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.createButtonContainer}>
              <LinearGradient
                colors={['#30E3CA', '#8BE3EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.createButton}
              >
                <IconSymbol size={28} name="plus" color="#000" />
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          title: 'Stories',
          tabBarIcon: ({ color, focused }) => (
            <CustomTab iconName="text.bubble.fill" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <CustomTab iconName="person.fill" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  createButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%',
  },
  createButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  }
});
