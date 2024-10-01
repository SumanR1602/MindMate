// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import ChatbotScreen from './screens/ChatBotScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { View, Text, StyleSheet, Button } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="LOGIN" component={LoginScreen} />
        <Tab.Screen name="REGISTER" component={RegisterScreen} />
        <Tab.Screen name="CHATBOT" component={ChatbotScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Mental Awareness App</Text>
      <Text style={styles.description}>
        Take care of your mental health with our support chatbot, personalized resources, and profile management. 
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Chatbot"
          onPress={() => navigation.navigate('CHATBOT')}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('LOGIN')}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate('REGISTER')}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    height: 150,
  },
});