import axios from 'axios';
import * as RootNavigation from '../navigation/RootNavigator';

import {STORAGE_KEYS, TOAST_STATUS} from '../Shared/constants';
import {getLocalStorage, removeLocalStorage} from '../Shared/functions';
import { Alert } from 'react-native';
import { store } from '../redux/store';
import { setAppLoading } from '../redux/actions/appLoaderAction';
import { showMessage, hideMessage } from "react-native-flash-message";

const BASE_URL = `http://192.168.18.12:4000/api/v1/`;
// const BASE_URL = `http://184.168.119.143:3306/api/v1/`;

const Http = axios.create({
  baseURL: BASE_URL,
});

Http.interceptors.request.use(
  async config => {
    //token
    const token = (await getLocalStorage(STORAGE_KEYS.TOKEN)) || '';
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  err => Promise.reject(err),
);

const ResponseInterceptor = response => {
    store.dispatch(setAppLoading(false));
    
  return response;
};

Http.interceptors.response.use(ResponseInterceptor, err => {
    store.dispatch(setAppLoading(false));
  if (err?.response?.status === 401) {
    //unthorized user
    removeLocalStorage(STORAGE_KEYS.TOKEN);
    // RootNavigation.navigate('Sign-in');
  }

  if (err) {
    // Alert.alert("Error",err?.response?.data?.message)
    showMessage({
      message: "Error",
      description: err?.response?.data?.message,
      type: "danger",
    });
    
  }

  return err;
});

export default Http;
