import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Theme from '../utils/Theme';
import Unsynced from '../screens/ScanHistory/Unsynced';
import Synced from '../screens/ScanHistory/Synced';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Unsynced"
      tabBarOptions={{
        activeTintColor: Theme.black,
        indicatorContainerStyle: {
          backgroundColor:Theme.white
        },
        indicatorStyle: {
          backgroundColor: Theme.primary,
        },
      }}>
      <Tab.Screen
        name="Unsynced"
        options={{tabBarLabel: 'UNSYNCED'}}
        children={() => <Unsynced />}
      />
      <Tab.Screen
        name="Synced"
        options={{tabBarLabel: 'SYNCED'}}
        children={() => <Synced />}
      />
    </Tab.Navigator>
  );
};

export default TopTab;

const styles = StyleSheet.create({});
