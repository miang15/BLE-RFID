import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Theme from '../utils/Theme';
import SignIn from '../screens/Auth/SignIn';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import DrawerIndex from './DrawerIndex';
import Splash from '../screens/Splash';
import { navigationRef } from './RootNavigator';
import SignUp from '../screens/Auth/SignUp';
import MyDevices from '../screens/DrawerItem/MyDevices';
import App from '../screens/DrawerItem/Bluetooth/App';

import ConnectionScreen from '../screens/DrawerItem/Bluetooth/ConnectionScreen';
import DeviceListScreen from '../screens/DrawerItem/Bluetooth/DeviceListScreen';



const Stack = createStackNavigator();

const Index = () => {
  return (
    <>
      <StatusBar backgroundColor={Theme.primary} barStyle="light-content" />
      <NavigationContainer ref={navigationRef} >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Splash">
          <Stack.Screen name="DrawerIndex" component={DrawerIndex} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="MyDevices" component={MyDevices} />
          <Stack.Screen name="App" component={App} />

          <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />
          <Stack.Screen name="DeviceListScreen" component={DeviceListScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
