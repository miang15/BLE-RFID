import { ASSET_FIELD_ACTION_TYPES } from "../type/actionTypes";

const INITIAL_STATE = {
  assetFields: [],
};

const AssetFieldReducer = (state = INITIAL_STATE, actions) => {

  switch (actions.type) {
    case ASSET_FIELD_ACTION_TYPES.CREATE:
      return {
        assetFields: [...state.assetFields,actions.payload],
      };

    case ASSET_FIELD_ACTION_TYPES.DELETE:
      return {
        assetFields: state.assetFields.filter(
          item => item?.field_id !== actions.payload?.field_id,
        ),
      };
    case ASSET_FIELD_ACTION_TYPES.UPDATE: {
      const clone = [...state.assetFields]
      const index = state.assetFields.filter((item, index) => {
        if (item.field_id == actions.payload?.field_id) {
          return index;
        }
      });

      clone[index] = actions.payload
      return {
        assetFields: clone,
      };
    }
    case ASSET_FIELD_ACTION_TYPES.GET:
      return {
        assetFields: actions.payload,
      };
    case ASSET_FIELD_ACTION_TYPES.GET_ALL:
      return {
        assetFields: actions.payload,
      };

    default:
      return state;
  }
};

export default AssetFieldReducer