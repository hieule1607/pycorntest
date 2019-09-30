import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

export default class FavoriteView extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Favorite',      
    }
  };

  componentDidMount() {

  }
  
  render() {
    return (
      <View style>
        <Text>This is FavoriteView</Text>
      </View>
    );
  }
}

