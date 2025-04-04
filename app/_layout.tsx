import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme, StyleSheet, View, Dimensions } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <View style={styles.phoneContainer}>
          <View style={styles.notch} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </View>
      </View>
    </ThemeProvider>
  );
}

const { width, height } = Dimensions.get('window');
const isWeb = typeof document !== 'undefined';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isWeb ? '#f0f0f0' : 'transparent',
  },
  phoneContainer: {
    width: isWeb ? 375 : '100%', // iPhone width
    height: isWeb ? 812 : '100%', // iPhone height
    overflow: 'hidden',
    borderRadius: isWeb ? 40 : 0,
    borderWidth: isWeb ? 12 : 0,
    borderColor: '#333',
    position: 'relative',
  },
  notch: {
    display: isWeb ? 'flex' : 'none',
    position: 'absolute',
    width: 150,
    height: 30,
    backgroundColor: '#333',
    top: 0,
    zIndex: 1000,
    alignSelf: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  }
});
