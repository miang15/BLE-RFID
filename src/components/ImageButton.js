import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Theme from '../utils/Theme';
import Images from '../constants/Images';

const ImageButton = ({
  backgroundColor,
  marginVertical,
  marginHorizontal,
  paddingVertical,
  width,
  top,
  bottom,
  paddingHorizontal,
  disabled,
  onPress,
  title,
  alignSelf,
  color,
  customStyle,
  source,
}) => {
  const styles = StyleSheet.create({
    Btn: {
      backgroundColor: backgroundColor ? backgroundColor : Theme.darkPurpleBtn,
      marginVertical: marginVertical ? marginVertical : '1%',
      marginHorizontal: marginHorizontal ? marginHorizontal : '1%',
      width: width ? width : '40%',
      marginTop: top ? top : null,
      marginBottom: bottom ? bottom : null,
      alignSelf: alignSelf ? alignSelf : 'center',
      paddingVertical: paddingVertical ? paddingVertical : 8,
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnTxt: {
      color: color ? color : Theme.secondary,
      fontSize: Theme.hp('1.5%'),
      marginHorizontal: Theme.wp('2%'),
    },
    imgView: {
      width: 15,
      height: 15,
      alignItems: 'center',
      overflow: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      tintColor: Theme.secondary,
    },
  });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[styles.Btn, customStyle]}>
      <View style={styles.imgView}>
        <Image style={styles.img} source={source} resizeMode="cover" />
      </View>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ImageButton;
