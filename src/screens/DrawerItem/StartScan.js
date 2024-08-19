import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import Theme from '../../utils/Theme';
import {CheckBox} from 'react-native-elements';
import Images from '../../constants/Images';
import Feather from 'react-native-vector-icons/Feather';
import CustomInput from '../../components/CustomInput';
import EmptyModal from '../../components/EmptyModal';
import Button from '../../components/Button';
// import BarcodeScanner from 'react-native-scan-barcode';

const StartScan = ({navigation}) => {
  const [check, setCheck] = useState('');
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [disable, setDisabled] = useState(true);

//  const [barcode, setBarcode] = useState('')
//   const  [cameraType, setCameraType] = useState('back')
//     const  [text, setText] = useState('Scan Barcode')
//     const  [torchMode, setTorchMode] = useState('on')
//     const [type, setType] = useState('')

//     const  barcodeReceived = (e) => {
//       if (e.data !== barcode || e.type !== type) Vibration.vibrate();
//       setBarcode(e.data)
//       setText(`${e.data} (${e.type})`)
//       setType(e.type)
//     }

  return (
    <View style={styles.container}>
      <Header
        onBackArrow={() => navigation.goBack()}
        arrow={true}
        title="SCAN"
      />
      <ScrollView
        style={{backgroundColor: Theme.secondary}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text1}>Choose Scan Option</Text>
        <View style={styles.topView}>
          <TouchableOpacity onPress={() => setCheck(1)} style={styles.topRow}>
            <View style={styles.innerRow}>
              <CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                size={20}
                checkedColor={Theme.primary}
                checked={check === 1 ? true : false}
                onPress={() => setCheck(1)}
                containerStyle={{
                  borderWidth: 0,
                  backgroundColor: Theme.white,
                  width: Theme.wp('10%'),
                }}
              />
              <View style={styles.scannerView}>
                <Image
                  style={styles.scannerImg}
                  source={Images.scanner}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.innerColumn}>
              <Text style={styles.text2}>Scan with RFID Reader</Text>
              <Text style={styles.text3}>No Device is connected</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.underline} />
          <TouchableOpacity
            onPress={() => navigation.navigate('MyDevices')}
            style={styles.connectBtn}>
            <Feather name="settings" size={13} color={Theme.primary} />
            <Text style={styles.connect}>CONNECT DEVICE</Text>
          </TouchableOpacity>
        </View>
        {/* <BarcodeScanner
        style={{width:300, backgroundColor:"#fff", height:300, marginVertical:"3%", alignSelf:'center'}}
          onBarCodeRead={(val) => barcodeReceived(val)}
          // style={{ flex: 1 }}
          torchMode={torchMode}
          cameraType={cameraType}
        /> */}
        <TouchableOpacity onPress={() => setCheck(2)} style={styles.centerView}>
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={20}
            checkedColor={Theme.primary}
            checked={check === 2 ? true : false}
            onPress={() => setCheck(2)}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: Theme.white,
              width: Theme.wp('10%'),
            }}
          />
          <View style={styles.barcodeView}>
            <Image
              style={styles.barcode}
              source={Images.barcode}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.scan}>Scan with camera</Text>
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <View style={styles.checkboxRow}>
            <CheckBox
              title={'Inventory Scan'}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              size={22}
              checkedColor={Theme.primary}
              checked={check === 1 ? true : false}
              onPress={() => setCheck(1)}
              containerStyle={{
                borderWidth: 0,
                backgroundColor: Theme.white,
                padding: 3,
                //   width: Theme.wp('10%'),
              }}
              textStyle={{
                color: Theme.black,
                fontSize: Theme.hp('2%'),
                fontWeight: '600',
              }}
            />
            <CheckBox
              title={'Bulk Scan'}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              size={22}
              checkedColor={Theme.primary}
              checked={check === 2 ? true : false}
              onPress={() => setCheck(2)}
              containerStyle={{
                borderWidth: 0,
                backgroundColor: Theme.white,
                padding: 3,
                //   width: Theme.wp('10%'),
              }}
              textStyle={{
                color: Theme.black,
                fontSize: Theme.hp('2%'),
                fontWeight: '600',
              }}
            />
          </View>
          <Text style={styles.text4}>
            Choose Site and Location to start scan
          </Text>
          <CustomInput
            onPress={() => setModal1(true)}
            label={'Site'}
            top={Theme.hp('2%')}
            horizontal={Theme.wp('4%')}
            source={Images.down}
            editable={false}
            imgStyle={{width: 18, height: 18}}
          />
          <CustomInput
            onPress={() => setModal2(true)}
            label={'Location'}
            top={Theme.hp('2%')}
            horizontal={Theme.wp('4%')}
            source={Images.down}
            editable={false}
            imgStyle={{width: 18, height: 18}}
          />
          <Button
            disabled={disable}
            backgroundColor={disable ? Theme.grayText : Theme.darkPurpleBtn}
            title={'START SCAN'}
            top={Theme.hp('8%')}
            marginHorizontal={Theme.wp('2%')}
          />
        </View>
      </ScrollView>

      <EmptyModal
        isVisible={modal1}
        setIsVisible={() => setModal1(!modal1)}
        title={'Site'}
        desc={'No options for Site'}
      />
      <EmptyModal
        isVisible={modal2}
        setIsVisible={() => setModal2(!modal2)}
        title={'Location'}
        desc={'No options for Location'}
      />
    </View>
  );
};

export default StartScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  text1: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    padding: 10,
  },
  topView: {
    backgroundColor: Theme.white,
    margin: '2%',
    borderRadius: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 5,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Theme.wp('30%'),
  },
  innerColumn: {
    width: Theme.wp('65%'),
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginLeft: Theme.wp('1%'),
  },
  scannerView: {
    width: 35,
    height: 35,
    alignItems: 'center',
    overflow: 'hidden',
  },
  scannerImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  text2: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
  },
  text3: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginTop: Theme.hp('0.5%'),
  },
  underline: {
    borderWidth: 0.3,
    borderColor: Theme.gray,
    opacity: 0.5,
    marginTop: Theme.hp('2%'),
  },
  connectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: Theme.hp('1.5%'),
    padding: 3,
  },
  connect: {
    color: Theme.black,
    fontSize: Theme.hp('1.8%'),
    marginHorizontal: Theme.wp('2%'),
  },
  centerView: {
    backgroundColor: Theme.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginHorizontal: Theme.wp('2%'),
    marginVertical: Theme.hp('0.5%'),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  barcodeView: {
    width: 25,
    height: 25,
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: Theme.wp('1%'),
  },
  barcode: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  scan: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('3%'),
    width: Theme.wp('65%'),
  },
  bottomView: {
    backgroundColor: Theme.white,
    marginTop: Theme.hp('2%'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text4: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('4%'),
    marginVertical: Theme.hp('1%'),
  },
});
