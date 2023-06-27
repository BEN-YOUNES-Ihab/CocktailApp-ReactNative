import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../actions';
import { useNavigation } from '@react-navigation/native';

function HomeComponent({ cocktails, favorites, addToFavorites, removeFromFavorites }) {
  const [searchText, setSearchText] = useState('');
  const isFavorite = (cocktail) => favorites.some(item => item.idDrink === cocktail.idDrink);
  const navigation = useNavigation();

  const handleFavorites = (cocktail) => {
    if (isFavorite(cocktail)) {
      removeFromFavorites(cocktail);
    } else {
      addToFavorites(cocktail);
    }
  };

  const navigateToDetails = (cocktail) => {
    navigation.navigate('Details', { cocktail });
  };

  const filteredCocktails = cocktails.filter(cocktail =>
    cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cocktails</Text>
        <TextInput
          style={styles.input}
          placeholder="Search by name"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <ScrollView>
        <View>
          {filteredCocktails.length === 0 ? (
            <Text style={styles.noResultsText}>Nothing to be found</Text>
          ) : (
            filteredCocktails.map((cocktail) => (
              <View key={cocktail.idDrink} style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.cocktailName}>{cocktail.strDrink}</Text>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => handleFavorites(cocktail)}
                  >
                    <Icon
                      name="heart"
                      size={20}
                      color={isFavorite(cocktail) ? 'red' : 'grey'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                  <TouchableOpacity
                    style={styles.imageTouchable}
                    onPress={() => navigateToDetails(cocktail)}
                  >
                    <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.cocktailImage} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cocktailImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  cocktailName: {
    fontSize: 22,
    marginRight: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (cocktail) => dispatch(addToFavorites(cocktail)),
  removeFromFavorites: (cocktail) => dispatch(removeFromFavorites(cocktail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
