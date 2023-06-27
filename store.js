import { createStore } from 'redux';

const initialState = {
  favorites: [],
  cart: [],
  cocktails: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(cocktail => cocktail.idDrink !== action.payload.idDrink),
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
      case 'REMOVE_FROM_CART':
        const ingredientIndex = state.cart.findIndex((item) => item === action.payload);
        if (ingredientIndex !== -1) {
          const updatedCart = [...state.cart];
          updatedCart.splice(ingredientIndex, 1);
          return {
            ...state,
            cart: updatedCart,
          };
        }
        return state;
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
