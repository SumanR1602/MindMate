import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePoints } from './PointsContext';

const Points = () => {
  const { points } = usePoints();

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>Points: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 5,
    marginBottom: 20,
  },
  pointsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Points;
