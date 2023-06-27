import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SearchByCategoryComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [cocktailData, setCocktailData] = useState([]);

  const fetchCocktailData = async () => {
    try {
      const apiUrl = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchText}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const limitedData = data.drinks.slice(0, 10); // Limit the list to 10 cocktails
      setCocktailData(limitedData);
    } catch (error) {
      console.log('Error fetching cocktail data:', error);
    }
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter category"
        placeholderTextColor="#999"
        onChangeText={handleSearchTextChange}
        value={searchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={fetchCocktailData}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.cocktailContainer}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.cocktailImage} />
      <Text style={styles.cocktailName}>{item.strDrink}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      <FlatList
        data={cocktailData}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  cocktailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  cocktailImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  cocktailName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#900',
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchByCategoryComponent;
