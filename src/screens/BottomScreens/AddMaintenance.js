import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import {CheckBox} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Images from '../../constants/Images';
import Button from '../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {onCreateMaintenance} from '../../redux/actions/reportsAction';

const AddMaintenance = ({navigation, route}) => {
  const dispatch = useDispatch();
  const assetData = route?.params?.details;
  console.log("asset: ",assetData)

  const maintenanceSchema = yup.object().shape({
    title: yup.string().required('Title is Required'),
    cost: yup.string().required('Cost is required'),
    maintenanceBy: yup.string().required('Maintenance By is required'),
    note: yup.string().required('Note is required'),
    repeating: yup.string().required('Repeating is Required'),

    completionDate: yup.string().when('repeating', {
      is: 'No',
      then: yup.string().required('Completion Date is required'),
    }),

    dueDate: yup.string().when('repeating', {
      is: 'No',
      then: yup.string().required('Due Date is required'),
    }),

    duration: yup.string().when('repeating', {
      is: 'Yes',
      then: yup.string().required('Duration is required'),
    }),

    day: yup.array().when('repeating', {
      is: 'Yes',
      then: yup
        .array()
        .of(
          yup.object().shape({
            marked: yup.boolean(),
          }),
        )
        .compact(v => !v.marked)
        .min(1, 'Atleast 1 Day is Required'),
    }),
    time: yup.string().when('repeating', {
      is: 'Yes',
      then: yup.string().required('Time is required'),
    }),
    end: yup.string().when('repeating', {
      is: 'Yes',
      then: yup.string().required('End is required'),
    }),
    occurenceCount: yup.string().when('repeating', {
      is: 'Yes',
      then: yup.string().when('end', {
        is: 'Count of Occurence',
        then: yup.string().required('Occurence Count is required'),
      }),
    }),
    occurenceCount: yup.string().when('repeating', {
      is: 'Yes',
      then: yup.string().when('end', {
        is: 'Until',
        then: yup.string().required('Last Occurence Date is required'),
      }),
    }),

  });

  const handleAddMaintenance = val => {
    let arr = [];
    val.day.filter(item => {
      if (item.marked === true) {
        arr.push(item.label)
      }
    });
    const data = {
      asset_id: assetData?.asset_id,
      asset_tag_id: assetData?.asset_tag_id,
      site: assetData?.site,
      location: assetData?.location,
      category: assetData?.category,
      title: val.title,
      cost: val.cost,
      maintenance_by: val.maintenanceBy,
      repeating: val.repeating,
      repeating_days: val.duration,
      reoccur_on: JSON.stringify(arr),
      time: val.time,
      end: val.end,
      occurence_count: val.occurenceCount,
      last_occurrence_date: val.lastOccurenceDate,
      due_date: val.dueDate,
      completion_date: val.completionDate,
      note: val.note,
    };
    console.log("called")
    dispatch(onCreateMaintenance(data));
  };

  return (
    <View style={styles.container}>
      <Header
        cross={true}
        onCrossPress={() => navigation.goBack()}
        title="ADD NEW MAINTENANCE"
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: '',
          cost: '',
          maintenanceBy: '',
          repeating: 'No',
          dueDate: '',
          showDueDatePicker: false,
          completionDate: '',
          completionDatePicker: false,
          note: '',
          duration: 'Daily',
          day: [
            {
              id: 1,
              label: 'Mon',
              marked: false,
            },
            {
              id: 2,
              label: 'Tue',
              marked: false,
            },
            {
              id: 3,
              label: 'Wed',
              marked: false,
            },
            {
              id: 4,
              label: 'Thu',
              marked: false,
            },
            {
              id: 5,
              label: 'Fri',
              marked: false,
            },
            {
              id: 6,
              label: 'Sat',
              marked: false,
            },
            {
              id: 7,
              label: 'Sun',
              marked: false,
            },
          ],
          time: '',
          showTimePicker: false,
          end: 'Count of Occurence',
          occurenceCount: '',
          lastOccurenceDate: '',
          showOccurenceDatePicker: false,
        }}
        onSubmit={(values, {resetForm}) => {
          handleAddMaintenance(values), resetForm();
        }}
        validationSchema={maintenanceSchema}>
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
                label={'Title*'}
                top={Theme.hp('1%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={() => setFieldTouched('title')}
              />
              {touched.title && errors.title ? (
                <Text style={styles.errorMsg}>{errors.title}</Text>
              ) : null}
              <CustomInput
                label={'Cost(USD)'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.cost}
                onChangeText={handleChange('cost')}
                onBlur={() => setFieldTouched('cost')}
              />
              {touched.cost && errors.cost ? (
                <Text style={styles.errorMsg}>{errors.cost}</Text>
              ) : null}
              <CustomInput
                label={'Maintenance By'}
                top={Theme.hp('2%')}
                horizontal={Theme.wp('4%')}
                disabled={true}
                value={values.maintenanceBy}
                onChangeText={handleChange('maintenanceBy')}
                onBlur={() => setFieldTouched('maintenanceBy')}
              />
              {touched.maintenanceBy && errors.maintenanceBy ? (
                <Text style={styles.errorMsg}>{errors.maintenanceBy}</Text>
              ) : null}
              <Text style={styles.text}>Repeating</Text>
              <View style={styles.checkboxRow}>
                <CheckBox
                  title="Yes"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={20}
                  checkedColor={Theme.primary}
                  checked={values.repeating === 'Yes' ? true : false}
                  onPress={() => {
                    setFieldValue('repeating', 'Yes');
                  }}
                  containerStyle={{
                    borderWidth: 0,
                    padding: 2,
                    width: Theme.wp('35%'),
                    backgroundColor: Theme.secondary,
                  }}
                  textStyle={{
                    fontSize: Theme.hp('2%'),
                    color: Theme.black,
                    fontWeight: '600',
                  }}
                />
                <CheckBox
                  title="No"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={20}
                  containerStyle={{
                    borderWidth: 0,
                    padding: 2,
                    width: Theme.wp('35%'),
                    backgroundColor: Theme.secondary,
                  }}
                  textStyle={{
                    fontSize: Theme.hp('2%'),
                    color: Theme.black,
                    fontWeight: '600',
                  }}
                  checkedColor={Theme.primary}
                  checked={values.repeating === 'No' ? true : false}
                  onPress={() => {
                    setFieldValue('repeating', 'No');
                  }}
                />
              </View>
              {touched.repeating && errors.repeating ? (
                <Text style={styles.errorMsg}>{errors.repeating}</Text>
              ) : null}
              {values.repeating === 'No' ? (
                <>
                  <CustomInput
                    onPress={() => {
                      setFieldValue('showDueDatePicker', true);
                    }}
                    label={'Due Date*'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    source={Images.calendar}
                    editable={false}
                    value={values.dueDate}
                    onChangeText={handleChange('dueDate')}
                    onBlur={() => setFieldTouched('dueDate')}
                  />
                  <DateTimePicker
                    isVisible={values.showDueDatePicker}
                    mode="date"
                    onConfirm={date => {
                      setFieldValue('showDueDatePicker', false);
                      const val = moment(date).format('DD-MM-YYYY');
                      setFieldValue('dueDate', val);
                    }}
                    onCancel={() => {
                      setFieldValue('showDueDatePicker', false);
                    }}
                  />
                  {touched.dueDate && errors.dueDate ? (
                    <Text style={styles.errorMsg}>{errors.dueDate}</Text>
                  ) : null}
                  <CustomInput
                    onPress={() => {
                      setFieldValue('completionDatePicker', true);
                    }}
                    label={'Completion Date*'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    source={Images.calendar}
                    editable={false}
                    value={values.completionDate}
                    onChangeText={handleChange('completionDate')}
                    onBlur={() => setFieldTouched('completionDate')}
                  />
                  <DateTimePicker
                    isVisible={values.completionDatePicker}
                    mode="date"
                    onConfirm={date => {
                      setFieldValue('completionDatePicker', false);
                      const val = moment(date).format('DD-MM-YYYY');
                      setFieldValue('completionDate', val);
                    }}
                    onCancel={() => {
                      setFieldValue('completionDatePicker', false);
                    }}
                  />
                  {touched.completionDate && errors.completionDate ? (
                    <Text style={styles.errorMsg}>{errors.completionDate}</Text>
                  ) : null}
                </>
              ) : (
                <>
                  <View
                    style={{
                      ...styles.checkboxRow,
                      marginTop: Theme.hp('2.5%'),
                    }}>
                    <CheckBox
                      title="Daily"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      checkedColor={Theme.primary}
                      checked={values.duration === 'Daily' ? true : false}
                      onPress={() => setFieldValue('duration', 'Daily')}
                      containerStyle={{
                        borderWidth: 0,
                        padding: 2,
                        width: Theme.wp('35%'),
                        backgroundColor: Theme.secondary,
                      }}
                      textStyle={{
                        fontSize: Theme.hp('2%'),
                        color: Theme.black,
                        fontWeight: '600',
                      }}
                    />
                    <CheckBox
                      title="Weekly"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      containerStyle={{
                        borderWidth: 0,
                        padding: 2,
                        width: Theme.wp('35%'),
                        backgroundColor: Theme.secondary,
                      }}
                      textStyle={{
                        fontSize: Theme.hp('2%'),
                        color: Theme.black,
                        fontWeight: '600',
                      }}
                      checkedColor={Theme.primary}
                      checked={values.duration === 'Weekly' ? true : false}
                      onPress={() => setFieldValue('duration', 'Weekly')}
                    />
                  </View>
                  <View style={styles.checkboxRow}>
                    <CheckBox
                      title="Monthly"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      checkedColor={Theme.primary}
                      checked={values.duration === 'Monthly' ? true : false}
                      onPress={() => setFieldValue('duration', 'Monthly')}
                      containerStyle={{
                        borderWidth: 0,
                        padding: 2,
                        width: Theme.wp('35%'),
                        backgroundColor: Theme.secondary,
                      }}
                      textStyle={{
                        fontSize: Theme.hp('2%'),
                        color: Theme.black,
                        fontWeight: '600',
                      }}
                    />
                    <CheckBox
                      title="Yearly"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      containerStyle={{
                        borderWidth: 0,
                        padding: 2,
                        width: Theme.wp('35%'),
                        backgroundColor: Theme.secondary,
                      }}
                      textStyle={{
                        fontSize: Theme.hp('2%'),
                        color: Theme.black,
                        fontWeight: '600',
                      }}
                      checkedColor={Theme.primary}
                      checked={values.duration === 'Yearly' ? true : false}
                      onPress={() => setFieldValue('duration', 'Yearly')}
                    />
                  </View>
                  {touched.duration && errors.duration ? (
                    <Text style={styles.errorMsg}>{errors.duration}</Text>
                  ) : null}
                  <Text style={styles.text}>Reoccur On*:</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      marginTop: Theme.hp('2%'),
                    }}>
                    {values.day
                      ? values.day.map((item, index) => (
                          <CheckBox
                            uncheckedColor={Theme.grayText}
                            title={item.label}
                            size={18}
                            containerStyle={{
                              borderWidth: 0,
                              padding: 2,
                              width: Theme.wp('15%'),
                              backgroundColor: Theme.secondary,
                            }}
                            textStyle={{
                              fontSize: Theme.hp('1.8%'),
                              color: Theme.black,
                              fontWeight: '600',
                              left: -8,
                            }}
                            checkedColor={Theme.primary}
                            checked={item.marked}
                            onPress={() => {
                              const clone = [...values.day];
                              clone[index].marked = !clone[index].marked;
                              setFieldValue('day', clone);
                            }}
                          />
                        ))
                      : null}
                  </View>

                  {touched.day && errors.day ? (
                    <Text style={styles.errorMsg}>{errors.day}</Text>
                  ) : null}
                  <CustomInput
                    onPress={() => {
                      setFieldValue('showTimePicker', true);
                    }}
                    label={'Time*'}
                    top={Theme.hp('2%')}
                    horizontal={Theme.wp('4%')}
                    editable={false}
                    value={values.time}
                    onChangeText={handleChange('time')}
                    onBlur={() => setFieldTouched('time')}
                  />
                  <DateTimePicker
                    isVisible={values.showTimePicker}
                    mode="time"
                    onConfirm={time => {
                      setFieldValue('showTimePicker', false);
                      const val = moment(time).format('HH:mm:ss');
                      setFieldValue('time', val);
                    }}
                    onCancel={() => {
                      setFieldValue('showTimePicker', false);
                    }}
                  />
                  {touched.time && errors.time ? (
                    <Text style={styles.errorMsg}>{errors.time}</Text>
                  ) : null}
                  <Text style={styles.text}>End</Text>
                  <View
                    style={{...styles.checkboxRow, marginTop: Theme.hp('1%')}}>
                    <CheckBox
                      title="Count of Occurence"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      checkedColor={Theme.primary}
                      checked={
                        values.end === 'Count of Occurence' ? true : false
                      }
                      onPress={() => setFieldValue('end', 'Count of Occurence')}
                      containerStyle={{
                        borderWidth: 0,
                        padding: 2,
                        backgroundColor: Theme.secondary,
                      }}
                      textStyle={{
                        fontSize: Theme.hp('2%'),
                        color: Theme.black,
                        fontWeight: '600',
                      }}
                    />
                    <CheckBox
                      title="Until"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      containerStyle={{
                        borderWidth: 0,
                        padding: 2,
                        backgroundColor: Theme.secondary,
                      }}
                      textStyle={{
                        fontSize: Theme.hp('2%'),
                        color: Theme.black,
                        fontWeight: '600',
                      }}
                      checkedColor={Theme.primary}
                      checked={values.end === 'Until' ? true : false}
                      onPress={() => setFieldValue('end', 'Until')}
                    />
                  </View>
                  {touched.end && errors.end ? (
                    <Text style={styles.errorMsg}>{errors.end}</Text>
                  ) : null}
                  {values.end === 'Count of Occurence' ? (
                    <>
                      <CustomInput
                        label={'Occurrence Count*'}
                        top={Theme.hp('1%')}
                        horizontal={Theme.wp('4%')}
                        disabled={true}
                        value={values.occurenceCount}
                        onChangeText={handleChange('occurenceCount')}
                        onBlur={() => setFieldTouched('occurenceCount')}
                      />
                      {touched.occurenceCount && errors.occurenceCount ? (
                        <Text style={styles.errorMsg}>
                          {errors.occurenceCount}
                        </Text>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <CustomInput
                        onPress={() => {
                          setFieldValue('showOccurenceDatePicker', true);
                        }}
                        label={'Last Occurrence Date*'}
                        top={Theme.hp('2%')}
                        horizontal={Theme.wp('4%')}
                        source={Images.calendar}
                        editable={false}
                        value={values.lastOccurenceDate}
                        onChangeText={handleChange('lastOccurenceDate')}
                        onBlur={() => setFieldTouched('lastOccurenceDate')}
                      />
                      <DateTimePicker
                        isVisible={values.showOccurenceDatePicker}
                        mode="date"
                        onConfirm={date => {
                          setFieldValue('showOccurenceDatePicker', false);
                          const val = moment(date).format('DD-MM-YYYY');
                          setFieldValue('lastOccurenceDate', val);
                        }}
                        onCancel={() => {
                          setFieldValue('showOccurenceDatePicker', false);
                        }}
                      />
                      {touched.lastOccurenceDate && errors.lastOccurenceDate ? (
                        <Text style={styles.errorMsg}>
                          {errors.lastOccurenceDate}
                        </Text>
                      ) : null}
                    </>
                  )}
                </>
              )}

              <TextInput
                style={styles.input}
                placeholder="Note"
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                value={values.note}
                onChangeText={handleChange('note')}
                onBlur={() => setFieldTouched('note')}
              />
              {touched.note && errors.note ? (
                <Text style={styles.errorMsg}>{errors.note}</Text>
              ) : null}
            </ScrollView>
            <Button
              onPress={handleSubmit}
              top={Theme.hp('2%')}
              bottom={Theme.hp('2%')}
              title={'ADD'}
            />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default AddMaintenance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  text: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    marginHorizontal: Theme.wp('4%'),
    marginTop: Theme.hp('2%'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.hp('0.2%'),
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.grayText,
    marginHorizontal: Theme.wp('3%'),
    marginTop: Theme.hp('2%'),
    borderRadius: 5,
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    height: Theme.hp('13%'),
  },
  errorMsg: {
    color: 'red',
    fontSize: Theme.hp('1.5%'),
    marginHorizontal: '3%',
  },
});
