import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ViewAssetDetails from '../screens/Asset/ViewAssetDetails';
import Images from '../constants/Images';
import Theme from '../utils/Theme';
import Document from '../screens/BottomScreens/Document';
import Maintenance from '../screens/BottomScreens/Maintenance';
import History from '../screens/BottomScreens/History';
import Event from '../screens/BottomScreens/Event';
import Depreciation from '../screens/BottomScreens/Depreciation';
import {useRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTab = ({route}) => {
  return (
    <Tab.Navigator
      initialRouteName="ViewAssetDetails"
      tabBarOptions={{
        activeTintColor: Theme.primary,
        indicatorContainerStyle: {
          backgroundColor: Theme.white,
        },
        indicatorStyle: {
          backgroundColor: Theme.primary,
        },
        tabStyle: {
          paddingVertical: 5,
        },
      }}
      // screenOptions={{
      //   headerShown: false,
      //   tabBarShowLabel: true,
      //   tabBarLabelStyle: {fontSize: 12, textAlign: 'center'},
      //   tabBarActiveTintColor: Theme.primary,
      //   tabBarInactiveTintColor: Theme.black,
      //   tabBarHideOnKeyboard:true,
      //   tabBarStyle: {
      //     backgroundColor: Theme.white,
      //     height: 60,
      //     borderTopWidth: 0,
      //     paddingBottom: 8,
      //     paddingTop: 0,
      //   },
      // }}
    >
      <Tab.Screen
        name="ViewAssetDetails"
        children={() => <ViewAssetDetails item={route?.params?.assetDetails} />}
        // component={ViewAssetDetails}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconView}>
              <Image
                resizeMode="cover"
                style={{...styles.tabIcon, tintColor: color}}
                source={Images.list}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Document"
        children={() => <Document item={route?.params?.assetDetails} />}
        // component={Document}
        options={{
          tabBarLabel: 'Document',
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconView}>
              <Image
                resizeMode="cover"
                style={{...styles.tabIcon, tintColor: color}}
                source={Images.contract}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Maintenance"
        children={() => <Maintenance item={route?.params?.assetDetails} />}
        // component={Maintenance}
        options={{
          tabBarLabel: 'Maintenance',
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconView}>
              <Image
                resizeMode="cover"
                style={{...styles.tabIcon, tintColor: color}}
                source={Images.settings}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconView}>
              <Image
                resizeMode="cover"
                style={{...styles.tabIcon, tintColor: color}}
                source={Images.folder}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={Event}
        options={{
          tabBarLabel: 'Event',
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconView}>
              <Image
                resizeMode="cover"
                style={{...styles.tabIcon, tintColor: color}}
                source={Images.star}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Depreciation"
        component={Depreciation}
        options={{
          tabBarLabel: 'Depreciation',
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconView}>
              <Image
                resizeMode="cover"
                style={{...styles.tabIcon, tintColor: color}}
                source={Images.depreciation}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabIconView: {
    width: 20,
    height: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  tabIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
