import * as actionTypes from "./actionTypes";

export const saveEmail = (email) => {
    return {
        type: actionTypes.NEWS_LETTER_INITIATE_SAVE,
        email
    }
}

export const isSaveEmail = (value=false) => {
    return {
        type: actionTypes.NEWS_LETTER_INITIATE_IS_SAVE,
        value
    }
}

export const setShowAlert = (data) => {
    return {
        type: actionTypes.NEWS_LETTER_SET_SHOW_ALERT,
        data
    }
}

export const setMessage = (data) => {
    return {
        type: actionTypes.NEWS_LETTER_SET_MESSAGE,
        data
    }
}

export const setMessageType = (data) => {
    return {
        type: actionTypes.NEWS_LETTER_SET_MESSAGE_TYPE,
        data
    }
}


