// actions.js

export const addToFavorites = (cocktail) => {
  return {
    type: 'ADD_TO_FAVORITES',
    payload: cocktail,
  };
};

export const removeFromFavorites = (cocktail) => {
  return {
    type: 'REMOVE_FROM_FAVORITES',
    payload: cocktail,
  };
};

export const addToCart = (ingredient) => {
  return {
    type: 'ADD_TO_CART',
    payload: ingredient,
  };
};

export const RemoveFromCart = (ingredient) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: ingredient,
  };
};
