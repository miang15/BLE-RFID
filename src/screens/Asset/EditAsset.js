import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import Images from '../../constants/Images';
import {TextInput} from 'react-native-paper';
import ImageButton from '../../components/ImageButton';
import {CheckBox} from 'react-native-elements';
import Button from '../../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import EmptyModal from '../../components/EmptyModal';
import ListModal from '../../components/ListModal';
import DragBox from '../../components/DragBox';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import OptionsList from '../../components/OptionsList';
import {onDeleteCategory} from '../../redux/actions/categoryActions';
import {onDeleteSite} from '../../redux/actions/siteActions';
import {onDeleteLocation} from '../../redux/actions/locationActions';
import {onCreateAsset, onUpdateAsset} from '../../redux/actions/assetActions';
import {useRoute} from '@react-navigation/native';

const EditAsset = ({navigation, route}) => {
  const dispatch = useDispatch();

  const details = route?.params?.assetDetails;
  const {locations} = useSelector(state => state.LocationReducer);
  const {sites} = useSelector(state => state.SiteReducer);
  const {categories} = useSelector(state => state.CategoryReducer);
  const [check, setCheck] = useState('');
  const [lastScannedDatePicker, setLastScannedDatePicker] = useState(false);
  const [dueDatePicker, setDueDatePicker] = useState(false);
  const [dateAcquiredPicker, setDateAcquiredPicker] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [locationListModal, setLocationListModal] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      label: 'Straight Line',
    },
    {
      id: 2,
      label: 'Double Declining',
    },
    {
      id: 3,
      label: '150% Declining Balance',
    },
    {
      id: 4,
      label: 'Sum of year digits',
    },
  ]);

  const ValidationSchema = yup.object().shape({
    asset_tag_id: yup.string().required('Asset Tag ID is Required'),
    categoryName: yup.string().required('Category is Required'),
    description: yup.string().required('Description is Required'),
    assigned_to: yup.string().required('Assigned To is Required'),
    last_scanned_date: yup.string().required('Last Scanned Date is Required'),
    due_date: yup.string().required('Due Date is Required'),
    siteName: yup.string().required('Site is Required'),
    locationName: yup.string().required('Location is Required'),
    allImages: yup.array().min(1, 'Atleast 1 Asset Image is Required'),
    depreciation: yup.string().required('Depreciation is Required'),

    depreciation_method: yup.string().when('depreciation', {
      is: 'Yes',
      then: yup.string().required('Depreciation Method is Required'),
    }),
    total_cost: yup.string().when('depreciation', {
      is: 'Yes',
      then: yup.string().required('Total Cost is Required'),
    }),
    assets_life_month: yup.string().when('depreciation', {
      is: 'Yes',
      then: yup.string().required('Asset Life is Required'),
    }),
    salvage_value: yup.string().when('depreciation', {
      is: 'Yes',
      then: yup.string().required('Salvage Value is Required'),
    }),
    date_acquired: yup.string().when('depreciation', {
      is: 'Yes',
      then: yup.string().required('Date Acquired is Required'),
    }),
  });

  const handleEditAssets = val => {
    const data = {
      asset_id: details?.asset_id.toString(),
      asset_tag_id: val.asset_tag_id.toString(),
      category: Number(val.categoryId),
      description: val.description.toString(),
      assigned_to: val.assigned_to.toString(),
      last_scanned_date: val.last_scanned_date.toString(),
      due_date: val.due_date.toString(),
      site: Number(val.siteId),
      location: Number(val.locationId),
      assets_images: JSON.stringify(val.assets_images),
      depreciation: val.depreciation.toString(),
      depreciation_method: val.depreciation_method.toString(),
      total_cost: val.total_cost.toString(),
      assets_life_month: val.assets_life_month.toString(),
      salvage_value: val.salvage_value.toString(),
      date_acquired: val.date_acquired.toString(),
    };

    dispatch(onUpdateAsset(data));
  };
  return (
    <View style={styles.container}>
      <Header
        onBackArrow={() => navigation.goBack()}
        arrow={true}
        title="Edit ASSET"
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          data: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}],
          asset_tag_id: details?.asset_tag_id ? details?.asset_tag_id : '',
          categoryId: details?.category ? details?.category : '',
          categoryName: details?.categoryData?.category_name
            ? details?.categoryData?.category_name
            : '',
          description: details?.description ? details?.description : '',
          assigned_to: details?.assigned_to ? details?.assigned_to : '',
          last_scanned_date: details?.last_scanned_date
            ? details?.last_scanned_date
            : '',
          due_date: details?.due_date ? details?.due_date : '',
          siteId: details?.site ? details?.site : '',
          siteName: details?.siteData?.site_name
            ? details?.siteData?.site_name
            : '',
          locationId: details?.location ? details?.location : '',
          locationName: details?.locationData?.location_name
            ? details?.locationData?.location_name
            : '',
          assets_images: details?.assets_images ? details?.assets_images : [],
          allImages: [],
          depreciation: details?.depreciation ? details?.depreciation : 'No',
          depreciation_method: details?.depreciation_method
            ? details?.depreciation_method
            : '',
          total_cost: details?.total_cost ? details?.total_cost : '',
          assets_life_month: details?.assets_life_month
            ? details?.assets_life_month
            : '',
          salvage_value: details?.salvage_value ? details?.salvage_value : '',
          date_acquired: details?.date_acquired ? details?.date_acquired : '',
        }}
        onSubmit={(values, {resetForm}) => {
          handleEditAssets(values), resetForm();
        }}
        validationSchema={ValidationSchema}>
        {({
          values,
          handleChange,
          setValues,
          setFieldValue,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <KeyboardAwareScrollView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <CustomInput
                label={'Asset Tag ID:*'}
                top={Theme.hp('4%')}
                horizontal={Theme.wp('4%')}
                source={Images.scan}
                disabled={true}
                value={values.asset_tag_id}
                onChangeText={handleChange('asset_tag_id')}
                onBlur={() => setFieldTouched('asset_tag_id')}
              />
              {touched.asset_tag_id && errors.asset_tag_id ? (
                <Text style={styles.errorMsg}>{errors.asset_tag_id}</Text>
              ) : null}
              <CustomInput
                onPress={() => setModal1(true)}
                label={'Category'}
                top={Theme.hp('3%')}
                horizontal={Theme.wp('4%')}
                source={Images.down}
                editable={false}
                imgStyle={{width: 18, height: 18}}
                value={values.categoryName}
              />
              <ListModal
                renderItem={({item}) => (
                  <OptionsList
                    onDelete={() => {
                      if (values.categoryName === item?.category_name) {
                        setFieldValue('categoryName', '');
                      }
                      dispatch(onDeleteCategory(item));
                    }}
                    options={item?.category_name}
                    onPress={() => {
                      setFieldValue('categoryName', item?.category_name),
                        setFieldValue('categoryId', item?.category_id);
                      setModal1(!modal1);
                    }}
                  />
                )}
                setIsVisible={() => setModal1(!modal1)}
                isVisible={modal1}
                title="Categories"
                desc="No options for Categories"
                hideAddBtn={true}
                data={categories?.length ? categories : null}
              />
              {touched.categoryName && errors.categoryName ? (
                <Text style={styles.errorMsg}>{errors.categoryName}</Text>
              ) : null}
              <CustomInput
                label={'Description'}
                top={Theme.hp('3%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={() => setFieldTouched('description')}
              />
              {touched.description && errors.description ? (
                <Text style={styles.errorMsg}>{errors.description}</Text>
              ) : null}
              <CustomInput
                label={'Assigned To'}
                top={Theme.hp('3%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.assigned_to}
                onChangeText={handleChange('assigned_to')}
                onBlur={() => setFieldTouched('assigned_to')}
              />
              {touched.assigned_to && errors.assigned_to ? (
                <Text style={styles.errorMsg}>{errors.assigned_to}</Text>
              ) : null}
              <CustomInput
                onPress={() => setLastScannedDatePicker(true)}
                label={'Last Scanned Date'}
                top={Theme.hp('3%')}
                horizontal={Theme.wp('4%')}
                source={Images.calendar}
                editable={false}
                value={values.last_scanned_date}
                onChangeText={handleChange('last_scanned_date')}
                onBlur={() => setFieldTouched('last_scanned_date')}
              />
              <DateTimePickerModal
                isVisible={lastScannedDatePicker}
                mode="date"
                onConfirm={date => {
                  const val = moment(date).format('DD-MM-YYYY');
                  setFieldValue('last_scanned_date', val);
                  setLastScannedDatePicker(false);
                }}
                onCancel={() => setLastScannedDatePicker(false)}
              />
              {touched.last_scanned_date && errors.last_scanned_date ? (
                <Text style={styles.errorMsg}>{errors.last_scanned_date}</Text>
              ) : null}
              <CustomInput
                onPress={() => setDueDatePicker(true)}
                label={'Due Date'}
                top={Theme.hp('3%')}
                horizontal={Theme.wp('4%')}
                source={Images.calendar}
                editable={false}
                value={values.due_date}
                onChangeText={handleChange('due_date')}
                onBlur={() => setFieldTouched('due_date')}
              />
              <DateTimePickerModal
                isVisible={dueDatePicker}
                mode="date"
                onConfirm={date => {
                  const val = moment(date).format('DD-MM-YYYY');
                  setFieldValue('due_date', val);
                  setDueDatePicker(false);
                }}
                onCancel={() => setDueDatePicker(false)}
              />

              {touched.due_date && errors.due_date ? (
                <Text style={styles.errorMsg}>{errors.due_date}</Text>
              ) : null}
              <View style={styles.assetView}>
                <Text style={styles.asset}>ASSET LOCATION</Text>
              </View>
              <CustomInput
                onPress={() => setModal2(true)}
                label={'Site'}
                top={Theme.hp('3%')}
                horizontal={Theme.wp('4%')}
                source={Images.down}
                editable={false}
                imgStyle={{width: 18, height: 18}}
                value={values.siteName}
                onChangeText={handleChange('siteName')}
                onBlur={() => setFieldTouched('siteName')}
              />
              <ListModal
                renderItem={({item}) => (
                  <OptionsList
                    onDelete={() => {
                      if (values.siteName === item?.site_name) {
                        setFieldValue('siteName', '');
                      }
                      dispatch(onDeleteSite(item));
                    }}
                    options={item?.site_name}
                    onPress={() => {
                      setFieldValue('siteName', item?.site_name),
                        setFieldValue('siteId', item?.site_id),
                        setModal2(false);
                    }}
                  />
                )}
                setIsVisible={() => setModal2(!modal2)}
                isVisible={modal2}
                title="Sites"
                desc="No options for Sites"
                onAdd={() => navigation.navigate('AddSite')}
                data={sites?.length ? sites : null}
              />
              {touched.siteName && errors.siteName ? (
                <Text style={styles.errorMsg}>{errors.siteName}</Text>
              ) : null}
              <CustomInput
                onPress={() => setLocationListModal(true)}
                label={'Location'}
                top={Theme.hp('3%')}
                horizontal={Theme.wp('4%')}
                source={Images.down}
                editable={false}
                imgStyle={{width: 18, height: 18}}
                value={values.locationName}
                onChangeText={handleChange('locationName')}
                onBlur={() => setFieldTouched('locationName')}
              />
              <ListModal
                renderItem={({item}) => (
                  <OptionsList
                    onDelete={() => {
                      if (values.locationName === item?.location_name) {
                        setFieldValue('locationName', '');
                      }
                      dispatch(onDeleteLocation(item));
                    }}
                    options={item?.location_name}
                    onPress={() => {
                      setFieldValue('locationName', item?.location_name),
                        setFieldValue('locationId', item?.location_id),
                        setLocationListModal(false);
                    }}
                  />
                )}
                setIsVisible={() => setLocationListModal(!locationListModal)}
                isVisible={locationListModal}
                title="Locations"
                desc="No options for Locations"
                onAdd={() => navigation.navigate('AddLocation')}
                data={locations?.length ? locations : null}
              />
              {touched.locationName && errors.locationName ? (
                <Text style={styles.errorMsg}>{errors.locationName}</Text>
              ) : null}
              <View style={styles.assetView}>
                <Text style={styles.asset}>ASSET IMAGE</Text>
              </View>
              <FlatList
                columnWrapperStyle={{justifyContent: 'space-around'}}
                showsVerticalScrollIndicator={false}
                data={values.data}
                renderItem={({item, index}) => (
                  <DragBox
                    myImage={values?.allImages[index]}
                    onAddPress={() => {
                      ImageCropPicker.openCamera({
                        width: 300,
                        height: 400,
                        mediaType: 'photo',
                        includeBase64: true,
                      })
                        .then(image => {
                          const clone = [...values.allImages];
                          // const clone64 = [...values.assets_images];
                          clone[index] = image?.path;
                          // clone64[index] = image
                          setFieldValue('allImages', clone);
                          // setFieldValue('assets_images', clone64);
                        })
                        .catch(e => {
                          console.log('Error: ', e);
                        });
                    }}
                    onCrossPress={() => {
                      const clone = values.allImages.filter(
                        (item, i) => i !== index,
                      );
                      // const clone64 = values.assets_images.filter(
                      //   (item, i) => i !== index,
                      // )
                      clone.splice(index, 0, null);
                      // clone64.splice(index,0,null)
                      setFieldValue('allImages', clone);
                      // setFieldValue('assets_images', clone64);
                    }}
                  />
                )}
                numColumns={3}
                keyExtractor={item => item.id}
              />
              {touched.allImages && errors.allImages ? (
                <Text style={styles.errorMsg}>{errors.allImages}</Text>
              ) : null}
              <View style={styles.assetView}>
                <Text style={styles.asset}>DEPRECIATION</Text>
              </View>
              <Text style={styles.label}>Depreciation</Text>
              <View
                style={{
                  ...styles.checkboxRow,
                  marginBottom:
                    values.depreciation === 'Yes'
                      ? Theme.hp('1%')
                      : Theme.hp('10%'),
                }}>
                <CheckBox
                  title="Yes"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={20}
                  checkedColor={Theme.primary}
                  checked={values.depreciation === 'Yes' ? true : false}
                  onPress={() => setFieldValue('depreciation', 'Yes')}
                  containerStyle={{borderWidth: 0}}
                  textStyle={{fontSize: Theme.hp('2%'), color: Theme.black}}
                />
                <CheckBox
                  title="No"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={20}
                  containerStyle={{borderWidth: 0}}
                  textStyle={{fontSize: Theme.hp('2%'), color: Theme.black}}
                  checkedColor={Theme.primary}
                  checked={values.depreciation === 'No' ? true : false}
                  onPress={() => setFieldValue('depreciation', 'No')}
                />
              </View>
              {touched.depreciation && errors.depreciation ? (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              ) : null}
              {values.depreciation === 'Yes' ? (
                <View style={{marginBottom: Theme.hp('12%')}}>
                  <CustomInput
                    onPress={() => setModal4(true)}
                    label={'Depreciation Method'}
                    top={Theme.hp('1%')}
                    horizontal={Theme.wp('4%')}
                    source={Images.down}
                    editable={false}
                    imgStyle={{width: 18, height: 18}}
                    value={values.depreciation_method}
                    onChangeText={handleChange('depreciation_method')}
                    onBlur={() => setFieldTouched('depreciation_method')}
                  />
                  <ListModal
                    renderItem={({item}) => (
                      <OptionsList
                        options={item.label}
                        onPress={() => {
                          setFieldValue('depreciation_method', item.label),
                            setModal4(!modal4);
                        }}
                      />
                    )}
                    setIsVisible={() => setModal4(!modal4)}
                    isVisible={modal4}
                    title="Depreciation Method"
                    data={data}
                  />
                  {touched.depreciation_method && errors.depreciation_method ? (
                    <Text style={styles.errorMsg}>
                      {errors.depreciation_method}
                    </Text>
                  ) : null}
                  <CustomInput
                    label={'Total cost(USD)*'}
                    top={Theme.hp('3%')}
                    horizontal={Theme.wp('4%')}
                    disabled={true}
                    value={values.total_cost}
                    onChangeText={handleChange('total_cost')}
                    onBlur={() => setFieldTouched('total_cost')}
                  />
                  {touched.total_cost && errors.total_cost ? (
                    <Text style={styles.errorMsg}>{errors.total_cost}</Text>
                  ) : null}
                  <CustomInput
                    label={'Asset Life(Month)*'}
                    top={Theme.hp('3%')}
                    horizontal={Theme.wp('4%')}
                    disabled={true}
                    value={values.assets_life_month}
                    onChangeText={handleChange('assets_life_month')}
                    onBlur={() => setFieldTouched('assets_life_month')}
                  />
                  {touched.assets_life_month && errors.assets_life_month ? (
                    <Text style={styles.errorMsg}>
                      {errors.assets_life_month}
                    </Text>
                  ) : null}
                  <CustomInput
                    label={'Salvage Value(USD)*'}
                    top={Theme.hp('3%')}
                    horizontal={Theme.wp('4%')}
                    disabled={true}
                    value={values.salvage_value}
                    onChangeText={handleChange('salvage_value')}
                    onBlur={() => setFieldTouched('salvage_value')}
                  />
                  {touched.salvage_value && errors.salvage_value ? (
                    <Text style={styles.errorMsg}>{errors.salvage_value}</Text>
                  ) : null}
                  <CustomInput
                    onPress={() => setDateAcquiredPicker(true)}
                    label={'Date Acquired*'}
                    top={Theme.hp('3%')}
                    horizontal={Theme.wp('4%')}
                    source={Images.calendar}
                    editable={false}
                    value={values.date_acquired}
                    onChangeText={handleChange('date_acquired')}
                    onBlur={() => setFieldTouched('date_acquired')}
                  />
                  <DateTimePickerModal
                    isVisible={dateAcquiredPicker}
                    mode="date"
                    onConfirm={date => {
                      const val = moment(date).format('DD-MM-YYYY');
                      setFieldValue('date_acquired', val);
                      setDateAcquiredPicker(false);
                    }}
                    onCancel={() => setDateAcquiredPicker(false)}
                  />
                  {touched.date_acquired && errors.date_acquired ? (
                    <Text style={styles.errorMsg}>{errors.date_acquired}</Text>
                  ) : null}
                </View>
              ) : null}
            </ScrollView>
            <Button
              onPress={handleSubmit}
              customStyle={{
                position: 'absolute',
                alignSelf: 'center',
                bottom: Theme.hp('2%'),
              }}
              title={'Update'}
              width="95%"
            />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default EditAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  scanView: {
    width: 20,
    height: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  scan: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  assetView: {
    backgroundColor: Theme.rowBackground,
    padding: 15,
    marginTop: Theme.hp('2%'),
    marginBottom: Theme.hp('1%'),
  },
  asset: {
    color: Theme.primary,
    fontSize: Theme.hp('2%'),
  },
  assetImgView: {
    width: Theme.wp('99%'),
    height: 200,
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Theme.rowBackground,
    marginBottom: Theme.hp('1%'),
  },
  assetImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  label: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('4%'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.hp('10%'),
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorMsg: {
    color: 'red',
    fontSize: Theme.hp('1.5%'),
    marginHorizontal: '3%',
  },
});
