import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import Theme from '../utils/Theme';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch} from 'react-redux';
import { onCreateSite } from '../redux/actions/siteActions';


const AddSite = ({navigation}) => {
  const dispatch = useDispatch();

  const addNewSiteSchema = yup.object().shape({
    site_name: yup.string().required('Site Name is Required'),
    description: yup.string().required('Description is Required'),
    address: yup.string().required('Address is Required'),
    city: yup.string().required('City is Required'),
    state: yup.string().required('State is Required'),
    postal_code: yup.string().required('Postal Code is Required'),
  });

  const handleAddNewSite = val => {
    dispatch(onCreateSite(val));
  };

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        title={'ADD NEW SITE'}
        cross={true}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          site_name: '',
          description: '',
          address: '',
          city: '',
          state: '',
          postal_code: '',
        }}
        onSubmit={(values, {resetForm}) => {handleAddNewSite(values), resetForm()}}
        validationSchema={addNewSiteSchema}>
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
                label={'Site Name*'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.site_name}
                onChangeText={handleChange('site_name')}
                onBlur={() => setFieldTouched('site_name')}
              />

              {touched.site_name && errors.site_name ? (
                <Text style={styles.errorMsg}>{errors.site_name}</Text>
              ) : null}
              <CustomInput
                label={'Description'}
                top={Theme.hp('1.5%')}
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
                label={'Address'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={() => setFieldTouched('address')}
              />

              {touched.address && errors.address ? (
                <Text style={styles.errorMsg}>{errors.address}</Text>
              ) : null}
              <CustomInput
                label={'City'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={() => setFieldTouched('city')}
              />

              {touched.city && errors.city ? (
                <Text style={styles.errorMsg}>{errors.city}</Text>
              ) : null}
              <CustomInput
                label={'State'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={() => setFieldTouched('state')}
              />

              {touched.state && errors.state ? (
                <Text style={styles.errorMsg}>{errors.state}</Text>
              ) : null}
              <CustomInput
                label={'Postal Code'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.postal_code}
                onChangeText={handleChange('postal_code')}
                onBlur={() => setFieldTouched('postal_code')}
              />

              {touched.postal_code && errors.postal_code ? (
                <Text style={styles.errorMsg}>{errors.postal_code}</Text>
              ) : null}
              <Button
                onPress={handleSubmit}
                top={Theme.hp('4%')}
                title={'ADD SITE'}
                marginHorizontal={Theme.wp('4%')}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default AddSite;

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
