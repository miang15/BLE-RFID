import {LOCATION_ACTION_TYPES} from "../type/actionTypes";

const INITIAL_STATE = {
  locations: [],
};

const LocationReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case LOCATION_ACTION_TYPES.CREATE:
      return {
        locations: [...state.locations,actions.payload],
      };

    case LOCATION_ACTION_TYPES.DELETE:
      return {
        locations: state.locations.filter(
          item => item?.location_id !== actions.payload?.location_id,
        ),
      };
    case LOCATION_ACTION_TYPES.UPDATE: {
      const clone = [...state.locations]
      const index = state.locations.filter((item, index) => {
        if (item.location_id == actions.payload.location_id) {
          return index;
        }
      });

      clone[index] = actions.payload
      return {
        locations: clone,
      };
    }
    case LOCATION_ACTION_TYPES.GET:
      return {
        locations: actions.payload,
      };
    case LOCATION_ACTION_TYPES.GET_ALL:
      return {
        locations: actions.payload,
      };

    default:
      return state;
  }
};

export default LocationReducer