import React, {Component} from 'react';
import {NativeBaseProvider, Root, StyleProvider} from 'native-base';
import {View, Text} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import DeviceListScreen from './DeviceListScreen';
import ConnectionScreen from './ConnectionScreen';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      device: undefined,
      bluetoothEnabled: true,
    };
  }

  selectDevice = device => {
    console.log('App::selectDevice() called with: ', device);
    this.setState({device});
  };

  async componentDidMount() {
    console.log('didmount');
    this.enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(event =>
      this.onStateChanged(event),
    );
    this.disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(event =>
      this.onStateChanged(event),
    );

    this.checkBluetootEnabled();
  }

  async checkBluetootEnabled() {
    try {
      console.log('App::componentDidMount Checking bluetooth status');
      let enabled = await RNBluetoothClassic.isBluetoothEnabled();

      console.log(`App::componentDidMount Status: ${enabled}`);
      this.setState({bluetoothEnabled: enabled});
    } catch (error) {
      console.log('App::componentDidMount Status Error: ', error);
      this.setState({bluetoothEnabled: false});
    }
  }

  componentWillUnmount() {
    console.log(
      'App:componentWillUnmount removing subscriptions: enabled and distabled',
    );
    console.log(
      'App:componentWillUnmount alternatively could have used stateChanged',
    );
    this.enabledSubscription.remove();
    this.disabledSubscription.remove();
  }

  onStateChanged(stateChangedEvent) {
    console.log(
      'App::onStateChanged event used for onBluetoothEnabled and onBluetoothDisabled',
    );

    this.setState({
      bluetoothEnabled: stateChangedEvent.enabled,
      device: stateChangedEvent.enabled ? this.state.device : undefined,
    });
  }

  render() {
    return (
      <View>
        {!this.state.device ? (
          <DeviceListScreen
            bluetoothEnabled={this.state.bluetoothEnabled}
            selectDevice={this.selectDevice}
          />
        ) : (
          <ConnectionScreen
            device={this.state.device}
            onBack={() => this.setState({device: undefined})}
          />
        )}
      </View>
    );
  }
}

export default App;
