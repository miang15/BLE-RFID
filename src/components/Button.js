import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Theme from '../utils/Theme';

const Button = ({
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
  color,
  customStyle
}) => {
  const styles = StyleSheet.create({
    Btn: {
      backgroundColor: backgroundColor ? backgroundColor : Theme.darkPurpleBtn,
      marginVertical: marginVertical ? marginVertical : '1%',
      marginHorizontal: marginHorizontal ? marginHorizontal : '1%',
      width: width ? width : null,
      marginTop: top ? top : null,
      marginBottom: bottom ? bottom : null,
      alignItems: 'center',
      paddingVertical: paddingVertical ? paddingVertical : 15,
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 15,
      borderRadius: 5,
    },
    btnTxt: {
      color: color ? color : Theme.secondary,
      fontSize: Theme.hp('2.2%'),
    },
  });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[styles.Btn, customStyle]}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
