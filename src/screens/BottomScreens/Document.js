import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Document = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header onBackArrow={() => navigation.goBack()} arrow={true} title={'Document'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>We can't find any document</Text>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("AddDocument")} style={styles.plusBtn}>
        <AntDesign name="plus" size={24} color={Theme.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Document;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  text: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: Theme.wp('3%'),
    marginTop: Theme.hp('35%'),
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
