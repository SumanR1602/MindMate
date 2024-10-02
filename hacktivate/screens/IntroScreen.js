// IntroScreen.jsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const IntroScreen = ({ navigation }) => {
  console.log("hello world")
  useEffect(() => {
    // Redirect to the next screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Replace 'NextScreen' with the actual name of your next screen
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mindmate.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eccbc4', // Background color
  },
  logo: {
    width: 400, // Adjust the width as needed
    height: 400, // Adjust the height as needed
  },
});

export default IntroScreen;
