import { ASSET_ACTION_TYPES } from "../type/actionTypes";


const INITIAL_STATE = {
  asset: [],
};

const AssetReducer = (state = INITIAL_STATE, actions) => {

  switch (actions.type) {
    case ASSET_ACTION_TYPES.CREATE:
      return {
        asset: [...state.asset,actions.payload],
      };

    case ASSET_ACTION_TYPES.DELETE:
      return {
        asset: state.asset.filter(
          item => item?.asset_id !== actions.payload?.asset_id,
        ),
      };
    case ASSET_ACTION_TYPES.UPDATE: {
      const clone = [...state.asset]
      state.asset.filter(
        (item, index) => 
        item.asset_id == actions.payload?.asset_id && (clone[index] = actions.payload) 
         
      );

      return {
        asset: clone,
      };
    }
    case ASSET_ACTION_TYPES.GET:
      return {
        asset: actions.payload,
      };
    case ASSET_ACTION_TYPES.GET_ALL:
      return {
        asset: actions.payload,
      };

    default:
      return state;
  }
};

export default AssetReducer