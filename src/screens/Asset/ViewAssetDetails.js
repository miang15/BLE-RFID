import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import Theme from '../../utils/Theme';
import Images from '../../constants/Images';
import Button from '../../components/Button';
import {useRoute, useNavigation} from '@react-navigation/native';


const ViewAssetDetails = ({ item}) => {
  const {route} = useRoute();
 const navigation = useNavigation()
  const [assetImage, setAssetImage] = useState('');
  const data = [
    {
      id: 1,
      label: 'Category:',
      value: item?.categoryData?.category_name,
    },
    {
      id: 2,
      label: 'Assigned To:',
      value: item?.assigned_to,
    },
    {
      id: 3,
      label: 'Last Scanned Date:',
      value: item?.last_scanned_date,
    },
    {
      id: 4,
      label: 'Due Date:',
      value: item?.due_date,
    },
    {
      id: 5,
      label: 'Site:',
      value: item?.siteData?.site_name,
    },
    {
      id: 6,
      label: 'Location:',
      value: item?.locationData?.location_name,
    },
    {
      id: 7,
      label: 'Depreciation:',
      value: item?.depreciation,
    },
    {
      id: 8,
      label: 'Depreciation Method:',
      value: item?.depreciation_method,
    },
    {
      id: 9,
      label: 'Total cost(USD):',
      value: item?.total_cost,
    },
    {
      id: 10,
      label: 'Asset Life(Month):',
      value: item?.assets_life_month,
    },
    {
      id: 11,
      label: 'Salvage Value(USD):',
      value: item?.salvage_value,
    },
    {
      id: 12,
      label: 'Date Acquired:',
      value: item?.date_acquired,
    },
  ];


  return (
    <View style={styles.container}>
      <Header
        onEditPress={() => navigation.navigate('EditAsset', {assetDetails: item})}
        editIcon={true}
        onBackArrow={() => navigation.goBack()}
        arrow={true}
        title="ASSET DETAILS"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CheckOut', {assetDetails: item})}
            style={styles.iconBtn}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={Images.logout}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.label}>Check Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Dispose', {assetDetails: item})}
            style={styles.iconBtn}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={Images.delete}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.label}>Dispose</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Lost', {assetDetails: item})}
            style={styles.iconBtn}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={Images.lostItems}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.label}>Lost</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.assetImgView}>
          <Image
            style={{
              ...styles.assetImg,
              width: assetImage ? '100%' : '40%',
              height: assetImage ? '100%' : '40%',
              marginVertical: assetImage ? null : '18%',
              tintColor: assetImage ? null : Theme.grayText,
            }}
            source={assetImage ? {uri: assetImage} : Images.gallery}
            resizeMode={assetImage ? 'cover' : 'contain'}
          />
        </View>
        <View style={styles.centerView}>
          <View style={styles.centerRow}>
            <View style={styles.tagView}>
              <Text style={styles.assetID}>Asset Tag ID:</Text>
              <Text style={styles.assetName}>{item.asset_tag_id}</Text>
            </View>
            <View style={styles.statusRow}>
              <TouchableOpacity style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={Images.mail}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.status}>Available</Text>
            </View>
          </View>
          <Button title={'LOCATE ASSET'} top={Theme.hp('2%')} />
        </View>
        <View style={styles.centerView}>
          <Text numberOfLines={1} style={styles.heading}>
            Description
          </Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                ...styles.listRow,
                backgroundColor:
                  item.id % 2 === 0 ? Theme.white : Theme.secondary,
              }}>
              <Text style={styles.listLabel}>{item.label}</Text>
              <Text style={styles.listValue}>
                {item.value ? item.value : 'NA'}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default ViewAssetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  topView: {
    backgroundColor: Theme.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Theme.hp('1%'),
    padding: 10,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Theme.wp('30%'),
    paddingVertical: 5,
  },
  imgView: {
    width: 18,
    height: 18,
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.primary,
  },
  label: {
    color: Theme.primary,
    fontSize: Theme.hp('1.8%'),
  },
  assetImgView: {
    width: Theme.wp('99%'),
    height: 200,
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Theme.rowBackground,
    marginBottom: Theme.hp('1%'),
    marginTop: Theme.hp('1%'),
  },
  assetImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  centerView: {
    backgroundColor: Theme.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: Theme.hp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagView: {
    width: Theme.wp('60%'),
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  assetID: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    width: '100%',
  },
  assetName: {
    color: Theme.primary,
    fontSize: Theme.hp('2%'),
    width: '100%',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    width: Theme.wp('30%'),
  },
  status: {
    color: Theme.white,
    backgroundColor: '#00E681',
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginLeft: Theme.wp('1.5%'),
    borderRadius: 5,
  },
  heading: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
  },
  desc: {
    color: Theme.grayText,
    fontSize: Theme.hp('1.8%'),
    marginRight: Theme.wp('1.5%'),
  },
  listRow: {
    backgroundColor: Theme.secondary,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  listLabel: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    width: Theme.wp('25%'),
  },
  listValue: {
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
    width: Theme.wp('65%'),
  },
});
