import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const CustomImage = (props) => {

  const { uri , styleView } = props;

  return (
    <View style={[ styleView, styles.avatarConner, {borderRadius: styleView.width}]}>
        <Image
        style={[styles.avatarImag, {borderRadius: (styleView.width * 0.9 / 2)}]}
        source={{uri : uri}} 
        imageStyle={{resizeMode: 'cover'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
    avatarConner: {
        flex: 1,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#d6d7da',
        },

    avatarImag: {
        width: '90%',
        height: '90%',       
        },
})

export default CustomImage