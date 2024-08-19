import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../utils/Theme';

const AssetDetails = ({tag, desc, site, onPress, location, category}) => {
  const styles = StyleSheet.create({
    topView: {
      backgroundColor: Theme.white,
      marginBottom:"3%"
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 0.8,
      paddingBottom: 15,
      borderColor: Theme.gray,
    },
    innerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: Theme.wp('70%'),
    },
    availableView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    assetTag: {
      color: Theme.black,
      fontSize: Theme.hp('2%'),
    },
    tagValue: {
      color: Theme.primary,
      fontSize: Theme.hp('2%'),
      textAlign: 'left',
      width: '70%',
    },
    available: {
      color: Theme.green,
      fontSize: Theme.hp('1.5%'),
    },
    bottomView: {
      padding: 10,
    },
    rowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Theme.hp('1%'),
      marginBottom: Theme.hp('1%'),
    },
    textRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      width: Theme.wp('30%'),
    },
    label: {
      color: Theme.grayText,
      fontSize: Theme.hp('2%'),
      fontWeight: '600',
      marginHorizontal: Theme.wp('1%'),
      width: Theme.wp('100%'),
    },
    text: {
      color: Theme.black,
      fontSize: Theme.hp('1.8%'),
      width: Theme.wp('70%'),
      alignSelf: 'flex-start',
    },
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.topView}>
      <View style={styles.topRow}>
        <View style={styles.innerRow}>
          <Text style={styles.assetTag}>Asset Tag ID: </Text>
          <Text style={styles.tagValue}>{tag ? tag : 'NA'}</Text>
        </View>
        <View style={styles.availableView}>
          <Entypo name="dot-single" size={15} color={Theme.green} />
          <Text style={styles.available}>Available</Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.rowView}>
          <View style={styles.textRow}>
            <Ionicons name="document-text" size={18} color={Theme.grayText} />
            <Text style={styles.label}>Description: </Text>
          </View>
          <Text style={styles.text}>{desc ? desc : 'NA'}</Text>
        </View>
        <View style={styles.rowView}>
          <View style={styles.textRow}>
            <Entypo name="location" size={18} color={Theme.grayText} />
            <Text style={styles.label}>Site: </Text>
          </View>
          <Text style={styles.text}>{site ? site : 'NA'}</Text>
        </View>
        <View style={styles.rowView}>
          <View style={styles.textRow}>
            <Entypo name="location" size={18} color={Theme.grayText} />
            <Text style={styles.label}>Location: </Text>
          </View>
          <Text style={styles.text}>{location ? location : 'NA'}</Text>
        </View>
        <View style={styles.rowView}>
          <View style={styles.textRow}>
            <Ionicons
              name="reorder-three-sharp"
              size={18}
              color={Theme.grayText}
            />
            <Text style={styles.label}>Category: </Text>
          </View>
          <Text style={styles.text}>{category ? category : 'NA'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AssetDetails;
