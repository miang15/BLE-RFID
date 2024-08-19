import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import Images from '../constants/Images';
import Theme from '../utils/Theme';
import CustomInput from './CustomInput';

const ListModal = ({
  isVisible,
  data,
  desc,
  onAdd,
  renderItem,
  setIsVisible,
  title,
  hideAddBtn
}) => {
  return (
    <View style={styles.centeredView}>
      <ReactNativeModal
        isVisible={isVisible}
        onBackButtonPress={setIsVisible}
        onBackdropPress={setIsVisible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={Images.logo}
              />
            </View>
            <Text style={styles.title}>{title}</Text>
            {data ? (
              <>
                <CustomInput
                  label={'Search'}
                  source={Images.search}
                  width={Theme.wp('65%')}
                  disabled={true}
                  inputWidth={Theme.wp('60%')}
                />
                <FlatList
                  style={{
                    height: Theme.hp('30%'),
                    padding: 5,
                    marginTop: Theme.hp('2%'),
                  }}
                  data={data}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => item.id}
                />
              </>
            ) : (
              <>
                <Text style={styles.desc}>{desc}</Text>
              </>
            )}
          { hideAddBtn ? null :  <TouchableOpacity
              onPress={onAdd}
              style={styles.btn}
              activeOpacity={0.6}>
              <Text style={styles.btnTxt}>Add new</Text>
            </TouchableOpacity> }
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default ListModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Theme.white,
    borderRadius: 20,
    width: Theme.wp('85%'),
    padding: 35,
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
  },
  label: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
  },
  desc: {
    marginVertical: '5%',
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    textAlign: 'center',
    alignSelf: 'center',
  },
  btn: {
    bottom: Theme.hp('1.5%'),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Theme.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  btnTxt: {
    color: Theme.secondary,
    fontSize: Theme.hp('1.8%'),
  },
});
