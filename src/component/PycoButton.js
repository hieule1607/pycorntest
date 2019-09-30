import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SlIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

export const CustomButton = (props) => {

  const { isSelected, iconName = 'lock', onPress } = props;

  return (
    <View>	
      <AntIcon name="caretup" size={10} color={isSelected ? 'green' : 'white'} style={{marginBottom: -5, alignSelf:'center'}}/>
      <View style={[isSelected ? styles.enableView : styles.disableView, {height: 2, marginHorizontal: 4}]}>										
      </View>
      <TouchableOpacity style={{padding: 10}} activeOpacity={1}
        onPress={onPress}>
        <SlIcon name={iconName} size={30} color={isSelected ? 'green' : 'rgb(217, 217, 217)'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  enableView: {
    backgroundColor: 'green'
  },
  disableView: {
    backgroundColor: 'white'
  },
})