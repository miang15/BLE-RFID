import { StyleSheet, Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Images from '../constants/Images'
import Theme from '../utils/Theme'

const Splash = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignIn');
          }, 1500);
    },[])

  return (
    <View style={styles.imgView}>
      <Image style={styles.img} resizeMode='cover' source={Images.splash} />
    </View>

  )
}

export default Splash

const styles = StyleSheet.create({

    imgView: {
        flex:1,
        width: Theme.wp('100%'),
        height: Theme.hp('100%'),
    },
    img: {
        width:"100%",
        height:"100%",
        alignSelf:'center'
    }
})
