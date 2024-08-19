import * as RootNavigation from '../../navigation/RootNavigator';
import Http from '../../Services/Http';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {ASSETS_ENDPOINTS} from '../../Services/api';
import {setAppLoading} from './appLoaderAction';
import {ASSET_ACTION_TYPES} from '../type/actionTypes';

export const onCreateAsset = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const createAssetRes = await Http.post(ASSETS_ENDPOINTS.CREATE, payload);

    if (!createAssetRes?.data) {
      return;
    } else {
      dispatch({
        type: ASSET_ACTION_TYPES.CREATE,
        payload: createAssetRes?.data,
      });
      Alert.alert('Success!!!', 'Asset created successfully', [
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

export const onGetAllAssets = () => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const allAssetRes = await Http.get(ASSETS_ENDPOINTS.GET);

    if (!allAssetRes?.data) {
      return;
    } else {
      dispatch({
        type: ASSET_ACTION_TYPES.GET_ALL,
        payload: allAssetRes?.data?.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteAsset = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const deleteAssetRes = await Http.delete(ASSETS_ENDPOINTS.DELETE, {
      data: {
        asset_id: payload?.asset_id,
      },
    });

    if (!deleteAssetRes?.data) {
      return;
    } else {
      dispatch({
        type: ASSET_ACTION_TYPES.DELETE,
        payload: deleteAssetRes?.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateAsset = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const updateAssetRes = await Http.put(ASSETS_ENDPOINTS.UPDATE, payload);
    console.log('updated asset: ', updateAssetRes?.data?.asset);
    if (!updateAssetRes?.data) {
      return;
    } else {
      dispatch({
        type: ASSET_ACTION_TYPES.UPDATE,
        payload: updateAssetRes?.data?.asset,
      });
      Alert.alert('Success!!!', 'Asset updated successfully', [
        {
          text: 'Cancel',
        },
        {text: 'OK', onPress: () => RootNavigation.navigate('ViewAsset')},
      ]);
    }
  } catch (error) {}
};
