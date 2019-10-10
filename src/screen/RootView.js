import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import PycoApiClient from '../NetworkService';
import SwipeableCardView from '../component/SwipeableCardView';
import Database from '../Database';

const db = new Database();

export default class RootView extends Component {
		state = { 
			listUser: [], 
			noMoreCard: false 
    };
    
    
    static navigationOptions = ({navigation}) => {
      return {
        title: 'Home',
        headerLeft: (
          <Button transparent onPress={navigation.getParam('getListUser')}>
            <Icon name='refresh' />
          </Button>
        ),
        headerRight: (
          <Button transparent onPress={() => navigation.navigate('Favorite', {})}>
            <Icon name='thumbs-up' />
          </Button>
        ),
      }
    };
    

    componentWillMount() {
      db.initDB() // init local db for the first time launch app
    }

		componentDidMount() {      
      this.props.navigation.setParams({ getListUser: this.getDataFromAPi });
			this.getDataFromAPi()
			if( this.state.listUser.length == 0 )
			{
				this.setState({ noMoreCard: true });
			}
		}

		getDataFromAPi = () => {
			let url = "https://randomuser.me/api/0.4/?randomapi"
			PycoApiClient.sendRequestToBackend(url, null, 'GET', this.onDataReceived)
		}

		onDataReceived = (responseData) => {
      console.log(responseData)
      this.setState({
        listUser: responseData.results,
        noMoreCard: responseData.results.length !== 0 ? false : true
        });
		}
 
		removeCardView = (id) => {
			this.state.listUser.splice( this.state.listUser.findIndex( x => x.id == id ), 1 );
	
			this.setState({ listUser: this.state.listUser }, () =>
			{
				if( this.state.listUser.length == 0 )
				{
					this.setState({ noMoreCard: true });
				}
			});
    }
    
    onSwipeRight = (item) => {
      db.addPycoUser(item).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    }
    
  render() {
    return(
			<Container>
					{ this.state.listUser.length > 0 && 
						<View style = { styles.mainContainer }>
							{
								this.state.listUser.map(( item, key ) =>
								(
									<SwipeableCardView key = { key } item = { item } onSwipeRight={ this.onSwipeRight.bind(this, item) } removeCardView = { this.removeCardView.bind( this, item.id ) }/>
								))
							}
						</View>
					}
				{
					( this.state.noMoreCard )
					?
						(
							<Text style = {{ padding: 10, alignSelf: 'center', fontSize: 22, color: '#000' }}>No More CardViews Found.</Text>
						)
					:
						null
				}
				</Container>
    );
  }
}

const styles = StyleSheet.create( {
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
 
  cardView: {
    width: '75%',
    justifyContent: 'center',
    position: 'absolute',
		borderRadius: 2,
		shadowColor: 'rgb(217, 217, 217)',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.8,
  },
 
	bottomContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		alignSelf: 'center'
		},
	buttonIcon: {
		backgroundColor: 'rgb(217, 217, 217)',
		fontSize: 30
	},
	cardContainer: {
		backgroundColor: 'rgb(249, 249, 249)',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20    
  },    

  separatorView: {
    backgroundColor: 'rgb(228,228,228)',
    height: 1
  },
  titleText: {
    fontSize: 15,
    color: 'rgb(153, 153, 153)'
  },
  contentText: {
		flex: 1,
		flexWrap: 'wrap',
		alignContent: 'center',
		padding: 6,
		fontSize: 20,
  },
  cardRightText: {
    left: 32,
    position: 'absolute',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  cardLeftText: {
    right: 32,
    position: 'absolute',
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  styleView: {
    width: 110, 
    height: 110, 
    marginTop: -70
  }
});