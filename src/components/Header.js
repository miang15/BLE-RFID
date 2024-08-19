import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Images from '../constants/Images';
import Theme from '../utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
const Header = ({
  onMenuPress,
  arrow,
  plus,
  onPlus,
  scanIcon,
  onBackArrow,
  onScan,
  title,
  editIcon,
  onEditPress,
  cross,
  onCrossPress
}) => {
  const styles = StyleSheet.create({
    topView: {
      backgroundColor: Theme.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: arrow || plus || editIcon || cross ? 15 : 10 ,
      paddingHorizontal:10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    menuView: {
      width: 25,
      height: 25,
      alignItems: 'center',
      overflow: 'hidden',
    },
    menu: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
    },
    scanView: {
      width: 40,
      height: 40,
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: Theme.primary,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 30,
    },
    scan: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      tintColor: Theme.secondary,
    },
    title: {
      color: Theme.primary,
      fontSize: Theme.hp('2.2%'),
    },
    writeView: {
      width:25,
      height:25,
      alignItems:"center",
      overflow:'hidden'
    },
    write: {
      width:'100%',
      height:'100%',
      alignSelf:'center',
      tintColor:Theme.primary
    },
    
  });
  return (
    <View style={styles.topView}>
      {arrow ? (
        <TouchableOpacity onPress={onBackArrow}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
      ) : cross ? (
        <TouchableOpacity disabled={true} style={styles.menuView}>
          <Image
            style={{...styles.menu, tintColor:Theme.white}}
            source={Images.menu}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuView}>
          <Image
            style={styles.menu}
            source={Images.menu}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {plus ? (
        <TouchableOpacity onPress={onPlus}>
          <Entypo name="plus" size={24} color={Theme.primary} />
        </TouchableOpacity>
      ) : scanIcon ? (
        <TouchableOpacity onPress={onScan} style={styles.scanView}>
          <Image
            style={styles.scan}
            source={Images.scan}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : editIcon ? (
          <TouchableOpacity onPress={onEditPress} style={styles.writeView}>
            <Image style={styles.write} source={Images.write} resizeMode='contain' />
          </TouchableOpacity>
      ) : cross ? (
        <TouchableOpacity onPress={onCrossPress}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
      )
      :
      (
        <TouchableOpacity disabled={true}>
          <Ionicons name="arrow-back-outline" size={24} color={Theme.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
