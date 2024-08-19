import { APP_LOADER_ACTION_TYPE } from "../actions/appLoaderAction"

const INITIAL_STATE = {
    loading:false
}

export const AppLoadingReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case APP_LOADER_ACTION_TYPE.APP_LOADING:
            return {
                loading: actions.payload
            }
        default:
            return state;
    }
}
