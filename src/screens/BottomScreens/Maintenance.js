import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import MaintenanceTabs from '../../navigation/MaintenanceTabs';
import { useNavigation } from '@react-navigation/native';

const Maintenance = ({ item}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Header
        onBackArrow={() => navigation.goBack()}
        arrow={true}
        title="MAINTENANCE"
      />
      <MaintenanceTabs details={item}/>
    </View>
  );
};

export default Maintenance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
});
