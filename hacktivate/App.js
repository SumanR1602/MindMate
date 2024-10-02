  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import LoginScreen from './screens/LoginScreen';
  import RegisterScreen from './screens/RegisterScreen';
  import Profile from './screens/Profile';
  import ChatBotScreen from './screens/ChatBotScreen';
  import GratitudeGardenScreen from './screens/GratitudeGardenScreen'
  import Activities from './screens/Activities'
import WalkingScreen from './screens/WalkingScreen';
import LetsJamScreen from './screens/LetsJam';
import { PointsProvider } from './components/PointsContext';
import IntroScreen from './screens/IntroScreen';


  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  function MainTabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="Chatbot" component={ChatBotScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

  export default function App() {
    return (
      <PointsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Activities" component={Activities} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />

          <Stack.Screen name="Garden" component={GratitudeGardenScreen} />
          <Stack.Screen name = "Walking" component={WalkingScreen} />
          <Stack.Screen name = "Music" component={LetsJamScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </PointsProvider>
    );
  }
