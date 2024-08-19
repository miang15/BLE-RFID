import * as RootNavigation from '../../navigation/RootNavigator';
import {ASSETS_FIELDS_ENDPOINTS} from '../../Services/api';
import Http from '../../Services/Http';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import { setAppLoading } from './appLoaderAction';
import { ASSET_FIELD_ACTION_TYPES } from '../type/actionTypes';

export const onCreateAssetField = payload => async dispatch => {
  
  try {
    dispatch(setAppLoading (true));
    const createAssetFieldRes = await Http.post(ASSETS_FIELDS_ENDPOINTS.CREATE, payload)

    if(!createAssetFieldRes?.data){
      return
    } else {
      dispatch({
        type: ASSET_FIELD_ACTION_TYPES.CREATE,
        payload: createAssetFieldRes?.data,
      });
      Alert.alert(
        "Success!!!",
        "Asset field created successfully",
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

export const onGetAllAssetFields = ()  => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const allAssetFieldRes = await Http.get(ASSETS_FIELDS_ENDPOINTS.GET)

    if(!allAssetFieldRes?.data){
      return
    } else {
      dispatch({
        type: ASSET_FIELD_ACTION_TYPES.GET_ALL,
        payload: allAssetFieldRes?.data?.data,
      });
    }   
  } catch (error) {
    console.log(error)
  }
}

export const onDeleteAssetField = payload  => async dispatch => {
  
  try {
    dispatch(setAppLoading(true));
    const deleteAssetFieldRes = await Http.delete(ASSETS_FIELDS_ENDPOINTS.DELETE, {
      data: {
        field_id: payload?.field_id,
      }
    })
    if(!deleteAssetFieldRes?.data){
      return
    } else {
      dispatch({
        type: ASSET_FIELD_ACTION_TYPES.DELETE,
        payload: deleteAssetFieldRes?.data
      });
    }   
  } catch (error) {
    console.log(error)
  }
}