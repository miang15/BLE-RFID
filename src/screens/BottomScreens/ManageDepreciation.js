import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import Button from '../../components/Button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Theme from '../../utils/Theme';
import Images from '../../constants/Images';
import ListModal from '../../components/ListModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';

const ManageDepreciation = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modal, setModal] = useState(false);
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

  const depreciationSchema = yup.object().shape({
    depreciationMethod: yup
      .string()
      .required('Depreciation Method is Required'),
    totalCost: yup.string().required('Total Cost is Required'),
    assetLife: yup.string().required('Asset Life is Required'),
    salvageValue: yup.string().required('Salvage Value is Required'),
    dateAcquired: yup.string().required('Date Acquired is Required'),
  });

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        title={'MANAGE DEPRECIATION'}
        cross={true}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          depreciationMethod: '',
          totalCost: '',
          assetLife: '',
          salvageValue: '',
          dateAcquired: '',
        }}
        onSubmit={values => alert('Submit')}
        validationSchema={depreciationSchema}>
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
              <CustomInput
                onPress={() => setModal(true)}
                label={'Depreciation Method'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                source={Images.down}
                editable={false}
                imgStyle={{width: 18, height: 18}}
                value={values.depreciationMethod}
                onChangeText={handleChange('depreciationMethod')}
                onBlur={() => setFieldTouched('depreciationMethod')}
              />
              <ListModal
                setIsVisible={() => setModal(!modal)}
                isVisible={modal}
                title="Depreciation Method"
                data={data}
                selectedOption={val => {
                  setFieldValue('depreciationMethod', val);
                  setModal(false);
                }}
              />
              {touched.depreciationMethod && errors.depreciationMethod ? (
                <Text style={styles.errorMsg}>{errors.depreciationMethod}</Text>
              ) : null}
              <CustomInput
                label={'Total cost(USD)*'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.totalCost}
                onChangeText={handleChange('totalCost')}
                onBlur={() => setFieldTouched('totalCost')}
              />
              {touched.totalCost && errors.totalCost ? (
                <Text style={styles.errorMsg}>{errors.totalCost}</Text>
              ) : null}
              <CustomInput
                label={'Asset Life(Month)*'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.assetLife}
                onChangeText={handleChange('assetLife')}
                onBlur={() => setFieldTouched('assetLife')}
              />
              {touched.assetLife && errors.assetLife ? (
                <Text style={styles.errorMsg}>{errors.assetLife}</Text>
              ) : null}
              <CustomInput
                label={'Salvage Value(USD)*'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.salvageValue}
                onChangeText={handleChange('salvageValue')}
                onBlur={() => setFieldTouched('salvageValue')}
              />
              {touched.salvageValue && errors.salvageValue ? (
                <Text style={styles.errorMsg}>{errors.salvageValue}</Text>
              ) : null}
              <CustomInput
                onPress={() => setDatePickerVisibility(true)}
                label={'Date Acquired*'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                source={Images.calendar}
                editable={false}
                value={values.dateAcquired}
                onChangeText={handleChange('dateAcquired')}
                onBlur={() => setFieldTouched('dateAcquired')}
              />
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={date => {
                  const val = moment(date).format('DD-MM-YYYY');
                  setFieldValue('dateAcquired', val);
                  setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />

              {touched.dateAcquired && errors.dateAcquired ? (
                <Text style={styles.errorMsg}>{errors.dateAcquired}</Text>
              ) : null}
              <Button
                onPress={handleSubmit}
                top={Theme.hp('10%')}
                title={'UPDATE'}
                marginHorizontal={Theme.wp('4%')}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default ManageDepreciation;

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
