import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import Theme from '../utils/Theme';
import Button from '../components/Button';
import {useState} from 'react';
import EmptyModal from '../components/EmptyModal';
import Images from '../constants/Images';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { onUpdateAsset } from '../redux/actions/assetActions';

const Dispose = ({navigation, route}) => {
  const assetData = route?.params?.assetDetails;
  const dispatch = useDispatch()

  const disposeSchema = yup.object().shape({
    disposeDate: yup.string().required('Disposed Date is Required'),
    disposalReason: yup.string().required('Disposal Reason is Required'),
  });

  const handleDispose = val => {
    const data = {
      asset_id: assetData?.asset_id,
      location:assetData?.location,
      site:assetData?.site,
      category:assetData?.category,
      dispose_date: val?.disposeDate,
      dispose_reason: val?.disposalReason,
    };
    dispatch(onUpdateAsset(data))
    
  };

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        title={'DISPOSE'}
        cross={true}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          disposeDate: '',
          disposalReason: '',
          isVisible: false,
        }}
        onSubmit={(values, {resetForm}) => {
          handleDispose(values), resetForm();
        }}
        validationSchema={disposeSchema}>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomInput
              value={values.disposeDate}
              onChangeText={handleChange('disposeDate')}
              onBlur={() => setFieldTouched('disposeDate')}
              onPress={() => {
                setFieldValue('isVisible', true);
              }}
              label={'Disposed Date'}
              top={Theme.hp('3%')}
              horizontal={Theme.wp('4%')}
              source={Images.calendar}
              editable={false}
            />
            <DateTimePickerModal
              isVisible={values.isVisible}
              mode="date"
              onConfirm={date => {
                const val = moment(date).format('DD-MM-YYYY');
                setFieldValue('disposeDate', val);
                setFieldValue('isVisible', false);
              }}
              onCancel={() => {
                setFieldValue('isVisible', false);
              }}
            />
            {touched.disposeDate && errors.disposeDate ? (
              <Text style={styles.errorMsg}>{errors.disposeDate}</Text>
            ) : null}
            <CustomInput
              label={'Disposal reason'}
              top={Theme.hp('2%')}
              horizontal={Theme.wp('4%')}
              disabled={true}
              value={values.disposalReason}
              onChangeText={handleChange('disposalReason')}
              onBlur={() => setFieldTouched('disposalReason')}
            />
            {touched.disposalReason && errors.disposalReason ? (
              <Text style={styles.errorMsg}>{errors.disposalReason}</Text>
            ) : null}
            <Button
              onPress={handleSubmit}
              top={Theme.hp('10%')}
              title={'DISPOSE'}
              marginHorizontal={Theme.wp('4%')}
            />
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Dispose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  errorMsg: {
    color: 'red',
    fontSize: Theme.hp('1.5%'),
    marginHorizontal: '3%',
  },
});
