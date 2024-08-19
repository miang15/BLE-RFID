import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import Theme from '../utils/Theme';
import Images from '../constants/Images';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {onChangePassword} from '../redux/actions/changePasswordAction';
import {useDispatch} from 'react-redux';
import { userUpdateAction } from '../redux/actions/authAction';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [oldPass, setOldPass] = useState('');
  const [oldPassError, setOldPassError] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassError, setNewPassError] = useState('');

  const handleUpdatePassword = () => {
    setOldPassError('');
    setNewPassError('');
    if (!oldPass) {
      setOldPassError('Old Password is Required');
    } else if (!newPass) {
      setNewPassError('New Password is Required');
    } else {
      dispatch(onChangePassword({oldPass, newPass}));
    }
  };

  const updateSchema = yup.object().shape({
    firstName: yup.string().required('First Name is Required'),
    lastName: yup.string().required('Last Name is Required'),
    designation: yup.string().required('Designation is Required'),
    phoneNo: yup.string().required('Phone Number is Required'),
    email: yup.string().required('Email is Required').email('Email is Invalid'),
  });

  const handleUpdateUser = val => {
    const data = {
      fname: val.firstName,
      lname: val.lastName,
      designation: val.designation,
      phone: val.phoneNo,
      email: val.email,
    }
    dispatch(userUpdateAction(data))
  }

  return (
    <View style={styles.container}>
      <Header
        onBackArrow={() => navigation.goBack()}
        arrow={true}
        title="PROFILE"
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          profileImage: '',
          firstName: '',
          lastName: '',
          designation: '',
          phoneNo: '',
          email: '',
        }}
        onSubmit={(values, {resetForm}) => {
          handleUpdateUser(values), resetForm();
        }}
        validationSchema={updateSchema}>
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
                <View style={styles.imgView}>
                  <Image
                    style={styles.img}
                    source={Images.user}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.upload}>Upload Photo</Text>
              </View>
              <View style={styles.rowView}>
                <CustomInput
                  label={'FirstName'}
                  inputWidth={Theme.wp('42%')}
                  width={Theme.wp('43%')}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                />

                {touched.firstName && errors.firstName ? (
                  <Text style={styles.errorMsg}>{errors.firstName}</Text>
                ) : null}
                <CustomInput
                  label={'LastName'}
                  inputWidth={Theme.wp('42%')}
                  width={Theme.wp('43%')}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                />

                {touched.lastName && errors.lastName ? (
                  <Text style={styles.errorMsg}>{errors.lastName}</Text>
                ) : null}
              </View>
              <CustomInput
                label={'Designation'}
                horizontal={Theme.wp('3%')}
                top={Theme.hp('4%')}
                value={values.designation}
                onChangeText={handleChange('designation')}
                onBlur={() => setFieldTouched('designation')}
              />

              {touched.designation && errors.designation ? (
                <Text style={styles.errorMsg}>{errors.designation}</Text>
              ) : null}
              <CustomInput
                label={'Phone no.'}
                horizontal={Theme.wp('3%')}
                top={Theme.hp('4%')}
                value={values.phoneNo}
                onChangeText={handleChange('phoneNo')}
                onBlur={() => setFieldTouched('phoneNo')}
              />

              {touched.phoneNo && errors.phoneNo ? (
                <Text style={styles.errorMsg}>{errors.phoneNo}</Text>
              ) : null}
              <CustomInput
                label={'Email ID'}
                horizontal={Theme.wp('3%')}
                top={Theme.hp('4%')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />

              {touched.email && errors.email ? (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              ) : null}
              <Button
              onPress={handleSubmit}
                title={'UPDATE'}
                top={Theme.hp('1.5%')}
                marginHorizontal={Theme.wp('5%')}
              />
              <Text style={styles.reset}>RESET PASSWORD</Text>
              <CustomInput
                label={'Old Password'}
                horizontal={Theme.wp('3%')}
                top={Theme.hp('4%')}
                value={oldPass}
                onChangeText={setOldPass}
              />

              {oldPassError ? (
                <Text style={styles.errorMsg}>{oldPassError}</Text>
              ) : null}
              <CustomInput
                label={'New Password'}
                horizontal={Theme.wp('3%')}
                top={Theme.hp('4%')}
                value={newPass}
                onChangeText={setNewPass}
              />

              {newPassError ? (
                <Text style={styles.errorMsg}>{newPassError}</Text>
              ) : null}
              <Button
                onPress={handleUpdatePassword}
                title={'UPDATE'}
                top={Theme.hp('5%')}
                bottom={Theme.hp('3%')}
                marginHorizontal={Theme.wp('5%')}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  topView: {
    backgroundColor: Theme.primary,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: Theme.hp('30%'),
  },
  imgView: {
    width: 130,
    height: 130,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: Theme.lightPurple,
    padding: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.grayText,
  },
  upload: {
    color: Theme.white,
    fontSize: Theme.hp('2%'),
    marginTop: Theme.hp('1.5%'),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Theme.hp('5%'),
    marginHorizontal: Theme.wp('3%'),
  },
  reset: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('3%'),
    marginTop: Theme.hp('2.5%'),
  },
  errorMsg: {
    color: 'red',
    fontSize: Theme.hp('1.5%'),
    marginHorizontal: '3%',
  },
});
