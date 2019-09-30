/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import RootView from './src/screen/RootView';
import FavoriteView from './src/screen/FavoriteView';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: RootView},
  Favorite: {screen: FavoriteView},
});

const App = createAppContainer(MainNavigator);

export default App;