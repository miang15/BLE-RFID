import { CATEGORIES_ENDPOINTS } from '../../Services/api';
import Http from '../../Services/Http';
import { CATEGORY_ACTION_TYPES } from '../type/actionTypes';
import { setAppLoading } from './appLoaderAction';

export const onCreateCategory = payload => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const category = await Http.post(CATEGORIES_ENDPOINTS.CREATE, payload);
      
      if (!category.data) {
        return;
      } else {
        dispatch({
          type: CATEGORY_ACTION_TYPES.CREATE,
          payload: category?.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const onUpdateCategory = payload => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const category = await Http.put(CATEGORIES_ENDPOINTS.UPDATE, payload);

      if (!category.data) {
        return;
      } else {
        dispatch({
          type: CATEGORY_ACTION_TYPES.UPDATE,
          payload: category.data.category,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const onDeleteCategory = payload => {
  return async dispatch => {

    try {
      dispatch(setAppLoading(true));
      const category = await Http.delete(CATEGORIES_ENDPOINTS.DELETE, {
        data: {
          category_id:payload?.category_id
        },
      });

      if (!category?.data) {
        return;
      } else {
        dispatch({
          type: CATEGORY_ACTION_TYPES.DELETE,
          payload: category?.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const onGetAllCategories = () => {
  return async dispatch => {
    try {
      dispatch(setAppLoading(true));
      const category = await Http.get(CATEGORIES_ENDPOINTS.GET);

      if (!category.data) {
        return;
      } else {
        dispatch({
          type: CATEGORY_ACTION_TYPES.GET_ALL,
          payload: category?.data?.data,
        });
      }
    } catch (err) {
      console.log(err)
    }
  };
};
