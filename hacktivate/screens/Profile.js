import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';

export default function EditProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile Image */}
      <Image
        style={styles.profileImage}
        source={{ uri: 'https://via.placeholder.com/150' }}
      />
      <Text style={styles.name}>Temp user</Text>

      {/* Information */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>Daniel</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>Johnson</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Birthday:</Text>
          <Text style={styles.value}>06/07/1986</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>Male</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>daniel5487@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>Champ de, 5 Avenue, France</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8BBD0', // Pink background at the top
    alignItems: 'center',
  },
  header: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#FF5C77',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -20, // Lift the image above the pink background
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
  infoContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 3, // For Android shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});
