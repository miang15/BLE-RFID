import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Theme = {
  primary: '#6536A0',
  secondary: '#FAFAFA',
  white: "#FFFFFF",
  black: "#000000",
  lightPurple: "#B5A3CD",
  darkPurpleBtn: '#3C276A',
  lightGray: "#F8F6F7",
  yellow:"#ECDA42",
  gray: "#E2E2E2",
  grayText:"#999999",
  flash:"#F8F8FA",
  rowBackground:"#F8F8F8",
  red:"#FF0000",
  green:"#02D4A4",
  greenLight:"#00E681",
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  heightPer: Dimensions.get('window').height / 100,
  widthPer: Dimensions.get('window').width / 100,
  wp,
  hp,
};

export default Theme;
