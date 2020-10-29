import * as actionTypes from "./actionTypes";

export const initiateFetchAll = () => {
    return {
        type: actionTypes.SOCIAL_NETWORK_INITIATE_FETCH_ALL,
    }
}

export const setItems = (items) => {
    return {
        type: actionTypes.SOCIAL_NETWORK_SET_ITEMS,
        data: { items }
    }
}

export const saveItem = (link, id) => {
    return {
        type: actionTypes.SOCIAL_NETWORK_INITIATE_SAVE,
        data: { link, id }
    }
}

export const setShowAlert = (data) => {
    return {
        type: actionTypes.SOCIAL_NETWORK_SET_SHOW_ALERT,
        data
    }
}

export const setMessage = (data) => {
    return {
        type: actionTypes.SOCIAL_NETWORK_SET_MESSAGE,
        data
    }
}

export const setIsSaved = (data) => {
    return {
        type: actionTypes.SOCIAL_NETWORK_SET_IS_SAVED,
        data
    }
}


