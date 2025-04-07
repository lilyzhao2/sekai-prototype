import { Tabs } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Custom tab component with more focused naming for user types
const CustomTab = ({ name, isFocused, icon, gradient, onPress }: { 
  name: string;
  isFocused: boolean;
  icon: React.ReactNode;
  gradient?: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.tabContainer, isFocused && styles.focusedTab]}
      onPress={onPress}
    >
      {gradient ? (
        <LinearGradient
          colors={['#30E3CA', '#5EDECC']}
          style={styles.tabButton}
        >
          {icon}
        </LinearGradient>
      ) : (
        <View style={styles.tabButton}>
          {icon}
        </View>
      )}
      <Text style={[styles.tabLabel, isFocused && styles.focusedLabel]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      }}
      tabBar={({ navigation, state, descriptors }) => (
        <View style={[styles.customTabBar, { paddingBottom: insets.bottom }]}>
          <CustomTab
            name="Home"
            isFocused={state.index === 0}
            icon={<Ionicons name="home" size={24} color={state.index === 0 ? '#4BDFC3' : '#999'} />}
            onPress={() => navigation.navigate('index')}
          />
          <CustomTab
            name="Read"
            isFocused={state.index === 1}
            icon={<Ionicons name="book" size={24} color={state.index === 1 ? '#4BDFC3' : '#999'} />}
            onPress={() => navigation.navigate('for-you')}
          />
          <CustomTab
            name="Wiki"
            isFocused={state.index === 2}
            icon={<Ionicons name="globe" size={24} color={state.index === 2 ? '#4BDFC3' : '#999'} />}
            onPress={() => navigation.navigate('wiki')}
          />
          <CustomTab
            name="Create"
            isFocused={state.index === 3}
            icon={<Ionicons name="add" size={24} color="#000" />}
            gradient
            onPress={() => navigation.navigate('create')}
          />
          <CustomTab
            name="Stories"
            isFocused={state.index === 4}
            icon={<Ionicons name="library" size={24} color={state.index === 4 ? '#4BDFC3' : '#999'} />}
            onPress={() => navigation.navigate('stories')}
          />
          <CustomTab
            name="Profile"
            isFocused={state.index === 5}
            icon={<Ionicons name="person" size={24} color={state.index === 5 ? '#4BDFC3' : '#999'} />}
            onPress={() => navigation.navigate('profile')}
          />
          <CustomTab
            name="Interact"
            isFocused={state.index === 6}
            icon={<Ionicons name="chatbubbles" size={24} color={state.index === 6 ? '#4BDFC3' : '#999'} />}
            onPress={() => navigation.navigate('explore')}
          />
        </View>
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="for-you" />
      <Tabs.Screen name="wiki" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="stories" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="explore" options={{ href: '/explore' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  customTabBar: {
    flexDirection: 'row',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  focusedTab: {
    borderTopWidth: 0,
  },
  tabButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#999',
  },
  focusedLabel: {
    color: '#4BDFC3',
  },
});
