import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import MyAssets from '../../components/MyAssets';
import Images from '../../constants/Images';
import {PieChart} from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';

import { onGetAllLocations } from '../../redux/actions/locationActions';
import { onGetAllCategories } from '../../redux/actions/categoryActions';
import { onGetAllSites } from '../../redux/actions/siteActions';
import { onGetAllAssets } from '../../redux/actions/assetActions';
import { onGetAllEmployee } from '../../redux/actions/EmployeeActions';

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: '#00E681',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Seoul',
    population: 19500000,
    color: '#8638E7',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#0198E6',

    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,

    color: '#0198E6',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,

    color: '#F59F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetAllLocations())
    dispatch(onGetAllCategories())
    dispatch(onGetAllSites())
    dispatch(onGetAllAssets())
    dispatch(onGetAllEmployee())
  },[])

  return (
    <View style={styles.container}>
      <Header
      onScan={() => navigation.navigate('BarCodeScanner')}
        onMenuPress={() => navigation.toggleDrawer()}
        scanIcon={true}
        title={'HOME'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerView}>
          <MyAssets
            onPress={() => navigation.navigate('RightDrawerIndex')}
            gradientColor={['#04AFCA', '#3897E4', '#6980FE']}
            label="No. of Assets"
            value={0}
            source={Images.responsive}
            marginHorizontal={Theme.wp('5%')}
            marginVertical={Theme.hp('0.5%')}
            top={Theme.hp('2%')}
          />
          <MyAssets
            gradientColor={['#04AFCA', '#356FD4', '#8A36E8']}
            label="No. of Assets (Last 12 months)"
            value={0}
            source={Images.responsive}
            marginHorizontal={Theme.wp('5%')}
            marginVertical={Theme.hp('0.5%')}
          />
          <MyAssets
            gradientColor={['#12D287', '#0CBC82', '#40B29B']}
            label="NAV (Net Asset Value)"
            value={'$ 0'}
            source={Images.value}
            marginHorizontal={Theme.wp('5%')}
            marginVertical={Theme.hp('0.5%')}
          />
        </View>
        <Text style={styles.heading}>ASSET BY STATUS</Text>
        <PieChart
          style={{alignSelf: 'center'}}
          data={data}
          width={300}
          height={250}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#08130D',
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          hasLegend={false}
          accessor={'population'}
          backgroundColor={'transparent'}
          center={[70, 0]}
        />
        <View style={styles.labelView}>
          <View style={styles.columnView}>
            <View style={styles.rowText}>
              <View style={styles.box} />
              <Text style={styles.text1}>Dispose</Text>
            </View>
            <View style={styles.rowText}>
              <View style={{...styles.box, backgroundColor: '#8638E7'}} />
              <Text style={styles.text1}>Available</Text>
            </View>
          </View>
          <View style={styles.columnView}>
            <View style={styles.rowText}>
              <View style={{...styles.box, backgroundColor: '#0198E6'}} />
              <Text style={styles.text1}>Lost</Text>
            </View>
            <View style={styles.rowText}>
              <View style={{...styles.box, backgroundColor: '#F59F00'}} />
              <Text style={styles.text1}>Check Out</Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            ...styles.heading,
            paddingTop: 10,
            paddingBottom: 15,
            borderBottomWidth: 0.5,
            borderColor: Theme.gray,
          }}>
          ASSET BY CATEGORY
        </Text>
        <Text style={styles.text2}>No data available</Text>
        <View style={styles.barRow}>
          <Text style={styles.barLabel}>Others</Text>
          <Text style={styles.barLabel}>100.00%</Text>
        </View>
        <Progress.Bar
          style={{alignSelf: 'center', marginBottom: Theme.hp('3%')}}
          progress={1}
          width={Theme.wp('90')}
          borderColor={Theme.primary}
          color={Theme.primary}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  innerView: {
    backgroundColor: Theme.secondary,
    marginBottom: Theme.hp('2%'),
  },
  heading: {
    color: Theme.black,
    fontSize: Theme.hp('2.2%'),
    fontWeight: 'bold',
    marginHorizontal: Theme.wp('3%'),
  },
  labelView: {
    backgroundColor: Theme.flash,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '3%',
  },
  columnView: {
    justifyContent: 'space-between',
    width: '48%',
  },
  box: {
    width: 18,
    height: 18,
    backgroundColor: '#00E681',
    borderRadius: 5,
    marginRight: '5%',
  },
  text1: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginBottom: 2,
  },
  text2: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginTop: Theme.hp('2%'),
    marginBottom: Theme.hp('3%'),
    alignSelf: 'center',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Theme.wp('5%'),
    marginBottom: Theme.hp('1%'),
  },
  barLabel: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
  },
});
