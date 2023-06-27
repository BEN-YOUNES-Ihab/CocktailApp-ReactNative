import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

function ShopComponent({ cart, addToCart, removeFromCart }) {
  const getIngredientCount = (ingredient) => {
    return cart.filter((item) => item === ingredient).length;
  };

  const handleIncrement = (ingredient) => {
    addToCart(ingredient);
  };

  const handleDecrement = (ingredient) => {
    removeFromCart(ingredient);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Shopping Cart</Text>
      </View>
      <ScrollView>
        {cart.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : (
          <View>
            {Array.from(new Set(cart)).map((ingredient, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image
                  source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png` }}
                  style={styles.ingredientImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{ingredient}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecrement(ingredient)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{getIngredientCount(ingredient)}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleIncrement(ingredient)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            
          </View>
        )}
    </ScrollView>
    <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Place Order</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  orderButton: {
    backgroundColor: '#900',
    margin: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (ingredient) => dispatch({ type: 'ADD_TO_CART', payload: ingredient }),
  removeFromCart: (ingredient) => dispatch({ type: 'REMOVE_FROM_CART', payload: ingredient }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopComponent);
