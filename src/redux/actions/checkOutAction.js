import * as RootNavigation from '../../navigation/RootNavigator';
import {Alert} from 'react-native';
import { CHECKOUT_ENDPOINTS } from '../../Services/api';
import Http from '../../Services/Http';
import {setAppLoading} from './appLoaderAction';

export const CHECKOUT_ACTION_TYPE = {
  CREATE: 'CHECK_OUT_CREATE',
};

export const onCheckoutAction = payload => async dispatch => {
  try {
    console.log(payload)
    dispatch(setAppLoading(true));
    const checkOutRes = await Http.post(CHECKOUT_ENDPOINTS.CREATE, payload);

    console.log('CheckoutRes: ', checkOutRes);
    if (!checkOutRes.data) {
      return;
    } else {
      dispatch({
        type: CHECKOUT_ACTION_TYPE.CREATE,
        payload: !checkOutRes.data,
      });
      Alert.alert('Success!!!', 'Check Out successfully', [
        {
          text: 'Cancel',
        },
        {text: 'OK', onPress: () => RootNavigation.goBack()},
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};
