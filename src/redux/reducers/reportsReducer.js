import { MAINTENANCE_ACTION_TYPES } from "../type/actionTypes";

const INITIAL_STATE = {
    maintenance: [],
  };

  const ReportsReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case MAINTENANCE_ACTION_TYPES.CREATE:
          return {
            maintenance: [...state.maintenance,actions.payload],
          };
    
        case MAINTENANCE_ACTION_TYPES.DELETE:
          return {
            maintenance: state.maintenance.filter(
              item => item?.report_id !== actions.payload?.report_id,
            ),
          };
        case MAINTENANCE_ACTION_TYPES.UPDATE: {
          const clone = [...state.maintenance]
          state.maintenance.filter(
            (item, index) => 
            item.report_id == actions.payload?.report_id && (clone[index] = actions.payload) 
             
          );
    
          return {
            maintenance: clone,
          };
        }
        case MAINTENANCE_ACTION_TYPES.GET:
          return {
            maintenance: actions.payload,
          };
        case MAINTENANCE_ACTION_TYPES.GET_ALL:
          return {
            maintenance: actions.payload,
          };
    
        default:
          return state;
      }
  }
export default ReportsReducer