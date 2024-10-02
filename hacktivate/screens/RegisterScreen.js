import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { register } from '../services/authService';
import { Image } from 'react-native-web';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      Alert.alert('Registration successful', 'You can now log in!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration failed', error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
            <Image
        source={require('../assets/mindmate.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Register</Text>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
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
        <Button title="Register" onPress={handleRegister} color="#7f4f3e" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} color="#7f4f3e" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eccbc4', // Background color close to #eccbc4
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5a5a5a',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#7f4f3e', // Darker shade for input border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff', // White background for inputs
  },
  buttonContainer: {
    marginBottom: 10, // Adjust this value to change the space between buttons
    width: '100%', // Ensures the button takes full width
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
});

export default RegisterScreen;
