import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Theme from '../../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Depreciation = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        onBackArrow={() => navigation.goBack()}
        arrow={true}
        title="DEPRECIATION"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Asset not set as Depreciable</Text>
      </ScrollView>
      <TouchableOpacity
      onPress={() => navigation.navigate("ManageDepreciation")}
        style={styles.plusBtn}>
        <AntDesign name="plus" size={24} color={Theme.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Depreciation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  text: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: Theme.wp('3%'),
    marginTop: Theme.hp('40%'),
  },
  plusBtn: {
    backgroundColor: Theme.greenLight,
    marginBottom: Theme.hp('3%'),
    padding: 15,
    alignSelf: 'flex-end',
    borderRadius: 30,
    marginRight: Theme.wp('5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
