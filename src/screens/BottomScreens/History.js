import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import Images from '../../constants/Images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Entypo from 'react-native-vector-icons/Entypo'

const History = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Header
        arrow={true}
        onBackArrow={() => navigation.goBack()}
        title="HISTORY"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topView}>
          <TouchableOpacity onPress={showDatePicker} style={styles.rowView}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={Images.calendar}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.text1}>Change Date</Text>
          </TouchableOpacity>
          <View style={styles.underline} />
          <View style={styles.centerRow}>
            <TouchableOpacity style={styles.left}>
              <AntDesign name="left" size={24} color={Theme.white} />
            </TouchableOpacity>
            <View style={styles.centerView}>
              <Text style={styles.date}>
                15 FEBRUARY <Text style={styles.year}>2022</Text>
              </Text>
              <Text style={styles.day}>Tuesday</Text>
            </View>
            <TouchableOpacity style={styles.right}>
              <AntDesign name="right" size={24} color={Theme.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textRow}>
        <Entypo name="dot-single" size={30} color={Theme.greenLight} />
          <View style={styles. statusView}>
            <Text style={styles.desc}>User changed the status from Disposed to Available</Text>
            <Text style={styles.descTime}>05:30 AM</Text>
          </View>
        </View>
        <View style={styles.textRow}>
        <Entypo name="dot-single" size={30} color={Theme.greenLight} />
          <View style={styles. statusView}>
            <Text style={styles.desc}>User changed the status from Available to Disposed</Text>
            <Text style={styles.descTime}>05:30 AM</Text>
          </View>
        </View>
      </ScrollView>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  topView: {
    backgroundColor: Theme.primary,
    height: Theme.hp('25%'),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: '3%',
  },
  imgView: {
    width: 20,
    height: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.white,
  },
  text1: {
    color: Theme.white,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('3%'),
  },
  underline: {
    borderWidth: 0.3,
    borderColor: Theme.white,
    opacity: 0.6,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Theme.hp('3%'),
    marginHorizontal: Theme.wp('3%'),
  },
  left: {
    alignSelf: 'center',
    marginTop: Theme.hp('1.5%'),
  },
  right: {
    alignSelf: 'center',
    marginTop: Theme.hp('1.5%'),
  },
  centerView: {
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  date: {
    color: Theme.white,
    fontSize: Theme.hp('3%'),
  },
  year: {
    color: Theme.white,
    fontSize: Theme.hp('2.2%'),
  },
  day: {
    color: Theme.yellow,
    fontSize: Theme.hp('2.8%'),
    marginTop: Theme.hp('1%'),
  },
  textRow: {
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-between',
    marginVertical:Theme.hp('1%'),
    paddingHorizontal:5,
    marginHorizontal:Theme.wp('1%')
  },
  statusView: {
    width:Theme.wp('90%'),
    alignItems:"flex-start"
  },
  desc: {
    color:Theme.black,
    fontSize:Theme.hp('2%'),
    marginRight:Theme.wp('1%')
  },
  descTime: {
    color:Theme.grayText,
    fontSize:Theme.hp('1.5%')
  }
});
