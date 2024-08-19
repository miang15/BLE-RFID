import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Theme from '../../utils/Theme';
import Images from '../../constants/Images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const Upcoming = ({item}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [check, setCheck] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.filterRow}>
          {check !== 1 ? (
            <Entypo name="dot-single" size={30} color={Theme.greenLight} />
          ) : null}
          <Text style={styles.filter}>FILTER</Text>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.imgView}>
            <Image
              style={styles.img}
              source={Images.filter}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Swiper showsPagination={true} activeDotColor={Theme.primary}>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Asset Tag Id</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"N121"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Title</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"Title here"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Status</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"Status here"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Due Date</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"due date here"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Site</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"Site here"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Location</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"Location here"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Category</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"Category here"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Maintenance By</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"Maintenance here"}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.labelText}>Completition Date</Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.content}>{"Completition Date"}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Swiper>
        {/* <Text style={styles.text2}>We can't find any upcoming maintenance</Text> */}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddMaintenance', {details: item})}
        style={styles.plusBtn}>
        <AntDesign name="plus" size={24} color={Theme.white} />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        // height={}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 15,
            height: 'auto',
          },
        }}>
        <View style={styles.bottomContainer}>
          <View style={styles.statusRow}>
            <Text style={styles.status}>STATUS</Text>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={styles.cross}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CheckBox
            title="All"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={20}
            checkedColor={Theme.primary}
            checked={check === 1 ? true : false}
            onPress={() => {
              setCheck(1), refRBSheet.current.close();
            }}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Theme.white,
              left: Theme.wp('-5%'),
            }}
            textStyle={{
              fontSize: Theme.hp('2%'),
              color: Theme.black,
              fontWeight: '500',
            }}
          />
          <CheckBox
            title="Scheduled"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={20}
            checkedColor={Theme.primary}
            checked={check === 2 ? true : false}
            onPress={() => {
              setCheck(2), refRBSheet.current.close();
            }}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Theme.white,
              left: Theme.wp('-5%'),
            }}
            textStyle={{
              fontSize: Theme.hp('2%'),
              color: Theme.black,
              fontWeight: '500',
            }}
          />
          <CheckBox
            title="In Progress"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={20}
            checkedColor={Theme.primary}
            checked={check === 3 ? true : false}
            onPress={() => {
              setCheck(3), refRBSheet.current.close();
            }}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Theme.white,
              left: Theme.wp('-5%'),
            }}
            textStyle={{
              fontSize: Theme.hp('2%'),
              color: Theme.black,
              fontWeight: '500',
            }}
          />
          <CheckBox
            title="On Hold"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={20}
            checkedColor={Theme.primary}
            checked={check === 4 ? true : false}
            onPress={() => {
              setCheck(4), refRBSheet.current.close();
            }}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Theme.white,
              left: Theme.wp('-5%'),
            }}
            textStyle={{
              fontSize: Theme.hp('2%'),
              color: Theme.black,
              fontWeight: '500',
            }}
          />
          <CheckBox
            title="Complete"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={20}
            checkedColor={Theme.primary}
            checked={check === 5 ? true : false}
            onPress={() => {
              setCheck(5), refRBSheet.current.close();
            }}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Theme.white,
              left: Theme.wp('-5%'),
            }}
            textStyle={{
              fontSize: Theme.hp('2%'),
              color: Theme.black,
              fontWeight: '500',
            }}
          />
          <CheckBox
            title="Expired"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={20}
            checkedColor={Theme.primary}
            checked={check === 6 ? true : false}
            onPress={() => {
              setCheck(6), refRBSheet.current.close();
            }}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Theme.white,
              left: Theme.wp('-5%'),
            }}
            textStyle={{
              fontSize: Theme.hp('2%'),
              color: Theme.black,
              fontWeight: '500',
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    borderBottomWidth: 0.3,
    borderColor: Theme.gray,
    paddingRight: 15,
  },
  filter: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginRight: Theme.wp('5%'),
    marginLeft: Theme.wp('0.5%'),
  },
  imgView: {
    width: 22,
    height: 22,
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  text2: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: Theme.wp('3%'),
    marginTop: Theme.hp('25%'),
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
  bottomContainer: {
    padding: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    fontWeight: '600',
  },
  rowView: {
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderColor: Theme.gray,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 15,
    color: Theme.black,
    fontWeight:'bold'
  },
  content: {
    fontSize: 15,
    color: Theme.black,
    paddingVertical: 5,
  },
});
