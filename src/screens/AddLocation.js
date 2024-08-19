import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import Theme from '../utils/Theme';
import Button from '../components/Button';
import {useState} from 'react';
import EmptyModal from '../components/EmptyModal';
import Images from '../constants/Images';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import ListModal from '../components/ListModal';
import OptionsList from '../components/OptionsList';
import {onCreateLocation} from '../redux/actions/locationActions';
import {onDeleteSite} from '../redux/actions/siteActions';

const AddLocation = ({navigation}) => {
  const {sites} = useSelector(state => state.SiteReducer);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const addNewLocationSchema = yup.object().shape({
    siteName: yup.string().required('Site Name is Required'),
    location: yup.string().required('Location is Required'),
  });

  const handleAddNewLocation = val => {
    dispatch(onCreateLocation(val));
  };

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        title={'ADD NEW LOCATION'}
        cross={true}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          siteId: '',
          siteName: '',
          location: '',
        }}
        onSubmit={(values, {resetForm}) => {
          handleAddNewLocation(values), resetForm();
        }}
        validationSchema={addNewLocationSchema}>
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
                label={'Site'}
                top={Theme.hp('2%')}
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
                        setModal(false);
                    }}
                  />
                )}
                setIsVisible={() => setModal(!modal)}
                isVisible={modal}
                title="Sites"
                desc="No options for Sites"
                hideAddBtn={true}
                data={sites?.length ? sites : null}
              />

              {touched.siteName && errors.siteName ? (
                <Text style={styles.errorMsg}>{errors.siteName}</Text>
              ) : null}
              <CustomInput
                label={'Location'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.location}
                onChangeText={handleChange('location')}
                onBlur={() => setFieldTouched('location')}
              />

              {touched.location && errors.location ? (
                <Text style={styles.errorMsg}>{errors.location}</Text>
              ) : null}
              <Button
                onPress={handleSubmit}
                top={Theme.hp('5%')}
                title={'ADD LOCATION'}
                marginHorizontal={Theme.wp('4%')}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
});
