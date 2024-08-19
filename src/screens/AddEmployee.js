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
import {onCreateEmployee} from '../redux/actions/EmployeeActions';

const AddEmployee = ({navigation}) => {
  const dispatch = useDispatch();

  const addEmployeeSchema = yup.object().shape({
    firstName: yup.string().required('First Name is Required'),
    lastName: yup.string().required('last Name is Required'),
    employeeID: yup.string().required('Employee ID is Required'),
    email: yup.string().required('Email is Required'),
    designation: yup.string().required('Designation is Required'),
    phoneNo: yup.string().required('Phone No is Required'),
  });

  const handleAddEmployee = val => {
    const data = {
      customer_employee_id: val.employeeID,
      first_name: val.firstName,
      last_name: val.lastName,
      designation: val.designation,
      phone: val.phoneNo,
      email: val.email,
    };
    dispatch(onCreateEmployee(data));
  };

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        title={'ADD NEW EMPLOYEE'}
        cross={true}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: '',
          lastName: '',
          employeeID: '',
          email: '',
          designation: '',
          phoneNo: '',
        }}
        onSubmit={(values, {resetForm}) => {handleAddEmployee(values), resetForm()}}
        validationSchema={addEmployeeSchema}>
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
                label={'First Name*'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName')}
              />

              {touched.firstName && errors.firstName ? (
                <Text style={styles.errorMsg}>{errors.firstName}</Text>
              ) : null}
              <CustomInput
                label={'Last Name'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName')}
              />

              {touched.lastName && errors.lastName ? (
                <Text style={styles.errorMsg}>{errors.lastName}</Text>
              ) : null}
              <CustomInput
                label={'Employee ID'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.employeeID}
                onChangeText={handleChange('employeeID')}
                onBlur={() => setFieldTouched('employeeID')}
              />

              {touched.employeeID && errors.employeeID ? (
                <Text style={styles.errorMsg}>{errors.employeeID}</Text>
              ) : null}
              <CustomInput
                label={'Email'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />

              {touched.email && errors.email ? (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              ) : null}
              <CustomInput
                label={'Designation'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.designation}
                onChangeText={handleChange('designation')}
                onBlur={() => setFieldTouched('designation')}
              />

              {touched.designation && errors.designation ? (
                <Text style={styles.errorMsg}>{errors.designation}</Text>
              ) : null}
              <CustomInput
                label={'Phone no.'}
                top={Theme.hp('1.5%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.phoneNo}
                onChangeText={handleChange('phoneNo')}
                onBlur={() => setFieldTouched('phoneNo')}
              />

              {touched.phoneNo && errors.phoneNo ? (
                <Text style={styles.errorMsg}>{errors.phoneNo}</Text>
              ) : null}
              <Button
                onPress={handleSubmit}
                top={Theme.hp('4%')}
                title={'ADD EMPLOYEE'}
                marginHorizontal={Theme.wp('4%')}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default AddEmployee;

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
