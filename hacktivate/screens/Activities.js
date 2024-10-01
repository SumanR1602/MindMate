import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


const imageMap = {
          'tree': require('../assets/tree.jpeg'),
          'walking': require('../assets/walking.jpeg'),
          'dance': require('../assets/dance.jpeg'),
        };
        
        
// Individual Card Component
function Card({ item }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={imageMap[item.image]}
        style={styles.cardImage}
      />
      {/* <img src='../assets/walking.jpeg' style={styles.cardImage} /> */}
      <View style={styles.cardContent}>
      <View style={styles.titleRow} >

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
        {/* <Text style={styles.cardDescription}>{item.image}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

// Group of Cards Component
export default function Activities() {
  const cardData = [
    {
      id: 1,
      title: 'Grow ur Tree',
      description: 'Plant and grow your own tree and make it save u ',
      image: 'tree',
      completed: true
    },
    {
      id: 2,
      title: 'The WaLk GaMe',
      description: 'Walk the walk... talk the talk',
      image: 'walking',
      completed: false
    },
    {
      id: 3,
      title: 'Lets Dance',
      description: 'Come on...get on ur feet rn :)',
      image: 'dance',
      completed: false
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cardData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center', // Center the cards horizontally
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
  },titleRow: {
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
//     fontWeight: 'bold',
  }
});
