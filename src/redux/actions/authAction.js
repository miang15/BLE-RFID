import * as RootNavigation from '../../navigation/RootNavigator';
import {AUTH_ENDPOINTS} from '../../Services/api';
import {setLocalStorage, getLocalStorage} from '../../Shared/functions';
import {STORAGE_KEYS} from '../../Shared/constants';
import Http from '../../Services/Http';
import {useNavigation} from '@react-navigation/native';
import {setAppLoading} from './appLoaderAction';
import { Alert } from 'react-native';
import { AUTH_ACTION_TYPES } from '../type/actionTypes';

export const signUpAction = payload => async dispatch => {
  const {email, firstName, lastName, password} = payload;

  try {
    dispatch(setAppLoading(true));
    const signUpRes = await Http.post(AUTH_ENDPOINTS.SIGNUP, {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
      role: 'user',
    });
    if (!signUpRes.data) {
      return;
    } else {
      Alert.alert(
        "Success!!!",
        "Sign Up successfully",
        [
          {
            text: "Cancel",
          },
          { text: "OK", onPress: () => RootNavigation.navigate('SignIn') }
        ]
      );
      
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginAction = payload => async dispatch => {
  const {email, password} = payload;

  try {
    dispatch(setAppLoading(true));
    const loginRes = await Http.post(AUTH_ENDPOINTS.LOGIN, {
      email: email,
      password: password,
    });

    if (!loginRes.data) {
      return;
    } else {
      await setLocalStorage(STORAGE_KEYS.TOKEN, loginRes.data.token).then(
        () => {
          dispatch({
            type: AUTH_ACTION_TYPES.LOGIN,
            payload: loginRes?.data,
          });
          RootNavigation.navigate('DrawerIndex');
        },
      );
    }
  } catch (error) {}
};

export const userUpdateAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const updateRes = await Http.put(AUTH_ENDPOINTS.UPDATE , payload);
    console.log("updatedUserRes: ",updateRes?.data)
    if (!updateRes.data) {
      return;
    } else {
      dispatch({
        type: AUTH_ACTION_TYPES.UPDATE,
            payload: updateRes?.data,
      })
      Alert.alert('Success!!!', 'User Profile Updated successfully', [
        {
          text: 'Cancel',
        },
        {text: 'OK', onPress: () => RootNavigation.goBack()},
      ]);
    }
  } catch (error) {
    console.log(error)
  }
}