export const APP_LOADER_ACTION_TYPE = {
    APP_LOADING: "APP_LOADING"
}

export const setAppLoading = loading => dispatch => {
    dispatch({
        type: APP_LOADER_ACTION_TYPE.APP_LOADING,
        payload: loading,
    })
}