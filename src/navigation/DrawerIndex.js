import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/Home/HomeScreen';
import DrawerItem from '../screens/DrawerItem/DrawerItem';
import Theme from '../utils/Theme';
import RightDrawerIndex from './RightDrawerIndex';
import ScanHistory from '../screens/ScanHistory/ScanHistory';
import Unsynced from '../screens/ScanHistory/Unsynced';
import Synced from '../screens/ScanHistory/Synced';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import AddAssets from '../screens/Asset/AddAssets';
import ViewAssetDetails from '../screens/Asset/ViewAssetDetails';
import CheckOut from '../screens/CheckOut';
import AddEmployee from '../screens/AddEmployee';
import AddSite from '../screens/AddSite';
import AddLocation from '../screens/AddLocation';
import StartScan from '../screens/DrawerItem/StartScan';
import MyDevices from '../screens/DrawerItem/MyDevices';
import BarCodeScanner from '../screens/DrawerItem/BarCodeScanner';
import BottomTab from './BottomTab';

const Drawer = createDrawerNavigator();

const DrawerIndex = props => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}
      drawerStyle={{width: '75%'}}
      drawerType="slide"
      overlayColor="transparent"
      sceneContainerStyle={{backgroundColor: Theme.primary}}
      drawerContent={() => <DrawerItem {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTab} />
      <Drawer.Screen name="BarCodeScanner" component={BarCodeScanner} />
      <Drawer.Screen name="MyDevices" component={MyDevices} />
      <Drawer.Screen name="StartScan" component={StartScan} />
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="AddAssets" component={AddAssets} />
      <Drawer.Screen name="RightDrawerIndex" component={RightDrawerIndex} />
      <Drawer.Screen name="AddLocation" component={AddLocation} />
      <Drawer.Screen name="AddSite" component={AddSite} />
      <Drawer.Screen name="AddEmployee" component={AddEmployee} />
      <Drawer.Screen name="CheckOut" component={CheckOut} />
      <Drawer.Screen name="ViewAssetDetails" component={ViewAssetDetails} />
      <Drawer.Screen name="Splash" component={Splash} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="ScanHistory" component={ScanHistory} />
      <Drawer.Screen name="Unsynced" component={Unsynced} />
      <Drawer.Screen name="Synced" component={Synced} />
    </Drawer.Navigator>
  );
};

export default DrawerIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primary,
  },
});
