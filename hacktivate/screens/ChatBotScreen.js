// screens/ChatbotScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };
      const botResponse = { id: Date.now().toString() + 'bot', text: 'Hello! How can I help you?', sender: 'bot' };

      setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
      </TouchableWithoutFeedback>
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
