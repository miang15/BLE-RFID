import {StyleSheet, Vibration, Text, View} from 'react-native';
import React, {useState} from 'react';
import BarcodeScanner from 'react-native-scan-barcode';
import Theme from '../../utils/Theme';


const BarCodeScanner = ({navigation}) => {
  const [barcode, setBarcode] = useState('');
  const [cameraType, setCameraType] = useState('back');
  const [text, setText] = useState('Scan Barcode');
  const [torchMode, setTorchMode] = useState('on');
  const [type, setType] = useState('');

  const barcodeReceived = e => {

    if (e.data !== barcode || e.type !== type) Vibration.vibrate();
    setBarcode(e.data);
    setText(`${e.data} (${e.type})`);
    setType(e.type);
    console.log("Scan: ",e)
    navigation.navigate("BottomTab")
  };

  return (
    <View style={{flex:1, justifyContent:"center", backgroundColor:Theme.secondary}}>
      <BarcodeScanner
        style={{width:300,  height:500, marginVertical:"3%", alignSelf:'center'}}
        onBarCodeRead={val => barcodeReceived(val)}
        torchMode={torchMode}
        cameraType={cameraType}
      />
    </View>
  );
};

export default BarCodeScanner;

const styles = StyleSheet.create({});
