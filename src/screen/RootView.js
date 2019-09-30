import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Animated, PanResponder, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import PycoApiClient from '../NetworkService';
import {CustomButton} from '../component/PycoButton';

const SCREEN_WIDTH = Dimensions.get('window').width;
 
class SwipeableCardView extends Component
{
  constructor()
  {
    super();
 
    this.panResponder;
 
    this.state = { 
      
      Xposition: new Animated.Value(0), 

      RightText: false,

			LeftText: false, 
			
			title: '',
			content: '',
			selectedIdx: 0
    
  }
 
    this.CardView_Opacity = new Animated.Value(1);
  }
 
  componentWillMount()
  {
    this.panResponder = PanResponder.create(
    {
      onStartShouldSetPanResponder: (evt, gestureState) => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => true,
 
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
 
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
 
      onPanResponderMove: (evt, gestureState) =>
      {
        this.state.Xposition.setValue(gestureState.dx);
 
        if( gestureState.dx > SCREEN_WIDTH - 250 )
        {

          this.setState({ 
            
            RightText: true, 

            LeftText: false 
          });

        }
        else if( gestureState.dx < -SCREEN_WIDTH + 250 )
        {

          this.setState({ 

            LeftText: true, 

            RightText: false 

          });

        }
      },
 
      onPanResponderRelease: (evt, gestureState) =>
      {
        if( gestureState.dx < SCREEN_WIDTH - 150 && gestureState.dx > -SCREEN_WIDTH + 150 )
        {
        
          this.setState({ 

            LeftText: false,

            RightText: false 
            
          });
 
          Animated.spring( this.state.Xposition,
          {
            toValue: 0,
            speed: 5,
            bounciness: 10,
          }, { useNativeDriver: true }).start();
        }

        else if( gestureState.dx > SCREEN_WIDTH - 150 )
        {

          Animated.parallel(
          [          
            Animated.timing( this.state.Xposition,
            {
              toValue: SCREEN_WIDTH,
              duration: 200
            }),
 
            Animated.timing( this.CardView_Opacity,
            {
              toValue: 0,
              duration: 200
            })
          ], { useNativeDriver: true }).start(() =>
          {
            this.setState({ LeftText: false, RightText: false }, () =>
            {
              this.props.removeCardView();
              this.props.onSwipeRight();
            });
          }); 

        }
        else if( gestureState.dx < -SCREEN_WIDTH + 150 )
        {
          Animated.parallel(
          [          
            Animated.timing( this.state.Xposition,
            {
              toValue: -SCREEN_WIDTH,
              duration: 200
            }),
 
            Animated.timing( this.CardView_Opacity,
            {
              toValue: 0,
              duration: 200
            })
          ], { useNativeDriver: true }).start(() =>
          {
            this.setState({ LeftText: false, RightText: false }, () =>
            {
              this.props.removeCardView();              
            });
          });          
        }
      }
    });
	}
	
	_onPressButton = (idx) => {
		this.setState({
			selectedIdx: idx
		})		
		this._setDataToView(idx)
	}

	_setDataToView = () => {
		const { item } = this.props
		let idx = this.state.selectedIdx
		if (idx == 2) {
			let location = item.user.location
				this.state.title = 'My address is'
				this.state.content = location.street
		}
		if (idx == 0) {
			let name = item.user.name
			this.state.title = 'My name is'
			this.state.content = name.first + ' ' + name.last
		}
		if (idx == 1) {
			this.state.title = 'My email is'
			this.state.content = item.user.email
		}
		if (idx == 3) {
			this.state.title = 'My phone is'
			this.state.content = item.user.phone
		}
		if (idx == 4) {
			this.state.title = 'My password is'
			this.state.content = item.user.password
		}
	}
 
  render() {
    const rotateCard = this.state.Xposition.interpolate(
    {
       inputRange: [-200, 0, 200],
       outputRange: ['-20deg', '0deg', '20deg'],
		});
		
		const { item } = this.props
		this._setDataToView()
    return(

      <Animated.View {...this.panResponder.panHandlers} 
      style = {[ 
        styles.cardView, { backgroundColor: 'rgb(249, 249, 249)', 
        opacity: this.CardView_Opacity, 
        transform: [{ translateX: this.state.Xposition }, 
        { rotate: rotateCard }]}
        ]}>
					<View style={{marginTop: 80, backgroundColor: 'white'}}>
						<View style={styles.separatorView}></View>
						<View style={[styles.avatarConner, {marginTop: -70}]}>
							<Image
							style={styles.avatarImag}
							source={{uri : item.user.picture}} />
						</View>
						<View style={{alignItems: 'center', paddingVertical: 20}}>	
							<Text style={styles.titleText}>{this.state.title}</Text>
							<Text style={styles.contentText}>{this.state.content}</Text>
						</View>

						<View style={styles.bottomContainer}>
							<CustomButton iconName='user' isSelected={this.state.selectedIdx == 0 ? true : false} onPress={ () => this._onPressButton(0)}/>
							<CustomButton iconName='calendar' isSelected={this.state.selectedIdx == 1 ? true : false} onPress={ () => this._onPressButton(1)}/>
							<CustomButton iconName='map' isSelected={this.state.selectedIdx == 2 ? true : false} onPress={ () => this._onPressButton(2)}/>
							<CustomButton iconName='phone' isSelected={this.state.selectedIdx == 3 ? true : false} onPress={ () => this._onPressButton(3)}/>
							<CustomButton iconName='lock' isSelected={this.state.selectedIdx == 4 ? true : false} onPress={ () => this._onPressButton(4)}/>
						</View>
					</View>
      </Animated.View>
    );
  }
}
 
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
      console.log(item)
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
 
const styles = StyleSheet.create(
{
  mainContainer:
  {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
 
  cardView:
  {
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
  avatarConner: {
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  avatarImag: {
    height: 100,
    width: 100,
    borderRadius: 50
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
});