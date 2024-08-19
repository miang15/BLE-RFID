import {SITE_ACTION_TYPES} from "../type/actionTypes";

const INITIAL_STATE = {
  sites: [],
};

const SiteReducer = (state = INITIAL_STATE, actions) => {

  switch (actions.type) {
    case SITE_ACTION_TYPES .CREATE:
      return {
        sites: [...state.sites,actions.payload],
      };

    case SITE_ACTION_TYPES.DELETE:
      return {
        sites: state.sites.filter(
          item => item?.site_id !== actions.payload?.site_id,
        ),
      };
    case SITE_ACTION_TYPES.UPDATE: {
      const clone = [...state.sites]
      const index = state.sites.filter((item, index) => {
        if (item.site_id == actions.payload?.site_id) {
          return index;
        }
      });

      clone[index] = actions.payload
      return {
        sites: clone,
      };
    }
    case SITE_ACTION_TYPES.GET:
      return {
        sites: actions.payload,
      };
    case SITE_ACTION_TYPES.GET_ALL:
      return {
        sites: actions.payload,
      };

    default:
      return state;
  }
};

export default SiteReducer