import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Theme from '../utils/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const OptionsList = ({options, onPress, onDelete}) => {
  return (
    <View  style={styles.options}>
      <Text numberOfLines={1} onPress={onPress} style={styles.label}>{options}</Text>
      <TouchableOpacity onPress={onDelete}>
      <MaterialIcons name="delete-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default OptionsList;

const styles = StyleSheet.create({
  options: {
    backgroundColor: Theme.white,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginVertical: Theme.hp('1%'),
    marginHorizontal:Theme.wp('0.1%'),
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-between"
  },
  label: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    paddingVertical:3,
    paddingHorizontal:10,
    width:Theme.wp('50%')
  },
});
