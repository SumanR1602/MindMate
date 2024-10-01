import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Profile from './screens/Profile';
import ChatBotScreen from './screens/ChatBotScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HelloWorld" component={Profile} />
      <Tab.Screen name="Chatbot" component={ChatBotScreen} />
    </Tab.Navigator>
  );
}

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
