import * as RootNavigation from '../../navigation/RootNavigator';
import {SITE_ENDPOINTS} from '../../Services/api';
import Http from '../../Services/Http';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import { setAppLoading } from './appLoaderAction';
import { SITE_ACTION_TYPES } from '../type/actionTypes';

export const onCreateSite = payload => async dispatch => {
  
  try {
    dispatch(setAppLoading(true));
    const createSiteRes = await Http.post(SITE_ENDPOINTS.CREATE, payload)

    if(!createSiteRes?.data){
      return
    } else {
      dispatch({
        type: SITE_ACTION_TYPES.CREATE,
        payload: createSiteRes?.data,
      });
      Alert.alert(
        "Success!!!",
        "Site created successfully",
        [
          {
            text: "Cancel",
          },
          { text: "OK", onPress: () => RootNavigation.goBack() }
        ]
      );
      
    }

  } catch (error) {
    console.log(error);
  }
};

export const onGetAllSites = ()  => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const allSiteRes = await Http.get(SITE_ENDPOINTS.GET)
    if(!allSiteRes?.data){
      return
    } else {
      dispatch({
        type: SITE_ACTION_TYPES.GET_ALL,
        payload: allSiteRes?.data?.data,
      });
    }   
  } catch (error) {
    console.log(error)
  }
}

export const onDeleteSite = payload  => async dispatch => {
  
  try {
    dispatch(setAppLoading(true));
    const deleteRes = await Http.delete(SITE_ENDPOINTS.DELETE, {
      data: {
        site_id: payload?.site_id,
      }
    })

    if(!deleteRes?.data){
      return
    } else {
      dispatch({
        type: SITE_ACTION_TYPES.DELETE,
        payload: deleteRes?.data
      });
    }   
  } catch (error) {
    console.log(error)
  }
}