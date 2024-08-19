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
import Header from '../../components/Header';
import Theme from '../../utils/Theme';
import CustomInput from '../../components/CustomInput';
import Images from '../../constants/Images';
import Button from '../../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const AddDocument = ({navigation}) => {
  const [docName, setDocName] = useState('');
  const [docUri, setDocUri] = useState('');

  const pickDocs = () => {
    DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: [types.doc, types.docx, types.csv, types.pdf],
    })
      .then(result => {
        if (result?.size <= 10485760) {
          setDocName(result?.name);
          setDocUri(result?.fileCopyUri);
        } else {
          Alert.alert('Maximum File Size is 10MB.');
        }
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        onCrossPress={() => navigation.goBack()}
        cross={true}
        title={'ADD NEW DOCUMENT'}
      />
      <View style={styles.inputView}>
        <CustomInput
          label={'Title'}
          horizontal={Theme.wp('4%')}
          disabled={true}
        />
      </View>
      <View style={styles.secondView}>
        {docName ? (
          <>
            <TouchableOpacity
              onPress={pickDocs}
              style={{
                ...styles.uploadView,
                marginBottom: docName ? Theme.hp('2%') : Theme.hp('8%'),
              }}>
              <View style={styles.checkView}>
                <Entypo name="check" size={24} color={Theme.greenLight} />
              </View>
              <Text style={styles.text}>CHANGE DOCUMENT</Text>
            </TouchableOpacity>
            <View style={styles.rowView}>
              <Text style={styles.filename}>File name:</Text>
              <Text style={styles.docName}>{docName}</Text>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={pickDocs} style={styles.uploadView}>
            <View style={styles.imgView}>
              <Image
                style={styles.uploadImg}
                source={Images.upload}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.text}>UPLOAD DOCUMENT</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.format}>
          Supported File Formats: .docx, .doc, .pdf, .csv
        </Text>
        <Text style={{...styles.format, marginBottom: Theme.hp('15%')}}>
          Max. File Size: 10 MB
        </Text>
        <Button
          onPress={() => navigation.goBack()}
          customStyle={styles.btn}
          title={'SAVE'}
        />
      </View>
    </View>
  );
};

export default AddDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondary,
  },
  inputView: {
    backgroundColor: Theme.white,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: Theme.hp('2%'),
    marginTop: Theme.hp('1%'),
  },
  secondView: {
    backgroundColor: Theme.white,
    padding: 10,
    height: Theme.hp('70%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadView: {
    alignItems: 'center',
    marginBottom: Theme.hp('8%'),
  },
  checkView: {
    width: 60,
    height: 60,
    backgroundColor: Theme.lightGray,
    padding: 15,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Theme.greenLight,
  },
  imgView: {
    width: 60,
    height: 60,
    backgroundColor: Theme.lightGray,
    padding: 15,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 30,
  },
  uploadImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: Theme.white,
  },
  text: {
    color: Theme.primary,
    fontSize: Theme.hp('2%'),
    marginTop: Theme.hp('1%'),
  },
  format: {
    color: Theme.black,
    fontSize: Theme.hp('2%'),
    textAlign: 'center',
    marginHorizontal: Theme.wp('3%'),
    marginBottom: Theme.hp('2%'),
  },
  btn: {
    bottom: Theme.hp('2%'),
    position: 'absolute',
    width: Theme.wp('92%'),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Theme.wp('3%'),
    marginBottom: Theme.hp('2%'),
  },
  filename: {
    width: Theme.wp('25%'),
    color: Theme.grayText,
    fontSize: Theme.hp('2%'),
  },
  docName: {
    width: Theme.wp('65%'),
    color: Theme.primary,
    fontSize: Theme.hp('2%'),
  },
});
