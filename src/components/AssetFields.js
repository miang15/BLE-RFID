import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import Images from '../constants/Images';
import Theme from '../utils/Theme';
import CustomInput from './CustomInput';
import {CheckBox} from 'react-native-elements';
import Button from './Button';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AssetFields = ({
  isVisible,
  setIsVisible,
  selectedOption,
  title,
}) => {
  const [next, setNext] = useState(false);
  const [mydata, setMyData] = useState([
    {
      id: 1,
      label: 'Category',
      check: false,
    },
    {
      id: 2,
      label: 'Description',
      check: false,
    },
    {
      id: 3,
      label: 'Assigned To',
      check: false,
    },
    {
      id: 4,
      label: 'Last Scanned Date',
      check: false,
    },
    {
      id: 5,
      label: 'Due Date',
      check: false,
    },
    {
      id: 6,
      label: 'Site',
      check: false,
    },
    {
      id: 7,
      label: 'Location',
      check: false,
    },
  ]);

  const [data, setData] = useState([
    {
      id: 1,
      label: 'Description',
    },
    {
      id: 2,
      label: 'Category',
    },
    {
      id: 3,
      label: 'Assigned To',
    },
  ]);

  const handleOptions = val => {
    const clone = [...mydata];
    clone[val].check = !clone[val].check;
    setMyData(clone);
  };

  return (
    <View style={styles.centeredView}>
      <ReactNativeModal
        isVisible={isVisible}
        onBackButtonPress={setIsVisible}
        onBackdropPress={setIsVisible}
        animationIn={'slideInLeft'}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={Images.logo}
              />
            </View>
            {next ? (
              <>
                <TouchableOpacity
                  style={{marginTop: Theme.hp('2%')}}
                  onPress={() => setNext(!next)}>
                  <Ionicons name="arrow-back" size={24} color={Theme.black} />
                </TouchableOpacity>
                <Text style={{...styles.title, marginTop: '1%'}}>
                  Choose Order of Fields
                </Text>
                <DraggableFlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  onDragEnd={({data}) => setData({data})}
                  keyExtractor={item => item.id}
                  renderItem={({item, drag}) => (
                    <ScaleDecorator>
                      <TouchableOpacity
                        onLongPress={drag}
                        style={styles.options}>
                        <Text style={styles.label}>{item.label}</Text>
                        <MaterialIcons
                          name="drag-handle"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </ScaleDecorator>
                  )}
                />
              </>
            ) : (
              <>
                <Text style={styles.title}>
                  Choose Three Asset Fields to Show
                </Text>
                <CustomInput
                  alignSelf={'center'}
                  label={'Search'}
                  source={Images.search}
                  width={Theme.wp('65%')}
                  disabled={true}
                  inputWidth={Theme.wp('60%')}
                />
                <FlatList
                  style={{
                    marginTop: Theme.hp('2%'),
                    alignSelf: 'center',
                    flexGrow: 0,
                  }}
                  data={mydata}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => handleOptions(index)}
                      style={styles.options}>
                      <Text style={styles.label}>{item.label}</Text>
                      <CheckBox
                        uncheckedColor={Theme.grayText}
                        size={18}
                        containerStyle={{
                          borderWidth: 0,
                          padding: 2,
                          width: Theme.wp('5%'),
                          backgroundColor: Theme.white,
                        }}
                        checkedColor={Theme.primary}
                        checked={item.check}
                        onPress={() => handleOptions(index)}
                      />
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                />
                <Button
                  width={Theme.wp('75%')}
                  onPress={() => setNext(true)}
                  top={Theme.hp('2%')}
                  title={'NEXT'}
                />
              </>
            )}
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default AssetFields;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Theme.white,
    borderRadius: 20,
    height: Theme.hp('70%'),
    width: Theme.wp('85%'),
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imgView: {
    top: -22,
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    backgroundColor: Theme.primary,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  img: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    tintColor: Theme.white,
  },
  title: {
    color: Theme.black,
    fontSize: Theme.hp('3%'),
    textAlign: 'center',
    marginBottom: Theme.hp('2%'),
    marginTop: Theme.hp('3%'),
  },
  options: {
    backgroundColor: Theme.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: Theme.hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Theme.wp('70%'),
  },
  label: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
  },
});
