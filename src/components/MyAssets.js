import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../constants/Images';
import Theme from '../utils/Theme';

const MyAssets = ({
  marginVertical,
  marginHorizontal,
  top,
  bottom,
  label,
  value,
  source,
  gradientColor,
  onPress
}) => {
  const styles = StyleSheet.create({
    topView: {
      borderRadius: 5,
      backgroundColor: Theme.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      margin: '1%',
      marginVertical: marginVertical ? marginVertical : null,
      marginHorizontal: marginHorizontal ? marginHorizontal : null,
      marginTop: top ? top : null,
      marginBottom: bottom ? bottom : null,
      borderRadius: 5,
    },
    gradient: {
      paddingLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',

      borderRadius: 5,
    },
    innerColumn: {
      justifyContent: 'space-between',
      paddingVertical: 8,
      width: Theme.wp('70%'),
    },
    label: {
      color: Theme.white,
      fontSize: Theme.hp('2.2%'),
      fontWeight: 'bold',
    },
    value: {
      color: Theme.white,
      fontSize: Theme.hp('3%'),
      fontWeight: 'bold',
    },
    img: {
      width: 90,
      height: 90,
      alignSelf: 'flex-end',
      opacity: 0.3,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.topView}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={gradientColor}
        style={styles.gradient}>
        <View style={styles.innerColumn}>
          <Text numberOfLines={1} style={styles.label}>
            {label}
          </Text>
          <Text numberOfLines={1} style={styles.value}>
            {value}
          </Text>
        </View>
        <ImageBackground
          imageStyle={{tintColor: Theme.gray}}
          style={styles.img}
          source={source}
          resizeMode="contain"
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MyAssets;
