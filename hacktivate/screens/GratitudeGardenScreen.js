import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Animated, Image } from 'react-native';
import { usePoints } from '../components/PointsContext';
import Points from '../components/Points';
export default function GratitudeGardenScreen() {
  const { incrementPoints } = usePoints();
  const [gratitude, setGratitude] = useState('');
  const [growthStage, setGrowthStage] = useState(0);
  const [greetingOpacity] = useState(new Animated.Value(0));
  const [lastWatered, setLastWatered] = useState(null);

  const wateringInterval = 2000;

  const plantImages = [
    require('../assets/seed.png'), 
    require('../assets/sprout.png'), 
    require('../assets/sapling.png'), 
    require('../assets/plant1.png'), 
    require('../assets/plant2.png'), 
    require('../assets/plant3.png'),
    require('../assets/plant4.png'),
    require('../assets/plant5.png'),
    require('../assets/plant6.png'),
    require('../assets/fullyGrown.png') 
  ];

  const handleWaterPlant = () => {
    if (gratitude.trim()) {
      const now = Date.now();
      if (!lastWatered || now - lastWatered >= wateringInterval) {
        setGrowthStage((prevStage) => Math.min(prevStage + 1, plantImages.length - 1));
        setLastWatered(now);
        setGratitude('');
        incrementPoints();
        triggerGreetingAnimation();
      }
    }
  };

  const triggerGreetingAnimation = () => {
    Animated.sequence([
      Animated.timing(greetingOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(greetingOpacity, { toValue: 0, duration: 1500, useNativeDriver: true }),
    ]).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Points />
      <Text style={styles.title}>Gratitude Garden</Text>
      <Text style={styles.subtitle}>Say something positive to water the plant and help it grow!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter something positive..."
        value={gratitude}
        onChangeText={setGratitude}
      />

      <Button title="Water Plant" onPress={handleWaterPlant} />

      <View style={styles.plantContainer}>
        <Image source={plantImages[growthStage]} style={styles.plantImage} />
        {growthStage === plantImages.length - 1 && (
          <Text style={styles.fullGrownMessage}>The plant is fully grown!</Text>
        )}
      </View>

      <Animated.View style={[styles.greetingContainer, { opacity: greetingOpacity }]}>
        <Text style={styles.greetingText}>Great job! Keep nurturing positivity!</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  plantContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  plantImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  fullGrownMessage: {
    fontSize: 16,
    color: '#4caf50',
    marginTop: 10,
    fontWeight: 'bold',
  },
  greetingContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});
