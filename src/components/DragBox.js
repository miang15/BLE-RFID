import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Theme from '../utils/Theme';

const DragBox = ({myImage, onAddPress, onCrossPress}) => {

  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      marginVertical: '1%',
      borderStyle: 'dotted',
      borderColor: Theme.primary,
      alignSelf: 'flex-start',
      width: Theme.wp('30%'),
      height: Theme.hp('14%'),
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
    },
    cross: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 999,
      backgroundColor: Theme.white,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
  });

  const pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(image => {
        setMyImage(image.path);
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  };

  return (
    <>
      <View  style={styles.container}>
        {myImage ? (
          <TouchableOpacity
            onPress={onCrossPress}
            style={styles.cross}>
            <Entypo name="cross" size={24} color={Theme.primary} />
          </TouchableOpacity>
        ) : null}
        {myImage ? (
          <Image
            resizeMode="cover"
            style={styles.img}
            source={{uri: myImage}}
          />
        ) : (
          <TouchableOpacity onPress={onAddPress}>
          <Entypo name="plus" size={30} color={Theme.primary} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default DragBox;
