import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { ActivityIndicator } from 'react-native';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import store from './store';
import FavoritesComponent from './components/FavoritesComponent';
import HomeComponent from './components/HomeComponent';
import ShopComponent from './components/ShopComponent';
import DetailsComponent from './components/DetailsComponent';
import SearchByCategoryComponent from './components/SearchByCategoryComponent';
import SearchByIngredientComponent from './components/SearchByIngredientComponent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCocktailData = async () => {
    try {
      const apiUrl = 'http://www.thecocktaildb.com/api/json/v1/1/random.php';
      const cocktailData = [];

      for (let i = 0; i < 10; i++) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cocktailData.push(data.drinks[0]);
      }

      setCocktails(cocktailData);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching cocktail data:', error);
    }
  };

  useEffect(() => {
    fetchCocktailData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Random cocktails">
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconComponent;
                    if (route.name === 'Home') {
                      iconComponent = <Icon name="glass" size={size} color={color} />;
                    } else if (route.name === 'Search') {
                      iconComponent = <Icon name="search" size={size} color={color} />;
                    } else if (route.name === 'Favorites') {
                      iconComponent = <Icon name="heart" size={size} color={color} />;
                    } else if (route.name === 'Shop') {
                      iconComponent = <Icon name="shopping-cart" size={size} color={color} />;
                    }
                    return iconComponent;
                  },
                  tabBarActiveTintColor: '#900',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: [
                    {
                      display: 'flex',
                    },
                    null,
                  ],
                })}
              >
                <Tab.Screen
                  name="Home"
                  
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="List">
                        {() => <HomeComponent cocktails={cocktails} />}
                      </Stack.Screen>
                      <Stack.Screen name="Details" component={DetailsComponent} />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Favorites">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Favorites List">
                        {() => <FavoritesComponent cocktails={cocktails} />}
                      </Stack.Screen>
                      <Stack.Screen name="Details" component={DetailsComponent} />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Shop" component={ShopComponent} />
              </Tab.Navigator>
            )}
          </Drawer.Screen>
          <Drawer.Screen name="Search by category" component={SearchByCategoryComponent} />
          <Drawer.Screen name="Search by ingredient" component={SearchByIngredientComponent} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
