import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { register } from '../services/authService';

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
    <View>
      <TextInput 
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;
