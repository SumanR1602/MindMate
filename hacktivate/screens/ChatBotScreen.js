// screens/ChatbotScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios'; // Import Axios

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };

      // Update messages with user's message
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      
      try {
        // Make POST request to Flask API
        const response = await axios.post('http://127.0.0.1:5001/chat', {
          user_id: 'user_id_placeholder', // Replace with actual user ID
          message: input,
        });

        // Get bot response from the API response
        const botResponse = {
          id: Date.now().toString() + 'bot',
          text: response.data.bot_response,
          sender: 'bot'
        };

        // Update messages with bot's response
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error sending message:', error.message);
        const errorMessage = {
          id: Date.now().toString() + 'error',
          text: 'Error: Could not send message.',
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      // Clear the input field
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  userMessage: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessage: {
    backgroundColor: '#e5e5ea',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    color: '#fff',
  },
});

export default ChatbotScreen;
