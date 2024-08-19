import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import TopTab from '../../navigation/TopTab';

const ScanHistory = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        arrow={true}
        onBackArrow={() => navigation.goBack()}
        title={'SCAN HISTORY'}
      />

      <TopTab />
    </View>
  );
};

export default ScanHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
});
