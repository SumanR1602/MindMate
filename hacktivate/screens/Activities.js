import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ThoughtComponent from './ThoughtComponent';
import { useNavigation } from '@react-navigation/native';
import Points from '../components/Points';

const imageMap = {
  'tree': require('../assets/tree.jpeg'),
  'walking': require('../assets/walking.jpeg'),
  'dance': require('../assets/dance.jpeg'),
};

function Card({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={imageMap[item.image]}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text
            style={[
              styles.cardStatus,
              { color: item.completed ? 'green' : 'red' },
            ]}
          >
            {item.completed ? 'Completed' : 'Uncompleted'}
          </Text>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}


export default function Activities() {
  const navigation =  useNavigation()
  const cardData = [
    {
      id: 1,
      title: 'Grow ur Tree',
      description: 'Plant and grow your own tree and make it save u ',
      image: 'tree',
      completed: true,
      onPress: () => navigation.navigate('Garden')
    },
    {
      id: 2,
      title: 'Lets Touch Grass',
      description: 'Walk the walk... talk the talk',
      image: 'walking',
      completed: false,
      onPress: () => navigation.navigate('Walking') 
    },
    {
      id: 3,
      title: 'Lets Jam',
      description: 'Come on...get on ur feet rn :)',
      image: 'dance',
      completed: false,
      onPress: () => navigation.navigate('Music')
    },
  ];

  return (
    <>
      <ThoughtComponent />
      <Points />
      <ScrollView contentContainerStyle={styles.container}>
        {cardData.map((item) => (
          <Card key={item.id} item={item} onPress={item.onPress} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
    width: '90%', // Take 90% of the screen width
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  titleRow: {
    flexDirection: 'row',   // Align items in a row
    justifyContent: 'space-between',  // Add space between title and status
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardStatus: {
    fontSize: 14,
  },
});
