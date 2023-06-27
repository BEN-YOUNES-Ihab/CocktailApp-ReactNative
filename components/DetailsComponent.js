import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addToFavorites, removeFromFavorites, addToCart } from '../actions';

function DetailsComponent({ route, favorites, addToFavorites, removeFromFavorites, addToCart }) {
  const cocktail = route.params.cocktail;

  const isFavorite = (cocktail) => favorites.some((item) => item.idDrink === cocktail.idDrink);

  const handleFavorites = (cocktail) => {
    if (isFavorite(cocktail)) {
      removeFromFavorites(cocktail);
    } else {
      addToFavorites(cocktail);
    }
  };

  const handleAddToCart = (ingredient) => {
    addToCart(ingredient);
  };

  const renderIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (cocktail[ingredientKey] && cocktail[measureKey]) {
        ingredients.push(
          <View key={i} style={styles.ingredientsRow}>
            <Image
              source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${cocktail[ingredientKey]}.png` }}
              style={styles.ingredientImage}
            />
            <Text style={styles.ingredientItem}>{cocktail[ingredientKey]}</Text>
            <Text style={styles.ingredientItem}>{cocktail[measureKey]}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(cocktail[ingredientKey])}
            >
              <Icon name="cart-plus" size={20} color="grey" />
            </TouchableOpacity>
          </View>
        );
      }
    }
    return ingredients;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View key={cocktail.idDrink} style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.cocktailName}>{cocktail.strDrink}</Text>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => handleFavorites(cocktail)}>
              <Icon name="heart" size={20} color={isFavorite(cocktail) ? 'red' : 'grey'} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.cocktailImage} />
          </View>
          <Text style={styles.description}>{cocktail.strInstructions}</Text>
        </View>
        <View style={styles.ingredientContainer}>
          <Text style={styles.ingredientText}>Ingredients</Text>
          {renderIngredients(cocktail)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    alignItems: 'center',
    margin: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  cocktailItem: {
    marginBottom: 20,
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
  description: {
    marginTop: 20,
    fontSize: 16,
  },
  ingredientContainer: {
    alignItems: 'center',
  },
  ingredientText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  columnTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  ingredientsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ingredientImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  ingredientItem: {
    flex: 1,
    fontSize: 16,
  },
  addToCartButton: {
    padding: 5,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (cocktail) => dispatch(addToFavorites(cocktail)),
  removeFromFavorites: (cocktail) => dispatch(removeFromFavorites(cocktail)),
  addToCart: (ingredient) => dispatch(addToCart(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsComponent);
