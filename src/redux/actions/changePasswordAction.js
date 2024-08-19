import * as RootNavigation from '../../navigation/RootNavigator';
import {Alert} from 'react-native';
import {AUTH_ENDPOINTS} from '../../Services/api';
import {setAppLoading} from './appLoaderAction';
import Http from '../../Services/Http';

export const onChangePassword = payload => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const userInfo = await Http.put(AUTH_ENDPOINTS.CHANGE_PASSWORD, payload);
      
      if (!userInfo.data) {
        return;
      } else {
        Alert.alert('Success!!!', 'Password Changed successfully', [
          {
            text: 'Cancel',
          },
          {text: 'OK', onPress: () => RootNavigation.goBack()},
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
