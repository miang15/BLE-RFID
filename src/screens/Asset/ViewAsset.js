import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Images from '../../constants/Images';
import AssetDetails from '../../components/AssetDetails';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import AssetFields from '../../components/AssetFields';
import {useDispatch, useSelector} from 'react-redux';

const ViewAsset = ({navigation}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const {asset} = useSelector(state => state.AssetReducer);

  return (
    <View style={styles.container}>
      <Header
        onBackArrow={() => navigation.goBack()}
        onPlus={() => navigation.navigate('AddAssets')}
        arrow={true}
        title="VIEW ASSET"
        plus={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather
              name="search"
              size={18}
              color="black"
              style={{opacity: 0.5}}
            />
            <TextInput style={styles.input} placeholder="Search" />
          </View>
          <TouchableOpacity style={styles.scanView}>
            <Image
              resizeMode="cover"
              style={styles.scan}
              source={Images.scan}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.result}>
            Result: <Text style={styles.resultValue}>{asset?.length}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setModal(true)}
            style={styles.listIcon}>
            <MaterialIcons
              name="format-list-numbered"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={asset}
          renderItem={({item}) => (
            <AssetDetails
              onPress={() =>
                navigation.navigate('BottomTab', {assetDetails: item})
              }
              tag={item?.asset_tag_id}
              desc={item?.description}
              site={item?.siteData?.site_name}
              location={item?.locationData?.location_name}
              category={item?.categoryData?.category_name}
            />
          )}
          showsVerticalScrollIndicator={false}
        />

        {/* <View style={styles.norecordView}>
          <Image
            style={styles.noRecord}
            source={Images.noRecord}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.text4}>No Results Found</Text> */}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.drawerBtn}>
        {!useIsDrawerOpen() ? (
          <FontAwesome name="filter" size={24} color={Theme.white} />
        ) : (
          <AntDesign name="check" size={24} color={Theme.white} />
        )}
      </TouchableOpacity>
      <AssetFields
        setIsVisible={() => setModal(!modal)}
        isVisible={modal}
        // title="Depreciation Method"
        // data={data}
        // selectedOption={val => handleDepreciation(val)}
      />
    </View>
  );
};

export default ViewAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 15,
    paddingLeft: 5,
    margin: '3%',
    backgroundColor: Theme.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    height: 40,
    width: '88%',
    color: Theme.black,
    marginLeft: '2%',
  },
  scanView: {
    width: 20,
    height: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  scan: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.primary,
  },
  norecordView: {
    width: 100,
    height: 100,
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: Theme.hp('15%'),
  },
  noRecord: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  text4: {
    color: Theme.black,
    fontSize: Theme.hp('3%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: Theme.hp('2%'),
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Theme.rowBackground,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: Theme.hp('1%'),
    marginBottom: Theme.hp('2%'),
  },
  result: {
    color: Theme.black,
    alignSelf: 'flex-start',
    fontSize: Theme.hp('2%'),
  },
  resultValue: {
    color: Theme.grayText,
    alignSelf: 'flex-start',
    fontSize: Theme.hp('2%'),
  },
  listIcon: {
    marginTop: Theme.hp('0.5%'),
  },
  drawerBtn: {
    bottom: Theme.hp('10%'),
    right: 0,
    position: 'absolute',
    backgroundColor: Theme.green,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 8,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    zIndex: 999,
  },
});
