import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerItem from '../screens/DrawerItem/DrawerItem';
import Theme from '../utils/Theme';
import RightDrawerItem from '../screens/DrawerItem/RightDrawerItem';
import ViewAsset from '../screens/Asset/ViewAsset';
import BottomTab from './BottomTab';
import EditAsset from '../screens/Asset/EditAsset';
import AddEmployee from '../screens/AddEmployee';
import AddLocation from '../screens/AddLocation';
import AddSite from '../screens/AddSite';
import CheckOut from '../screens/CheckOut';
import Dispose from '../screens/Dispose';
import Lost from '../screens/Lost';
import Document from '../screens/BottomScreens/Document';
import AddDocument from '../screens/BottomScreens/AddDocument';
import AddMaintenance from '../screens/BottomScreens/AddMaintenance';
import Upcoming from '../screens/BottomScreens/Upcoming';
import Manage from '../screens/BottomScreens/Manage';
import MaintenanceTabs from './MaintenanceTabs';
import ManageDepreciation from '../screens/BottomScreens/ManageDepreciation';

const Drawer = createDrawerNavigator();

const RightDrawerIndex = props => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      initialRouteName="ViewAsset"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
      drawerStyle={{width: '75%'}}
      drawerType="slide"
      overlayColor="transparent"
      sceneContainerStyle={{backgroundColor: Theme.white}}
      drawerContent={() => <RightDrawerItem {...props} />}>

      <Drawer.Screen name="ManageDepreciation" component={ManageDepreciation} />
      <Drawer.Screen name="MaintenanceTabs" component={MaintenanceTabs} />
      <Drawer.Screen name="AddMaintenance" component={AddMaintenance} />
      <Drawer.Screen name="Manage" component={Manage} />
      <Drawer.Screen name="Upcoming" component={Upcoming} />
      <Drawer.Screen name="AddDocument" component={AddDocument} />
      <Drawer.Screen name="Document" component={Document} />
      <Drawer.Screen name="ViewAsset" component={ViewAsset} />
      <Drawer.Screen name="BottomTab" component={BottomTab} />
      <Drawer.Screen name="EditAsset" component={EditAsset} />
      <Drawer.Screen name="AddEmployee" component={AddEmployee} />
      <Drawer.Screen name="AddLocation" component={AddLocation} />
      <Drawer.Screen name="AddSite" component={AddSite} />
      <Drawer.Screen name="CheckOut" component={CheckOut}/>
      <Drawer.Screen name="Dispose" component={Dispose} />
      <Drawer.Screen name="Lost" component={Lost} />
      
    </Drawer.Navigator>
  );
};

export default RightDrawerIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
});
