import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Database from '../Database';
import CustomImage from "../component/PycoImage";
const db = new Database();
export default class FavoriteView extends Component {

  state = {
    isLoading: false,
    listUser: []
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Favorite',      
    }
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    let listUser = [];
    db.getPycoUsers().then((data) => {
      listUser = data;
      this.setState({
        listUser,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    const user = item.user
    return (
    <View>
      <CustomImage styleView={{width: 80, height: 80, margin: 10}} style={{margin: 4}} uri={user.picture}/>
    </View>    
    )
  }
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    if(this.state.listUser.length === 0){
      return(
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      )
    }
    return (
      <FlatList
        contentContainerStyle={{alignSelf: 'center', alignItems: 'stretch'}}
        style={{padding: 8}}
        numColumns={3}
        keyExtractor={this.keyExtractor}
        data={this.state.listUser}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red'
  }
});