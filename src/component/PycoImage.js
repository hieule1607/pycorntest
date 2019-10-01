import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';


export const CustomImage = (props) => {

  const { uri , styleView} = props;

  return (
    <View style={[ styleView, styles.avatarConner]}>
        <Image
        style={styles.avatarImag}
        source={{uri : uri}} />
    </View>
  );
};

const styles = StyleSheet.create({
    avatarConner: {
        flex: 1,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 55,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#d6d7da',
        },

    avatarImag: {
        flex: 0.9,
        borderRadius: 50
        },
})