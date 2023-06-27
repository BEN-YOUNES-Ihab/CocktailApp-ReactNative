import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../actions';
import { useNavigation } from '@react-navigation/native';

function FavoritesComponent({ favorites, addToFavorites, removeFromFavorites }) {
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Favorite Cocktails</Text>
        </View>
        {favorites.length === 0 ? (
          <Text style={styles.noFavoritesText}>Your favorites list is empty</Text>
        ) : (
          <View>
            {favorites.map((cocktail) => (
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
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 10,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
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
  noFavoritesText: {
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);
