import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const thoughts = [
  "Believe you can and you're halfway there.",
  "Every day is a new beginning. Take a deep breath and start again.",
  "Keep going, you're doing great!",
  "Positivity always wins!",
  "Do something today that your future self will thank you for.",
  "Small steps every day lead to big progress.",
  "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change."
];

export default function ThoughtComponent() {
  const [dailyThought, setDailyThought] = useState('');

  useEffect(() => {
    let index = 0;
    
    setDailyThought(thoughts[index]);

    const interval = setInterval(() => {
      index = (index + 1) % thoughts.length;
      setDailyThought(thoughts[index]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨Positive Thought✨</Text>
      <Text style={styles.thought}>{dailyThought}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff8e1',
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6a1b9a',
  },
  thought: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
