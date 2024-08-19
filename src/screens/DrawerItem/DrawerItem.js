import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';
import Theme from '../../utils/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerItem = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.topView}>
        <View style={styles.imgView}>
          <Image style={styles.img} source={Images.user} resizeMode="cover" />
        </View>
        <Text style={styles.name}>Mian Nouman</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          style={styles.headingView}
          start={{x: -0.5, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#B5A3CD', '#6536A0']}>
          <Text style={styles.heading}>Assets</Text>
        </LinearGradient>
        <View style={styles.labelTopView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAssets')}
            style={styles.labelView}>
            <AntDesign name="plus" size={15} color={Theme.secondary} />
            <Text style={styles.label}>Add Asset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.labelTopView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RightDrawerIndex')}
            style={styles.labelView}>
            <MaterialCommunityIcons
              name="eye-outline"
              size={15}
              color={Theme.secondary}
            />
            <Text style={styles.label}>View Asset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.underline} />
        <TouchableOpacity
          onPress={() => navigation.navigate('StartScan')}
          style={styles.textView}>
          <Text style={styles.text1}>Start Scan</Text>
        </TouchableOpacity>
        <View style={styles.underline} />
        <TouchableOpacity onPress={() => navigation.navigate("MyDevices")} style={styles.textView}>
          <Text style={styles.text1}>My Devices</Text>
        </TouchableOpacity>
        <View style={styles.underline} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ScanHistory')}
          style={styles.textView}>
          <Text style={styles.text1}>Scan History</Text>
        </TouchableOpacity>
        <View style={styles.underline} />
        <TouchableOpacity style={styles.textView}>
          <Text style={styles.text1}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primary,
  },
  topView: {
    padding: 15,
    borderBottomWidth: 0.3,
    borderColor: Theme.lightPurple,
    marginHorizontal: '15%',
  },
  imgView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: Theme.lightPurple,
    padding: 10,
    alignSelf: 'center',
    marginTop: Theme.hp('2%'),
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.grayText,
  },
  name: {
    color: Theme.white,
    fontSize: Theme.hp('2.2%'),
    textAlign: 'center',
    marginTop: Theme.hp('1.5%'),
  },
  headingView: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: Theme.hp('5%'),
    marginBottom: Theme.hp('0.8%'),
  },
  heading: {
    color: Theme.secondary,
    fontSize: Theme.hp('2.3%'),
  },
  labelTopView: {
    paddingVertical: 10,
    alignItems: 'flex-end',
    marginRight: Theme.wp('2%'),
    marginBottom: Theme.hp('1%'),
  },
  labelView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Theme.wp('60%'),
  },
  label: {
    color: Theme.white,
    marginLeft: Theme.wp('2.5%'),
    fontSize: Theme.hp('2.2%'),
  },
  underline: {
    borderWidth: 0.3,
    borderColor: Theme.lightPurple,
    marginHorizontal: Theme.wp('10%'),
  },
  textView: {
    alignSelf: 'flex-end',
    marginTop: Theme.hp('3.5%'),
    width: Theme.wp('63%'),
    marginRight: Theme.wp('2%'),
    paddingVertical: 8,
    marginBottom: Theme.hp('3.5%'),
  },
  text1: {
    color: Theme.white,
    fontSize: Theme.hp('2.2%'),
  },
});
