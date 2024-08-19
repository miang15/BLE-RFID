import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {CheckBox} from 'react-native-elements';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {signUpAction} from '../../redux/actions/authAction';

const SignUp = () => {
  const dispatch = useDispatch();

  const SignInValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, `First Name must be at least 3 characters`)
      .required('First Name is required'),
    lastName: yup
      .string()
      .min(3, `Last Name must be at least 3 characters`)
      .required('Last Name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is Required'),
    password: yup
      .string()
      .min(6, `Password must be at least 6 characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Confirm Password Not Matched'),
    agreement: yup.boolean().oneOf([true], 'Accept Terms and Conditions'),
  });

  const handleSignUp = val => {
    dispatch(signUpAction(val));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <KeyboardAwareScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
              agreement: false,
            }}
            onSubmit={values => handleSignUp(values)}
            validationSchema={SignInValidationSchema}>
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
              <View style={styles.centerView}>
                <CustomInput
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                  top={Theme.hp('2%')}
                  horizontal={Theme.wp('2%')}
                  label={'First name'}
                />
                {touched.firstName && errors.firstName ? (
                  <Text style={styles.errorMsg}>{errors.firstName}</Text>
                ) : null}
                <CustomInput
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                  top={Theme.hp('3%')}
                  horizontal={Theme.wp('2%')}
                  label={'Last name'}
                />
                {touched.lastName && errors.lastName ? (
                  <Text style={styles.errorMsg}>{errors.lastName}</Text>
                ) : null}
                <CustomInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  top={Theme.hp('3%')}
                  horizontal={Theme.wp('2%')}
                  label={'Email'}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errorMsg}>{errors.email}</Text>
                ) : null}
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  top={Theme.hp('3%')}
                  horizontal={Theme.wp('2%')}
                  label={'Password'}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.errorMsg}>{errors.password}</Text>
                ) : null}
                <CustomInput
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  top={Theme.hp('3%')}
                  horizontal={Theme.wp('2%')}
                  label={'Confirm Password'}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Text style={styles.errorMsg}>{errors.confirmPassword}</Text>
                ) : null}
                <CheckBox
                  title="Terms and Conditions"
                  size={20}
                  checkedColor={Theme.primary}
                  checked={values.agreement}
                  onPress={() => setFieldValue('agreement', !values.agreement)}
                  containerStyle={{borderWidth: 0, marginLeft: '-1.5%'}}
                  textStyle={{
                    fontSize: Theme.hp('2%'),
                    color: Theme.black,
                    fontWeight: 'normal',
                  }}
                />
                {touched.agreement && errors.agreement ? (
                  <Text style={styles.errorMsg}>{errors.agreement}</Text>
                ) : null}
                <Button
                  onPress={handleSubmit}
                  title={'SIGN UP'}
                  top={Theme.hp('2%')}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  header: {
    backgroundColor: Theme.primary,
    padding: 12,
    textAlign: 'center',
    color: Theme.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerView: {
    margin: '3%',
    padding: 5,
  },
  errorMsg: {
    color: Theme.red,
    fontSize: Theme.hp('1.8%'),
    paddingHorizontal: 10,
  },
});
