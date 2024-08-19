import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Theme from '../../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const Manage = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        {/* <Text style={styles.text}>We can't find any maintenance</Text> */}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddMaintenance',{details: item})}
        style={styles.plusBtn}>
        <AntDesign name="plus" size={24} color={Theme.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Manage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  text: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('3%'),
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: Theme.hp('30%'),
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
