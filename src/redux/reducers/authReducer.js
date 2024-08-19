import {AUTH_ACTION_TYPES} from "../type/actionTypes";

const INITIAL_STATE = {
  failed: false,
  success: false,
  logout: false,
  user: {},
};

export const AuthReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case AUTH_ACTION_TYPES.LOGIN:
      return {
        ...state,
        success: true,
        failed: false,
        logout: false,
        user: actions.payload,
      };

    case AUTH_ACTION_TYPES.REGISTER:
      return {
        ...state,
        success: true,
        failed: false,
        logout: false,
        user: actions.payload,
      };

    case AUTH_ACTION_TYPES.UPDATE:
      return {
        ...state,
        user: {...state.user, ...actions.payload},
      };

    case AUTH_ACTION_TYPES.AUTH_FAILED:
      return {
        ...state,
        failed: true,
        success: false,
        logout: false,
        user: {},
      };

    case AUTH_ACTION_TYPES.RESET_AUTH_STATE:
      return {
        ...state,
        failed: false,
        success: false,
        logout: false,
        user: {},
      };

    case AUTH_ACTION_TYPES.LOGOUT:
      return {
        ...state,
        failed: false,
        success: false,
        logout: true,
        user: {},
      };

    default:
      return state;
  }
};

