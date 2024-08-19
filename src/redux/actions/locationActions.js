import * as RootNavigation from '../../navigation/RootNavigator';
import {LOCATION_ENDPOINTS} from '../../Services/api';
import Http from '../../Services/Http';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import { setAppLoading } from './appLoaderAction';
import { LOCATION_ACTION_TYPES } from '../type/actionTypes';

export const onCreateLocation = payload => async dispatch => {
  const {location, siteName, siteId} = payload;  
  try {
    dispatch(setAppLoading(true));
    const createLocationRes = await Http.post(LOCATION_ENDPOINTS.CREATE, {
      location_name : location,
      site_id: siteId,
    })

    if(!createLocationRes?.data){
      return
    } else {
      dispatch({
        type: LOCATION_ACTION_TYPES.CREATE,
        payload: createLocationRes?.data,
      });
      Alert.alert(
        "Success!!!",
        "Location created successfully",
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

export const onGetAllLocations = ()  => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const allLocationRes = await Http.get(LOCATION_ENDPOINTS.GET)
    
    if(!allLocationRes?.data){
      return
    } else {
      dispatch({
        type: LOCATION_ACTION_TYPES.GET,
        payload: allLocationRes?.data?.data,
      });
    }   
  } catch (error) {
    console.log(error)
  }
}
export const onDeleteLocation = payload  => async dispatch => {
  
  try {
    dispatch(setAppLoading(true));
    const deleteRes = await Http.delete(LOCATION_ENDPOINTS.DELETE, {
      data: {
        site_id: payload?.site_id,
        location_id: payload?.location_id
      }
    })

    if(!deleteRes?.data){
      return
    } else {
      dispatch({
        type: LOCATION_ACTION_TYPES.DELETE,
        payload: deleteRes?.data
      });
    }   
  } catch (error) {
    console.log(error)
  }
}