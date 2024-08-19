import React, {Component} from 'react';

import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {
  PermissionsAndroid,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
export class DeviceListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      accepting: false,
      discovering: false,
    };
  }

  componentDidMount() {
    this.getBondedDevices();
  }

  componentWillUnmount() {
    if (this.state.accepting) {
      this.cancelAcceptConnections(false);
    }

    if (this.state.discovering) {
      this.cancelDiscovery(false);
    }
  }

  /**
   * Gets the currently bonded devices.
   */
  getBondedDevices = async unloading => {
    console.log('DeviceListScreen::getBondedDevices');
    try {
      let bonded = await RNBluetoothClassic.getBondedDevices();
      console.log('DeviceListScreen::getBondedDevices found', bonded);

      if (!unloading) {
        this.setState({devices: bonded});
      }
    } catch (error) {
      this.setState({devices: []});
      console.log(error.message);
    }
  };

  acceptConnections = async () => {
    if (this.state.accepting) {
      console.log('Already accepting connections');

      return;
    }

    this.setState({accepting: true});

    try {
      let device = await RNBluetoothClassic.accept({delimiter: '\r'});
      if (device) {
        this.props.selectDevice(device);
      }
    } catch (error) {
      if (!this.state.accepting) {
        console.log('Attempt to accept connection failed.');
      }
    } finally {
      this.setState({accepting: false});
    }
  };

  cancelAcceptConnections = async () => {
    if (!this.state.accepting) {
      return;
    }

    try {
      let cancelled = await RNBluetoothClassic.cancelAccept();
      this.setState({accepting: !cancelled});
    } catch (error) {
      console.log('Unable to cancel accept connection');
    }
  };

  startDiscovery = async () => {
    try {
      let granted = await requestAccessFineLocationPermission();

      if (!granted) {
        throw new Error('Access fine location was not granted');
      }

      this.setState({discovering: true});

      let devices = [...this.state.devices];

      try {
        let unpaired = await RNBluetoothClassic.startDiscovery();

        let index = devices.findIndex(d => !d.bonded);
        if (index >= 0) {
          devices.splice(index, devices.length - index, ...unpaired);
        } else {
          devices.push(...unpaired);
        }
        console.log(`Found ${unpaired.length} unpaired devices.`);
      } finally {
        this.setState({devices, discovering: false});
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  cancelDiscovery = async () => {
    try {
    } catch (error) {
      console.log('Error occurred while attempting to cancel discover devices');
    }
  };

  requestEnabled = async () => {
    try {
    } catch (error) {
      console.log(`Error occurred while enabling bluetooth: ${error.message}`);
    }
  };

  render() {
    let toggleAccept = this.state.accepting
      ? () => this.cancelAcceptConnections()
      : () => this.acceptConnections();

    let toggleDiscovery = this.state.discovering
      ? () => this.cancelDiscovery()
      : () => this.startDiscovery();
    return (
      <View>
        <View>
          <Text>Devices</Text>

          {this.props.bluetoothEnabled ? (
            <TouchableOpacity onPress={this.getBondedDevices}>
              <Ionicons name="ios-sync-outline" size={24} color="black" />
            </TouchableOpacity>
          ) : undefined}
        </View>
        {this.props.bluetoothEnabled ? (
          <>
            <DeviceList
              devices={this.state.devices}
              onPress={this.props.selectDevice}
            />
            {Platform.OS !== 'ios' ? (
              <View>
                <TouchableOpacity onPress={toggleAccept}>
                  <Text>
                    {this.state.accepting
                      ? 'Accepting (cancel)...'
                      : 'Accept Connection'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDiscovery}>
                  <Text>
                    {this.state.discovering
                      ? 'Discovering (cancel)...'
                      : 'Discover Devices'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : undefined}
          </>
        ) : (
          <View style={styles.center}>
            <Text>Bluetooth is OFF</Text>
            <TouchableOpacity onPress={() => this.requestEnabled()}>
              <Text>Enable Bluetooth</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default DeviceListScreen;

export const DeviceList = ({devices, onPress, onLongPress}) => {
  const renderItem = ({item}) => {
    return (
      <DeviceListItem
        device={item}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    );
  };

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={item => item.address}
    />
  );
};

export const DeviceListItem = ({device, onPress, onLongPress}) => {
  let bgColor = device.connected ? '#0f0' : '#fff';
  let icon = device.bonded ? 'ios-bluetooth' : 'ios-cellular';

  return (
    <TouchableOpacity
      onPress={() => onPress(device)}
      onLongPress={() => onLongPress(device)}
      style={styles.deviceListItem}>
      <View style={styles.deviceListItemIcon}>
        <Ionicons name="bluetooth" size={24} color="black" />
      </View>
      <View>
        <Text>{device.name}</Text>
        <Text>{device.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deviceListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  deviceListItemIcon: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
