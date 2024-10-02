import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { usePoints } from '../components/PointsContext';
import Points from '../components/Points';

export default function WalkingScreen() {
  const [walkingStarted, setWalkingStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const { incrementPoints } = usePoints();

  const startWalking = () => {
    setWalkingStarted(true);
    incrementPoints();
  };

  useEffect(() => {
    let timer;
    if (walkingStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer); // Clear timer when countdown reaches zero
    }
    return () => clearInterval(timer);
  }, [walkingStarted, timeLeft]);

  // Helper function to format time into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Points />
      {!walkingStarted ? (
        <>
          <Text style={styles.title}>Go for a Walk!</Text>
          <Button title="Start" onPress={startWalking} />
        </>
      ) : (
        <>
          <Image
            source={require('../assets/giphy.webp')}
            style={styles.walkingGif}
          />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  walkingGif: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
