import * as actionTypes from "./actionTypes";
import { updateObject } from "util/helpers";

const initialState = {
    loading: false,
    mobileNumber: '',
    question: [],
    message: "",
    messageType: "",
    showAlert: false,
    step: -1,
    isVerified: false,
    answers: [],
    female: 0,
    male: 0,
    showModal: false
}

const reducer = (state = initialState, action) => {
    console.log(action, 'action called');
    switch (action.type) {
        case actionTypes.TEST_SET_STEP:
            return updateObject(state, { step: action.step })
        case actionTypes.TEST_SET_MOBILE_NUMBER:
            return updateObject(state, { mobileNumber: action.mobileNumber })
        case actionTypes.TEST_IS_VERIFIED:
            return updateObject(state, { isVerified: action.data })
        case actionTypes.TEST_SET_QUESTION:
            return updateObject(state, { question: action.question })
        case actionTypes.TEST_SET_FEMALE:
            return updateObject(state, { female: action.data })
        case actionTypes.TEST_SET_MALE:
            return updateObject(state, { male: action.data })
        case actionTypes.TEST_SET_ANSWER:
            return updateObject(state, { answers: action.answers })
        case actionTypes.TEST_SET_SHOW_MODAL:
            return updateObject(state, { showModal: action.data })
        case actionTypes.TEST_SET_LOADING:
            return updateObject(state, { loading: action.data })
        case actionTypes.TEST_SET_SHOW_ALERT:
            return updateObject(state, { showAlert: action.data })
        case actionTypes.TEST_SET_MESSAGE:
            return updateObject(state, { message: action.data })
        case actionTypes.TEST_SET_MESSAGE_TYPE:
            return updateObject(state, { messageType: action.data })
        default:
            return state;
    }
}

export default reducer;