import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const RightDrawerItem = () => {
  const [click, setClick] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clearBtn}>
        <Text style={styles.text1}>CLEAR FILTER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterRow}>
        <View style={styles.iconRow}>
          <Entypo name="location" size={15} color={Theme.black} />
          <Text style={styles.label}>Site</Text>
        </View>
        <AntDesign name="down" size={18} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterRow}>
        <View style={styles.iconRow}>
          <Entypo name="location" size={15} color={Theme.black} />
          <Text style={styles.label}>Location</Text>
        </View>
        <AntDesign name="down" size={18} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.filterRow, paddingLeft: 6}}>
        <View style={styles.iconRow}>
          <Ionicons name="reorder-three-sharp" size={16} color={Theme.black} />
          <Text style={styles.label}>Category</Text>
        </View>
        <AntDesign name="down" size={18} color="black" />
      </TouchableOpacity>
      <View style={styles.underLine} />
      <Text style={styles.text2}>STATUS</Text>
      <View style={styles.BtnRow}>
        <TouchableOpacity
          onPress={() => setClick(1)}
          style={{
            ...styles.btn,
            backgroundColor: click === 1 ? '#00E681' : Theme.gray,
          }}>
          <Text
            style={{
              ...styles.btnTxt,
              color: click === 1 ? Theme.white : Theme.black,
            }}>
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setClick(2)}
          style={{
            ...styles.btn,
            backgroundColor: click === 2 ? '#F59F00' : Theme.gray,
          }}>
          <Text
            style={{
              ...styles.btnTxt,
              color: click === 2 ? Theme.white : Theme.black,
            }}>
            Check Out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BtnRow}>
        <TouchableOpacity
          onPress={() => setClick(3)}
          style={{
            ...styles.btn,
            backgroundColor: click === 3 ? '#0198E6' : Theme.gray,
          }}>
          <Text
            style={{
              ...styles.btnTxt,
              color: click === 3 ? Theme.white : Theme.black,
            }}>
            Dispose
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setClick(4)}
          style={{
            ...styles.btn,
            backgroundColor: click === 4 ? Theme.red : Theme.gray,
          }}>
          <Text
            style={{
              ...styles.btnTxt,
              color: click === 4 ? Theme.white : Theme.black,
            }}>
            Lost
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.underLine} />
      <Text style={styles.text2}>CUSTOM FIELDS</Text>
      {/* <Menu>
      <MenuTrigger  >
      <TouchableOpacity style={styles.filterRow}>
        <View style={styles.iconRow}>
          <Entypo name="location" size={15} color={Theme.black} />
          <Text style={styles.label}>Location</Text>
        </View>
        <AntDesign name="down" size={18} color="black" />
      </TouchableOpacity>
      </MenuTrigger>

      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
        <MenuOption onSelect={() => alert(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu> */}
    </View>
  );
};

export default RightDrawerItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  clearBtn: {
    borderBottomWidth: 0.5,
    borderColor: Theme.gray,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'flex-end',
  },
  text1: {
    color: Theme.red,
    fontSize: Theme.hp('2%'),
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Theme.gray,
    marginHorizontal: Theme.wp('2%'),
    marginTop: Theme.hp('3%'),
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginLeft: Theme.hp('1%'),
  },
  underLine: {
    borderWidth: 0.3,
    borderColor: Theme.gray,
    marginTop: Theme.hp('3%'),
  },
  text2: {
    color: Theme.primary,
    fontSize: Theme.hp('2%'),
    fontWeight: '600',
    marginTop: Theme.hp('3%'),
    marginHorizontal: Theme.wp('4%'),
  },
  BtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.hp('2%'),
    marginHorizontal: Theme.hp('3%'),
  },
  btn: {
    backgroundColor: Theme.gray,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginRight: Theme.wp('3%'),
    borderRadius: 20,
    justifyContent: 'center',
  },
  btnTxt: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
  },
  triggerStyles: {
    backgroundColor: 'red',
  },
});
