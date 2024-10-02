import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { login } from '../services/authService';
import { Image } from 'react-native-web';

const LoginScreen = ({ navigation }) => {
  console.log("login scnreen")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      Alert.alert('Login successful', `Welcome back, ${data.username}!`);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Login failed', error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mindmate.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
      <Button title="Login" onPress={handleLogin} color="#7f4f3e" />
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} color="#7f4f3e" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eccbc4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5a5a5a',
    marginBottom: 20,
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#7f4f3e',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 10, // Adjust this value to change the space between buttons
    width: '100%', // Ensures the button takes full width
  },
});

export default LoginScreen;
