import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Unsynced = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
      <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD75B" />
      <Text style={styles.desc}>Successfully Synced scan result will move to scynced tab</Text>
      </View>
      <Text style={styles.centerTxt}>We can't find any offline scan results</Text>
    </View>
  )
}

export default Unsynced

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Theme.secondary
  },
  topRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:'5%',
    marginHorizontal:Theme.wp('3%')
  },
  desc: {
    color:Theme.black,
    fontSize:Theme.hp('1.8%'),
    width:Theme.wp('85%')
  },
  centerTxt: {
    color:Theme.grayText,
    fontSize:Theme.hp('2%'),
    marginHorizontal:Theme.wp('5%'),
    textAlign:'center',
    marginTop:Theme.hp('35%')
  }
})