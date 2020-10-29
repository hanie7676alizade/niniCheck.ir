import * as actionTypes from "./actionTypes";

export const initiateFetchConfig = (section) => {
    return {
        type: actionTypes.CONFIG_INITIATE_FETCH,
        section
    }
}

export const setConfig = (data,section) => {
    return {
        type: actionTypes.CONFIG_SET,
        data,
        section
    }
}

export const saveConfig = (data ) => {
    return {
        type: actionTypes.CONFIG_SAVE,
        data,
    }
}

export const setLoading = () => {
    return {
        type: actionTypes.CONFIG_SET_LOADING,
    }
}

export const setShowAlert = (data) => {
    return {
        type: actionTypes.CONFIG_SET_SHOW_ALERT,
        data
    }
}

export const setMessage = (data) => {
    return {
        type: actionTypes.CONFIG_SET_MESSAGE,
        data
    }
}

export const setIsSaved = (data) => {
    return {
        type: actionTypes.CONFIG_SET_IS_SAVED,
        data
    }
}