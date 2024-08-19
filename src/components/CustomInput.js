import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Theme from '../utils/Theme';

const CustomInput = ({
  vertical,
  width,
  top,
  bottom,
  alignSelf,
  horizontal,
  secureTextEntry,
  value,
  label,
  onChangeText,
  source,
  imgStyle,
  placeholder,
  editable,
  onPress,
  disabled,
  inputWidth,
}) => {
  const styles = StyleSheet.create({
    topView: {
      marginVertical: vertical ? vertical : '1%',
      marginHorizontal: horizontal ? horizontal : '1%',
      width: width ? width : null,
      alignSelf: alignSelf ? alignSelf : null,
      marginTop: top ? top : null,
      marginBottom: bottom ? bottom : null,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 5,
      borderBottomWidth: 1,
      borderColor: Theme.grayText,
    },
    label: {
      color: Theme.grayText,
      fontSize: Theme.hp('2%'),
      alignSelf: 'flex-start',
    },
    input: {
      color: Theme.black,
      fontSize: Theme.hp('2.5%'),
      overflow: 'hidden',
      width: inputWidth
        ? inputWidth
        : source
        ? Theme.wp('82%')
        : Theme.wp('90%'),
      height: 40,
    },
    imgView: {
      width: 22,
      height: 22,
      alignItems: 'center',
      overflow: 'hidden',
      alignSelf: 'center',
      marginTop: Theme.hp('1.5%'),
    },
    img: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      tintColor: Theme.grayText,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.topView}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          editable={editable}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
        />
      </View>
      <View style={[styles.imgView, imgStyle]}>
        <Image style={styles.img} source={source} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

export default CustomInput;
