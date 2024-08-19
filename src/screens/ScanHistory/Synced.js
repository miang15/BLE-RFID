import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../../utils/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../constants/Images';

const Synced = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD75B" />
        <Text style={styles.desc}>
          Successfully Synced scan result will move to scynced tab
        </Text>
      </View>
      <View style={styles.norecordView}>
        <Image
          style={styles.noRecord}
          source={Images.noRecord}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text4}>No Results Found</Text>
      <Text style={styles.centerTxt}>
        We can't find any offline scan results
      </Text>
    </View>
  );
};

export default Synced;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
    marginHorizontal: Theme.wp('3%'),
    paddingVertical:15,
    backgroundColor:Theme.rowBackground
    
  },
  desc: {
    color: Theme.black,
    fontSize: Theme.hp('1.8%'),
    width: Theme.wp('85%'),
  },
  centerTxt: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('5%'),
    textAlign: 'center',
    marginTop: Theme.hp('3%'),
  },
  norecordView: {
    width: 100,
    height: 100,
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: Theme.hp('15%'),
  },
  noRecord: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  text4: {
    color: Theme.black,
    fontSize: Theme.hp('3%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: Theme.hp('2%'),
  },
});
