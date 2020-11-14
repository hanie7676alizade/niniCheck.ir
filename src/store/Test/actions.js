import * as actionTypes from "./actionTypes";

export const setMobileNumber = (mobileNumber) => {
    return {
        type: actionTypes.TEST_SET_MOBILE_NUMBER,
        mobileNumber
    }
}
export const sendCode = (mobileNumber) => {//saga
    return {
        type: actionTypes.TEST_SEND_CODE,
        mobileNumber
    }
}
export const verifyCode = (mobileNumber, code) => {//saga
    return {
        type: actionTypes.TEST_VERIFY_CODE,
        mobileNumber,
        code
    }
}
export const isVerified = data => {
    return {
        type: actionTypes.TEST_IS_VERIFIED,
        data
    }
}
export const FetchQuestion = mobileNumber => {//Saga
    return {
        type: actionTypes.TEST_FETCH_QUESTION,
        mobileNumber
    }
}
export const setQuestion = (question) => {
    return {
        type: actionTypes.TEST_SET_QUESTION,
        question,
    }
}
export const setStep = (step) => {
    return {
        type: actionTypes.TEST_SET_STEP,
        step
    }
}
export const setAnswer = (answers) => {
    return {
        type: actionTypes.TEST_SET_ANSWER,
        answers
    }
}
export const saveAnswer = (mobileNumber, question_id, answer_id) => {
    return {
        type: actionTypes.TEST_SAVE_ANSWER,
        mobileNumber,
        question_id,
        answer_id
    }
}
//
export const setLoading = (data) => {
    return {
        type: actionTypes.TEST_SET_LOADING,
        data
    }
}
export const setError = (data) => {
    return {
        type: actionTypes.TEST_SET_ERROR,
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
export const setMessageType = (data) => {
    return {
        type: actionTypes.TEST_SET_MESSAGE_TYPE,
        data
    }
}