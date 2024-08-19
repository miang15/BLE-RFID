import * as RootNavigation from '../../navigation/RootNavigator';
import { Alert } from 'react-native';
import {EMPLOYEES_ENDPOINTS} from '../../Services/api';
import Http from '../../Services/Http';
import {setAppLoading} from './appLoaderAction';
import { EMPLOYEE_ACTION_TYPES } from '../type/actionTypes';

export const onCreateEmployee = payload => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const employeeRes = await Http.post(EMPLOYEES_ENDPOINTS.CREATE, payload);
      if (!employeeRes?.data) {
        return;
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_TYPES.CREATE,
          payload: employeeRes?.data,
        })
        Alert.alert('Success!!!', 'Employee Created successfully', [
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

export const onUpdateEmployee = payload => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const updateEmployeeRes = await Http.put(
        EMPLOYEES_ENDPOINTS.UPDATE,
        payload,
      );

      if (!updateEmployeeRes?.data) {
        return;
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_TYPES.UPDATE,
          payload: updateEmployeeRes?.data?.employee,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const onDeleteEmployee = payload => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const deleteEmployeeRes = await Http.delete(EMPLOYEES_ENDPOINTS.DELETE, {
        data: payload,
      });
      console.log(employee);
      if (!deleteEmployeeRes?.data) {
        return;
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_TYPES.DELETE,
          payload: employee.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const onGetAllEmployee = () => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const getAllemployeeRes = await Http.get(EMPLOYEES_ENDPOINTS.GET);
      if (!getAllemployeeRes?.data) {
        return;
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_TYPES.GET_ALL,
          payload: getAllemployeeRes?.data?.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
