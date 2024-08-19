import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Theme from '../utils/Theme';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import Images from '../constants/Images';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CheckBox} from 'react-native-elements';
import EmptyModal from '../components/EmptyModal';
import Button from '../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import ListModal from '../components/ListModal';
import OptionsList from '../components/OptionsList';
import {onDeleteEmployee} from '../redux/actions/EmployeeActions';
import {onDeleteSite} from '../redux/actions/siteActions';
import {onDeleteLocation} from '../redux/actions/locationActions';
import { onCheckoutAction } from '../redux/actions/checkOutAction';

const CheckOut = ({navigation,route}) => {
  const dispatch = useDispatch();
  const assetData = route?.params?.assetDetails
  const {employees} = useSelector(state => state.EmployeeReducer);
  const {locations} = useSelector(state => state.LocationReducer);
  const {sites} = useSelector(state => state.SiteReducer);
  const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [check, setCheck] = useState('');
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);

  console.log("data: ",assetData)
  const checkOutSchema = yup.object().shape({
    checkoutDate: yup.string().required('Checkout Date is Required'),
    checkTo: yup.string().required('CheckOut To is required'),
    dueDate: yup.string().required('Due Date is required'),
    note: yup.string().required('Note is required'),

    employee: yup.string().when('checkTo', {
      is: 'Employee',
      then: yup.string().required('Employee is required'),
    }),
    siteName: yup.string().when('checkTo', {
      is: 'Site/Location',
      then: yup.string().required('Site Name is required'),
    }),
    locationName: yup.string().when('checkTo', {
      is: 'Site/Location',
      then: yup.string().required('Location Name is required'),
    }),
  });

  const handleCheckoutSubmit = val => {
    const data = {
      asset_id: assetData?.asset_id,
      checkout_date: val.checkoutDate,
      checkout_to: val.checkTo,
      employee: val.employee,
      note: val.note,
      due_date: val.dueDate,
      site:val.siteId,
      location: val.locationId
    }
    dispatch(onCheckoutAction(data))
  };

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        cross={true}
        title={'CHECKOUT'}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          checkoutDate: '',
          checkTo: 'Employee',
          employee: '',
          siteId: '',
          siteName: '',
          locationId: '',
          locationName: '',
          dueDate: '',
          note: '',
        }}
        onSubmit={(values, {resetForm}) => {handleCheckoutSubmit(values), resetForm()}}
        validationSchema={checkOutSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldValue,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <KeyboardAwareScrollView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topView}>
                <CustomInput
                  value={values.checkoutDate}
                  onChangeText={handleChange('checkoutDate')}
                  onBlur={() => setFieldTouched('checkoutDate')}
                  onPress={() => setShowCheckOutDatePicker(true)}
                  label={'Checkout Date*'}
                  top={Theme.hp('1%')}
                  horizontal={Theme.wp('4%')}
                  source={Images.calendar}
                  editable={false}
                />
                {touched.checkoutDate && errors.checkoutDate ? (
                  <Text style={styles.errorMsg}>{errors.checkoutDate}</Text>
                ) : null}
                <DateTimePicker
                  isVisible={showCheckOutDatePicker}
                  mode="date"
                  onConfirm={date => {
                    const val = moment(date).format('DD-MM-YYYY');
                    setFieldValue('checkoutDate', val);
                    setShowCheckOutDatePicker(false);
                  }}
                  onCancel={() => setShowCheckOutDatePicker(false)}
                />
                <Text style={styles.text1}>CheckOut to</Text>
                <View style={styles.checkboxRow}>
                  <CheckBox
                    title="Employee"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    size={20}
                    checkedColor={Theme.primary}
                    checked={values.checkTo === 'Employee' ? true : false}
                    onPress={() => {
                      setFieldValue('checkTo', 'Employee');
                    }}
                    containerStyle={{
                      borderWidth: 0,
                      backgroundColor: Theme.white,
                    }}
                    textStyle={{fontSize: Theme.hp('2%'), color: Theme.black}}
                  />
                  <CheckBox
                    title="Site/Location"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    size={20}
                    containerStyle={{
                      borderWidth: 0,
                      backgroundColor: Theme.white,
                    }}
                    textStyle={{fontSize: Theme.hp('2%'), color: Theme.black}}
                    checkedColor={Theme.primary}
                    checked={values.checkTo === 'Site/Location' ? true : false}
                    onPress={() => {
                      setFieldValue('checkTo', 'Site/Location');
                    }}
                  />
                </View>
                {touched.checkTo && errors.checkTo ? (
                  <Text style={styles.errorMsg}>{errors.checkTo}</Text>
                ) : null}
              </View>
              {values.checkTo === 'Employee' ? (
                <View style={styles.bottomView}>
                  <CustomInput
                    value={values.employee}
                    onChangeText={handleChange('employee')}
                    onBlur={() => setFieldTouched('employee')}
                    onPress={() => setModal1(true)}
                    label={'Employee'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    source={Images.down}
                    editable={false}
                    imgStyle={{width: 18, height: 18}}
                  />
                  <ListModal
                    renderItem={({item}) => (
                      <OptionsList
                        onDelete={() => {
                          if (values.employee === item?.first_name) {
                            setFieldValue('employee', '');
                          }
                          dispatch(onDeleteEmployee(item));
                        }}
                        options={item?.first_name}
                        onPress={() => {
                          setFieldValue('employee', item?.first_name),
                            setModal1(false);
                        }}
                      />
                    )}
                    setIsVisible={() => setModal1(!modal1)}
                    isVisible={modal1}
                    title="Employees"
                    desc="No options for Employees"
                    hideAddBtn={true}
                    data={employees?.length ? employees : null}
                  />
                  {errors.employee ? (
                    <Text style={styles.errorMsg}>{errors.employee}</Text>
                  ) : null}
                  <CustomInput
                    value={values.dueDate}
                    onChangeText={handleChange('dueDate')}
                    onBlur={() => setFieldTouched('dueDate')}
                    onPress={() => setShowDueDatePicker(true)}
                    label={'Due Date*'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    source={Images.calendar}
                    editable={false}
                  />
                  <DateTimePicker
                    isVisible={showDueDatePicker}
                    mode="date"
                    onConfirm={date => {
                      const val = moment(date).format('DD-MM-YYYY');
                      setFieldValue('dueDate', val);
                      setShowDueDatePicker(false);
                    }}
                    onCancel={() => setShowDueDatePicker(false)}
                  />
                  {touched.dueDate && errors.dueDate ? (
                    <Text style={styles.errorMsg}>{errors.dueDate}</Text>
                  ) : null}
                  <CustomInput
                    label={'Note'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    disabled={true}
                    value={values.note}
                    onChangeText={handleChange('note')}
                    onBlur={() => setFieldTouched('note')}
                  />
                  {touched.note && errors.note ? (
                    <Text style={styles.errorMsg}>{errors.note}</Text>
                  ) : null}
                  <Button
                    onPress={() => navigation.navigate('AddEmployee')}
                    title={'ADD EMPLOYEE'}
                    top={Theme.hp('3%')}
                    marginHorizontal={Theme.wp('4%')}
                    bottom={Theme.hp('1%')}
                  />
                </View>
              ) : values.checkTo === 'Site/Location' ? (
                <View style={styles.bottomView}>
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
                    hideAddBtn={true}
                    data={sites?.length ? sites : null}
                  />
                  {touched.siteName && errors.siteName ? (
                    <Text style={styles.errorMsg}>{errors.siteName}</Text>
                  ) : null}
                  <CustomInput
                    onPress={() => setModal3(true)}
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
                            setModal3(false);
                        }}
                      />
                    )}
                    setIsVisible={() => setModal3(!modal3)}
                    isVisible={modal3}
                    title="Locations"
                    desc="No options for Locations"
                        hideAddBtn={true}
                    data={locations?.length ? locations : null}
                  />
                  {touched.locationName && errors.locationName ? (
                    <Text style={styles.errorMsg}>{errors.locationName}</Text>
                  ) : null}
                  <CustomInput
                    value={values.dueDate}
                    onChangeText={handleChange('dueDate')}
                    onBlur={() => setFieldTouched('dueDate')}
                    onPress={() => setShowDueDatePicker(true)}
                    label={'Due Date*'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    source={Images.calendar}
                    editable={false}
                  />
                  <DateTimePicker
                    isVisible={showDueDatePicker}
                    mode="date"
                    onConfirm={date => {
                      const val = moment(date).format('DD-MM-YYYY');
                      setFieldValue('dueDate', val);
                      setShowDueDatePicker(false);
                    }}
                    onCancel={() => setShowDueDatePicker(false)}
                  />
                  {touched.dueDate && errors.dueDate ? (
                    <Text style={styles.errorMsg}>{errors.dueDate}</Text>
                  ) : null}
                  <CustomInput
                    label={'Note'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    disabled={true}
                    value={values.note}
                    onChangeText={handleChange('note')}
                    onBlur={() => setFieldTouched('note')}
                  />
                  {touched.note && errors.note ? (
                    <Text style={styles.errorMsg}>{errors.note}</Text>
                  ) : null}
                  <View style={styles.btnRow}>
                    <Button
                      onPress={() => navigation.navigate('AddSite')}
                      width={Theme.wp('45%')}
                      title={'ADD SITE'}
                    />
                    <Button
                      onPress={() => navigation.navigate('AddLocation')}
                      width={Theme.wp('45%')}
                      title={'ADD LOCATION'}
                    />
                  </View>
                </View>
              ) : null}
              <Button
                onPress={handleSubmit}
                title={'CHECK OUT'}
                top={Theme.hp('1%')}
                marginHorizontal={Theme.wp('4%')}
                bottom={Theme.hp('1%')}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  topView: {
    backgroundColor: Theme.white,
    marginTop: Theme.hp('1%'),
    marginBottom: Theme.hp('2%'),
  },
  text1: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginTop: Theme.hp('2%'),
    marginLeft: Theme.wp('4%'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.hp('2%'),
  },
  bottomView: {
    backgroundColor: Theme.white,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: Theme.hp('1.5%'),
  },
  errorMsg: {
    color: 'red',
    fontSize: Theme.hp('1.5%'),
    marginHorizontal: '3%',
  },
});
