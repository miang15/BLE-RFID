import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import Header from '../../components/Header';
import Images from '../../constants/Images';
import Theme from '../../utils/Theme';
import ToggleSwitch from 'toggle-switch-react-native';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BleManager} from 'react-native-ble-plx';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

const MyDevices = ({navigation}) => {
  const [on, setOn] = useState(false);
  const [availableDevices, setAvailableDevices] = useState('');
  const [pairedDevices, setPairedDevices] = useState('');
  const [connectedDevice, setConnectedDevice] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);


  const checkBluetoothEnable = async () => {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('bluetooth not enable');
      } else {
        setOn(enabled);
        setLoading(true);
        setLoading2(true);
        const paired = await RNBluetoothClassic.getBondedDevices();
        if (paired) {
          setPairedDevices(paired);
        }
        setLoading2(false);
        scanAllDevices();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      checkBluetoothEnable();
    });
  }, []);

  const addData = (val) => {
    console.log("DATA VALUE: ",val)
  }

  onReceivedData = async(event) => {
    addData({
      ...event,
      timestamp: new Date(),  // Add the current date
      type: 'receive'         // Add a type for UI
    });
  }

  const requestAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access fine location required for discovery',
        message:
          'In order to perform discovery, you must enable/allow ' +
          'fine location access.',
        buttonNeutral: 'Ask Me Later"',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const getpairDevice = async val => {
    let addr = val?.address;
    setLoading(true);
    const pair = await RNBluetoothClassic.pairDevice(addr);

    if (pair) {
      alert('Paired Successfully');
    } else {
      alert('Pairing Failed');
    }
    setLoading(false);
    const paired = await RNBluetoothClassic.getBondedDevices();

    if (paired) {
      setPairedDevices(paired);
    }
  };

  const connectDevices = async val => {

    setConnectedDevice(val);
    // return;
    setLoading2(true);
    let connection = await val.isConnected();
    if (!connection) {
      connection = await RNBluetoothClassic._nativeModule.connectToDevice(
        val?.address,
        {},
      );
      setLoading2(false);
    }

    if (connection) {
      Alert.alert(
        "Success!!!",
        "Your device connected successfully",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
      return
      let readSubscription = await RNBluetoothClassic.onDeviceRead(
        val?.address,
        {},
      )

      console.log('Read: ', readSubscription);
      if(readSubscription){
        onReceivedData()
      }
    }

    setLoading2(false);
    console.log('connect: ', connection);

    setLoading2(false);
  };

  const scanAllDevices = async () => {
    let cancel = RNBluetoothClassic.cancelDiscovery();
    let granted = await requestAccessFineLocationPermission();

    if (!granted) {
      alert(`Access fine location was not granted`);
    }

    setLoading(true);
    const unpaired = await RNBluetoothClassic.startDiscovery();
    if (unpaired) {
      setAvailableDevices(unpaired);
      setLoading(false);
      console.log('unpaired: ', unpaired);
      let cancel = RNBluetoothClassic.cancelDiscovery();
    }
  };

  const handleBluetoothToggle = async () => {
    const status = await RNBluetoothClassic.requestBluetoothEnabled();

    if (status) {
      setOn(status);
      scanAllDevices();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onBackArrow={() => navigation.goBack()}
        arrow={true}
        title={'MY DEVICES'}
      />
      <View style={{height: pairedDevices?.length ? Theme.hp('45%') : null}}>
        <View style={styles.rowView}>
          <Text style={styles.available}>PAIRED DEVICES</Text>
          <TouchableOpacity
            onPress={async () => {
              if (on) {
                setLoading2(true);
                const paired = await RNBluetoothClassic.getBondedDevices();

                if (paired) {
                  setPairedDevices(paired);
                }

                setLoading2(false);
              } else {
                alert('Turn On your Bluetooth');
              }
            }}
            style={styles.reload}>
            <AntDesign name="reload1" size={20} color={Theme.primary} />
          </TouchableOpacity>
        </View>
        {pairedDevices?.length && !loading2 ? (
          <FlatList
            data={pairedDevices}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => connectDevices(item)}
                style={styles.devices}>
                <Text style={styles.text2}>{item?.name}</Text>
                <Text style={styles.text3}>{item?._nativeDevice?.address}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
          />
        ) : loading2 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'small'} color={Theme.primary} />
            <Text style={styles.loadingText}>Searching Paired Devices</Text>
          </View>
        ) : (
          <View style={styles.centerView}>
            <View style={styles.deviceView}>
              <Image
                style={styles.device}
                source={Images.bluetooth}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.text1}>No paired device found</Text>
          </View>
        )}
      </View>
      <View style={styles.rowView}>
        <Text style={styles.available}>AVAILABLE DEVICES</Text>
        <TouchableOpacity
          onPress={() => scanAllDevices()}
          style={styles.reload}>
          <AntDesign name="reload1" size={20} color={Theme.primary} />
        </TouchableOpacity>
      </View>
      {on && !loading ? (
        <FlatList
          data={availableDevices}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => getpairDevice(item)}
              style={styles.devices}>
              <Text style={styles.text2}>{item?.name}</Text>
              <Text style={styles.text3}>{item?._nativeDevice?.address}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      ) : on && loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'small'} color={Theme.primary} />
          {/* <Text style={styles.loadingText}>Scanning Devices</Text> */}
        </View>
      ) : (
        <>
          <View style={styles.imgView}>
            <Image
              style={styles.img}
              source={Images.hotspot}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.desc}>
            Turn on Bluetooth to connect to nearby devices.
          </Text>
          <View style={styles.toggle}>
            <ToggleSwitch
              isOn={on}
              onColor={Theme.primary}
              offColor={Theme.grayText}
              size={'small'}
              circleColor={Theme.gray}
              onToggle={handleBluetoothToggle}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default MyDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  imgView: {
    width: 100,
    height: 100,
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: Theme.hp('5%'),
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.gray,
  },
  desc: {
    marginHorizontal: Theme.wp('5%'),
    marginVertical: Theme.hp('3%'),
    alignSelf: 'center',
    textAlign: 'center',
    color: Theme.black,
    fontSize: Theme.hp('2%'),
  },
  toggle: {
    alignSelf: 'center',
  },
  text: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginVertical: Theme.hp('2.5%'),
    marginHorizontal: Theme.wp('3%'),
    textDecorationLine: 'underline',
  },
  centerView: {
    backgroundColor: Theme.white,
    padding: 10,
    alignItems: 'center',
  },
  deviceView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    overflow: 'hidden',
  },
  device: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.gray,
  },
  text1: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginTop: Theme.hp('2%'),
    marginBottom: Theme.hp('2%'),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3%',
    paddingVertical: 5,
    paddingRight: 5,
  },
  available: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  devices: {
    backgroundColor: Theme.white,
    marginVertical: '2%',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  text2: {
    color: Theme.black,
    fontSize: 14,
    // fontWeight: 'bold',
  },
  text3: {
    color: Theme.grayText,
    fontSize: 15,
  },
  loadingText: {
    color: Theme.black,
    fontSize: 14,
    marginTop: '2%',
  },
});
