import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Theme from '../utils/Theme';
import Upcoming from '../screens/BottomScreens/Upcoming';
import Manage from '../screens/BottomScreens/Manage';

const Tab = createMaterialTopTabNavigator();

const MaintenanceTabs = ({navigation,details}) => {

  console.log("tab: ",details)
  return (
    <Tab.Navigator
      initialRouteName="Upcoming"
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
        name="Upcoming"
        options={{tabBarLabel: 'UPCOMING'}}
        children={() => <Upcoming item={details}/>}
      />
      <Tab.Screen
        name="Manage"
        options={{tabBarLabel: 'MANAGE'}}
        children={() => <Manage item={details}/>}
      />
    </Tab.Navigator>
  );
};

export default MaintenanceTabs;

const styles = StyleSheet.create({});
