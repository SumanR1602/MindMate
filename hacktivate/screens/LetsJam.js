import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { usePoints } from '../components/PointsContext';
import Points from '../components/Points';
const playlists = [
  {
    id: 1,
    title: 'Chill Vibes',
    songs: ['Song 1', 'Song 2', 'Song 3'],
  },
  {
    id: 2,
    title: 'Workout Playlist',
    songs: ['Song A', 'Song B', 'Song C'],
  },
  {
    id: 3,
    title: 'Party Hits',
    songs: ['Hit 1', 'Hit 2', 'Hit 3'],
  },
];

export default function LetsJamScreen() {
    const {incrementPoints} = usePoints()
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const togglePlaylist = (id) => {
    // Toggle the selected playlist
    setSelectedPlaylist(selectedPlaylist === id ? null : id);

    // Increment points
    incrementPoints();
  };

  return (
    <View style={styles.container}>
        <Points />
      <Text style={styles.title}>Let's Jam!</Text>
      
      <Image
        source={require('../assets/music.webp')}
        style={styles.jamGif}
      />
      
      <ScrollView style={styles.playlistContainer}>
        {playlists.map((playlist) => (
          <View key={playlist.id}>
            <TouchableOpacity onPress={() => togglePlaylist(playlist.id)}>
              <Text style={styles.playlistTitle}>{playlist.title}</Text>
            </TouchableOpacity>
            {selectedPlaylist === playlist.id && (
              <View style={styles.songList}>
                {playlist.songs.map((song, index) => (
                  <Text key={index} style={styles.songItem}>{song}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jamGif: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  playlistContainer: {
    width: '100%',
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007bff',
  },
  songList: {
    marginLeft: 20,
    marginBottom: 10,
  },
  songItem: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
});
