import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import Svg, { Path, Polygon, Circle, Line } from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';

// Sample data for professionals with image URLs
const professionals = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Psychiatrist', gender: 'Female', phone: '123-456-7890', rating: '2', image: 'https://via.placeholder.com/60' },
  { id: '2', name: 'Dr. John Doe', specialty: 'Psychologist', gender: 'Male', phone: '987-654-3210', rating: '5', image: 'https://via.placeholder.com/60' },
  { id: '3', name: 'Sarah Brown', specialty: 'Counselor', gender: 'Female', phone: '456-789-0123', rating: '3', image: 'https://via.placeholder.com/60' },
  { id: '4', name: 'Mark Wilson', specialty: 'Therapist', gender: 'Male', phone: '321-654-0987', rating: '4', image: 'https://via.placeholder.com/60' },
  // Add more professionals as needed
];

const SearchIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.searchButton}>
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Circle cx="10" cy="10" r="6" stroke="black" strokeWidth="2" fill="none"/>
      <Line x1="15" y1="15" x2="21" y2="21" stroke="black" strokeWidth="2"  />
    </Svg>
  </TouchableOpacity>
);

const StarRating = ({ rating }) => {
  return (
    <View style={styles.starContainer}>
      <Svg height="20" width="20">
        <Polygon
          points="10,1 12.5,7.5 20,7.5 14,12.5 16,19 10,15 4,19 6,12.5 0,7.5 7.5,7.5"
          fill="#FFD700" // Star color
        />
      </Svg>
      <Text style={styles.rating}>{rating}</Text>
    </View>
  );
};

const FilterIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} >
    <Svg width="24" height="30" viewBox="0 0 24 24">
      <Path 
        d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm2 4v8l6 4 6-4v-8H5z" // Updated d attribute for funnel shape
        // fill="white"
      />
    </Svg>
  </TouchableOpacity>
);

const ProfessionalsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search input visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State to toggle filter visibility
  const [openRating, setOpenRating] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openSpecialty, setOpenSpecialty] = useState(false);
  const [ratingOptions, setRatingOptions] = useState([
    { label: 'All Ratings', value: null }, // Allow for no filter
    { label: '1 Star', value: '1' },
    { label: '2 Stars', value: '2' },
    { label: '3 Stars', value: '3' },
    { label: '4 Stars', value: '4' },
    { label: '5 Stars', value: '5' },
  ]);
  const [filterRating, setFilterRating] = useState(null); // State for filter rating
  const [filterGender, setFilterGender] = useState(null);
  const [filterSpecialty, setFilterSpecialty] = useState(null);

  const handleContact = (professional) => {
    // Navigate to the professional's contact method
    console.log(`Contacting ${professional.name}...`);
    // You can implement your contact logic here
  };

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'All', value: null },
  ];

  // Specialty options for the dropdown
  const specialtyOptions = [
    { label: 'Psychiatrist', value: 'Psychiatrist' },
    { label: 'Psychologist', value: 'Psychologist' },
    { label: 'Counselor', value: 'Counselor' },
    { label: 'Therapist', value: 'Therapist' },
    { label: 'All', value: null },
    // Add more specialties as needed
  ];

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filterRating ? professional.rating === filterRating.toString() : true; // Only filter if rating is set
    const matchesGender = filterGender ? professional.gender === filterGender : true; // Add gender filter
    const matchesSpecialty = filterSpecialty ? professional.specialty === filterSpecialty : true; // Add specialty filter
    return matchesSearch && matchesRating && matchesGender && matchesSpecialty; // Return all matching conditions
  });

  const handleFilterRating = (rating) => {
    if (filterRating === rating) {
      setFilterRating(null); // Clear filter if the same rating is clicked
    } else {
      setFilterRating(rating); // Set new filter rating
    }
  };

  const handleGender = (value) => {
    // Check if "All" is selected; if so, reset the filter
    if (value === null) {
      setFilterGender(null); // Reset gender filter
    } else {
      setFilterGender(value);
    }
  };

  const handleSpecialty = (value) => {
    // Check if "All" is selected; if so, reset the filter
    if (value === null) {
      setFilterSpecialty(null); // Reset specialty filter
    } else {
      setFilterSpecialty(value);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <StarRating rating={item.rating} />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleContact(item)}>
        <Text style={styles.buttonText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Mental Health Professionals</Text>
        <TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text onPress={() => setIsFilterVisible(false)}>
              <SearchIcon onPress={() => setIsSearchVisible(!isSearchVisible)} /> {/* Search icon */}
            </Text>
            <Text>
              <FilterIcon onPress={() => setIsFilterVisible(!isFilterVisible)} /> {/* Filter icon */}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {isSearchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Enter name to search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
      {isFilterVisible && (
        <View style={styles.filterContainer}>
          <DropDownPicker
            open={openRating}
            value={filterRating}
            items={ratingOptions}
            setOpen={setOpenRating}
            setValue={handleFilterRating}
            placeholder="Select Rating"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
          <DropDownPicker
            open={openGender}
            value={filterGender}
            items={genderOptions}
            setOpen={setOpenGender}
            setValue={handleGender} // Use handleGender function
            placeholder="Select Gender"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
          <DropDownPicker
            open={openSpecialty}
            value={filterSpecialty}
            items={specialtyOptions}
            setOpen={setOpenSpecialty}
            setValue={handleSpecialty} // Use handleSpecialty function
            placeholder="Select Specialty"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
      )}
      <FlatList
        data={filteredProfessionals}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  searchInput: {
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    marginLeft: 10,
    // backgroundColor:'blue'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  filterContainer: {
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    zIndex:1000,
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 14,
    color: '#777',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default ProfessionalsList;
