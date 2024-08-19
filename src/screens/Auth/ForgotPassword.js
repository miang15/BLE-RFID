import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import Images from '../../constants/Images';
import CustomInput from '../../components/CustomInput';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const ValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is Required'),
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topView}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={Images.logo}
            />
          </View>
          <Text style={styles.text1}>FORGOT PASSWORD</Text>
          <Text style={styles.text2}>Please enter registered email ID</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            top: Theme.hp('2%'),
            left: Theme.hp('1%'),
            position: 'absolute',
          }}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={Theme.secondary}
          />
        </TouchableOpacity>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => Alert.alert('Submit')}
          validationSchema={ValidationSchema}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={styles.bottomView}>
              <CustomInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                top={Theme.hp('15%')}
                horizontal={Theme.wp('2%')}
                label={'Email ID'}
                source={Images.mail}
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              ) : null}
              <Button
                onPress={handleSubmit}
                title={'SUBMIT'}
                customStyle={{
                  bottom: Theme.hp('12%'),
                  position: 'absolute',
                  alignSelf: 'center',
                  width: '98%',
                }}
                top={Theme.hp('10%')}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

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
  logoView: {
    width: 60,
    height: 60,
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.secondary,
  },
  text1: {
    color: Theme.secondary,
    fontSize: Theme.hp('2.5%'),
  },
  text2: {
    color: Theme.secondary,
    fontSize: Theme.hp('2%'),
    marginTop: Theme.hp('1%'),
    marginBottom: Theme.hp('1.5%'),
  },
  bottomView: {
    backgroundColor: Theme.secondary,
    marginHorizontal: Theme.wp('3%'),
    height: Theme.hp('70%'),
  },
  errorMsg: {
    color: Theme.red,
    fontSize: Theme.hp('1.8%'),
    paddingHorizontal: 10,
  },
});
