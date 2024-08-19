import {combineReducers} from 'redux';
import  {AuthReducer}  from './reducers/authReducer'
import LocationReducer from './reducers/locationReducer'
import CategoryReducer from './reducers/categoryReducer'
import SiteReducer from './reducers/siteReducer'
import AssetReducer from './reducers/assetReducer';
import AssetFieldReducer from './reducers/assetFieldReducer';
import {AppLoadingReducer} from './reducers/appLoadingReducer';
import EmployeeReducer from './reducers/EmployeeReducer';
import CheckoutReducer from './reducers/checkoutReducer';
import ReportsReducer from './reducers/reportsReducer';

export const reducers = combineReducers({
  AuthReducer ,
  LocationReducer,
  SiteReducer,
  CategoryReducer,
  AssetReducer,
  AssetFieldReducer,
  AppLoadingReducer,
  EmployeeReducer,
  CheckoutReducer,
  ReportsReducer
});

export const RootReducer = (state, action) => {
  //Reset Global state
  if (action.type === 'LOGOUT_USER') {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};
