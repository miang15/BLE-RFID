import React, {Component} from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Buffer} from 'buffer';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class ConnectionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: undefined,
      data: [],
      polling: false,
      connection: false,
      connectionOptions: {
        DELIMITER: '9',
      },
    };
  }

  async componentWillUnmount() {
    if (this.state.connection) {
      try {
        await this.props.device.disconnect();
      } catch (error) {
        // Unable to disconnect from device
      }
    }

    this.uninitializeRead();
  }

  componentDidMount() {
    setTimeout(() => this.connect(), 0);
  }

  async connect() {
    try {
      let connection = await this.props.device.isConnected();
      if (!connection) {
        this.addData({
          data: `Attempting connection to ${this.props.device.address}`,
          timestamp: new Date(),
          type: 'error',
        });

        connection = await this.props.device.connect({
          DELIMITER: '\n',
        });

        this.addData({
          data: 'Connection successful',
          timestamp: new Date(),
          type: 'info',
        });
      } else {
        this.addData({
          data: `Connected to ${this.props.device.address}`,
          timestamp: new Date(),
          type: 'error',
        });
      }
      console.log('connected');
      // this.setState({polling: true});
      this.setState({connection});
      this.initializeRead();
    } catch (error) {
      this.addData({
        data: `Connection failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }
  }

  async disconnect(disconnected) {
    try {
      if (!disconnected) {
        disconnected = await this.props.device.disconnect();
      }

      this.addData({
        data: 'Disconnected',
        timestamp: new Date(),
        type: 'info',
      });

      this.setState({connection: !disconnected});
    } catch (error) {
      this.addData({
        data: `Disconnect failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }

    // Clear the reads, so that they don't get duplicated
    this.uninitializeRead();
  }

  initializeRead() {
    this.disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() =>
      this.disconnect(true),
    );

    if (this.state.polling) {
      this.readInterval = setInterval(() => this.performRead(), 5000);
    } else {
      this.readSubscription = this.props.device.onDataReceived(data => {
        console.log('RECEIVED DATA ', data);      
        this.onReceivedData(data);
      });
    }
  }

  
 

  uninitializeRead() {
    if (this.readInterval) {
      clearInterval(this.readInterval);
    }
    if (this.readSubscription) {
      this.readSubscription.remove();
    }
  }

  async performRead() {
    try {
      let available = await this.props.device.available();
      

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          let data = await this.props.device.read();

          console.log('Read data', data);
          this.setState({polling: false});
          this.onReceivedData(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onReceivedData(event) {
    event.timestamp = new Date();
    this.addData({
      ...event,
      timestamp: new Date(),
      type: 'receive',
    });
  }

  async addData(message) {
    this.setState({data: [message, ...this.state.data]});
  }

  async sendData() {
    try {
      console.log(`Attempting to send data ${this.state.text}`);
      let message = this.state.text + '\r';
      await RNBluetoothClassic.writeToDevice(
        this.props.device.address,
        message,
      );

      this.addData({
        timestamp: new Date(),
        data: this.state.text,
        type: 'sent',
      });

      let data = Buffer.alloc(10, 0xef);
      await this.props.device.write(data);


      console.log(data.toString(), " dd");

      this.addData({
        timestamp: new Date(),
        data: `Byte array: ${data.toString()}`,
        type: 'sent',
      });

      this.setState({text: undefined});
    } catch (error) {
      console.log(error);
    }
  }

  async toggleConnection() {
    if (this.state.connection) {
      this.disconnect();
    } else {
      this.connect();
    }
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <View>
          <TouchableOpacity onPress={this.props.onBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text>{this.props.device.name}</Text>
          <Text>{this.props.device.address}</Text>
          <TouchableOpacity onPress={() => this.toggleConnection()}>
            <Ionicons name="toggle-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.connectionScreenWrapper}>
          <FlatList
            style={styles.connectionScreenOutput}
            contentContainerStyle={{justifyContent: 'flex-end'}}
            inverted
            ref="scannedDataList"
            data={this.state.data}
            keyExtractor={item => item.timestamp.toISOString()}
            renderItem={({item}) => (
              <View
                id={item.timestamp.toISOString()}
                flexDirection={'row'}
                justifyContent={'flex-start'}>
                <Text>{item.timestamp.toLocaleDateString()}</Text>
                <Text>{item.type === 'sent' ? ' < ' : ' > '}</Text>
                <Text flexShrink={1}>{item.data}</Text>
              </View>
            )}
          />
          <InputArea
            text={this.state.text}
            onChangeText={text => this.setState({text})}
            onSend={() => this.sendData()}
            disabled={!this.state.connection}
            style={{backgroundColor: 'red'}}
          />
        </View>
      </View>
    );
  }
}

export default ConnectionScreen;

const InputArea = ({text, onChangeText, onSend, disabled}) => {
  let style = disabled ? styles.inputArea : styles.inputAreaConnected;
  return (
    <View style={style}>
      <TextInput
        style={styles.inputAreaTextInput}
        placeholder={'Command/Text'}
        value={text}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={onSend}
        returnKeyType="send"
        disabled={disabled}
      />
      <TouchableOpacity
        style={styles.inputAreaSendButton}
        onPress={onSend}
        disabled={disabled}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  connectionScreenWrapper: {
    flex: 1,
    margin: '3%',
  },
  connectionScreenOutput: {
    flex: 1,
    paddingHorizontal: 8,
  },
  inputArea: {
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  inputAreaConnected: {
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: '#90EE90',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  inputAreaTextInput: {
    flex: 1,
    height: 40,
  },
  inputAreaSendButton: {
    justifyContent: 'center',
    flexShrink: 1,
  },
});
