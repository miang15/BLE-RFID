import * as RootNavigation from '../../navigation/RootNavigator';
import Http from '../../Services/Http';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {setAppLoading} from './appLoaderAction';
import { MAINTENANCE_ENDPOINTS } from '../../Services/api';
import { MAINTENANCE_ACTION_TYPES } from '../type/actionTypes';

export const onCreateMaintenance = payload => async dispatch => {
    try {
        dispatch(setAppLoading(true))
        const maintenanceRes = await Http.post(MAINTENANCE_ENDPOINTS.CREATE,payload)
        console.log("maintenance added: ",maintenanceRes?.data)
        if(!maintenanceRes.data){
            return
        } else {
            dispatch({
                type: MAINTENANCE_ACTION_TYPES.CREATE,
                payload: maintenanceRes?.data,
              });
              Alert.alert('Success!!!', 'Maintenance added successfully', [
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