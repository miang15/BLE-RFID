import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Theme from '../../utils/Theme'

const Event = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header onBackArrow={() => navigation.goBack()} arrow={true} title="EVENT" />
      <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>We can't find any events</Text>
      </ScrollView>
    </View>
  )
}

export default Event

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Theme.secondary
  },
  text: {
    color:Theme.grayText,
    fontSize:Theme.hp('2%'),
    alignSelf:'center',
    textAlign:"center",
    marginHorizontal:Theme.wp('3%'),
    marginTop:Theme.hp('40%')
  }
})