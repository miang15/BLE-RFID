import { StyleSheet,ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import Theme from '../utils/Theme'
import { useSelector } from 'react-redux';

const AppLoader = () => {
  const {loading} = useSelector(state => state.AppLoadingReducer);
  if(!loading) return <></>
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Theme.primary} />
    </View>
  )
}

export default AppLoader

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent:'center',
        alignItems:'center',
        zIndex:999999
    }
})