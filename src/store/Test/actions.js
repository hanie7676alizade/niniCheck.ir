import * as actionTypes from "./actionTypes";

export const setMobileNumber = (mobileNumber) => {
    return {
        type: actionTypes.TEST_SET_MOBILE_NUMBER,
        mobileNumber
    }
}
export const setStep = (step) => {
    return {
        type: actionTypes.TEST_SET_STEP,
        step
    }
}
export const saveMobileNumber = (mobileNumber) => {
    return {
        type: actionTypes.TEST_SAVE_MOBILE_NUMBER,
        mobileNumber
    }
}
export const initiateFetchTest = code => {
    return {
        type: actionTypes.TEST_INITIATE_FETCH,
        code
    }
}
export const setQuestion = (question) => {
    return {
        type: actionTypes.TEST_SET_QUESTION,
        question,
    }
}
export const setLoading = (data) => {
    return {
        type: actionTypes.TEST_SET_LOADING,
        data
    }
}
export const setShowAlert = (data) => {
    return {
        type: actionTypes.TEST_SET_SHOW_ALERT,
        data
    }
}
export const setMessage = (data) => {
    return {
        type: actionTypes.TEST_SET_MESSAGE,
        data
    }
}
export const setIsSaved = (data) => {
    return {
        type: actionTypes.TEST_SET_IS_SAVED,
        data
    }
}