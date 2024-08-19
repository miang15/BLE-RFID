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

const Lost = ({navigation,route}) => {
  const assetData = route?.params?.assetDetails
  const dispatch = useDispatch()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const lostSchema = yup.object().shape({
    lostDate: yup.string().required('Lost Date is Required'),
    note: yup.string().required('Note is Required'),
  });

  const handleLost = val => {
    const data = {
      asset_id: assetData?.asset_id,
      location:assetData?.location,
      site:assetData?.site,
      category:assetData?.category,
      lost_date: val?.lostDate,
      lost_note: val?.note,
    };
    dispatch(onUpdateAsset(data))
  }

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        title={'LOST'}
        cross={true}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          lostDate: '',
          note: '',
        }}
        onSubmit={(values, {resetForm}) => { handleLost(values), resetForm()}}
        validationSchema={lostSchema}>
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
              onPress={() => setDatePickerVisibility(true)}
              label={'Lost Date'}
              top={Theme.hp('3%')}
              horizontal={Theme.wp('4%')}
              source={Images.calendar}
              editable={false}
              value={values.lostDate}
              onChangeText={handleChange('lostDate')}
              onBlur={() => setFieldTouched('lostDate')}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={date => {
                const val = moment(date).format('DD-MM-YYYY');
                setFieldValue('lostDate', val);
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
            {touched.lostDate && errors.lostDate ? (
              <Text style={styles.errorMsg}>{errors.lostDate}</Text>
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

export default Lost;

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
