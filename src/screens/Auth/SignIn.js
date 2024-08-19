import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import Images from '../../constants/Images';
import CustomInput from '../../components/CustomInput';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import { Formik } from 'formik'
import * as yup from 'yup'
import { loginAction } from '../../redux/actions/authAction';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  const SignInValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email is Required'),
    password: yup
        .string()
        .min(6, `Password must be at least 6 characters`)
        .required('Password is required'),
})

const handleLogin = (val) => {
  dispatch(loginAction(val))
}

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
          <Text style={styles.text1}>SIGN IN</Text>
          <Text style={styles.text2}>
            Please Enter Your Credentials to get Access
          </Text>
        </View>
        <Formik
        initialValues={{ 
          email: '', 
          password: '' 
        }}
        onSubmit={values => handleLogin(values)}
        validationSchema={SignInValidationSchema}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.bottomView}>
          <CustomInput
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          top={Theme.hp('5%')}
          horizontal={Theme.wp('2%')}
          label={'Email ID'}
          source={Images.mail}
        />
        { touched.email && errors.email ? (
          <Text style={styles.errorMsg}>{errors.email}</Text>
        ) : null}
        <CustomInput
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={() => setFieldTouched('password')}
          top={errors.email ? Theme.hp('3%') : Theme.hp('5%')}
          horizontal={Theme.wp('2%')}
          label={'Password'}
          source={Images.lock}
        />
        { touched.password && errors.password ? (
          <Text style={styles.errorMsg}>{errors.password}</Text>
        ) : null}
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotBtn}>
          <Text style={styles.forgotTxt}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button
        // onPress={() => navigation.navigate("DrawerIndex")}
          onPress={handleSubmit}
          title={'SIGN IN'}
          top={Theme.hp('4%')}
          />
          </View>
        )}
          </Formik>
          <View style={styles.bottomRow}>
            <Text style={styles.text3}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signUpBtn}>
              <Text style={styles.signUp}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;

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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: Theme.hp('3%'),
    marginBottom: Theme.hp('3%'),
    paddingHorizontal: '3%',
  },
  forgotTxt: {
    color: Theme.primary,
    fontSize: Theme.hp('2%'),
  },
  bottomRow: {
    flexDirection: 'row',
    bottom: Theme.hp('5%'),
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  text3: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('0.1%'),
  },
  signUpBtn: {
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  signUp: {
    color: Theme.primary,
    fontSize: Theme.hp('2%'),
  },
  errorMsg: {
    color: Theme.red,
    fontSize: Theme.hp('1.8%'),
    paddingHorizontal: 10,
  },
});
