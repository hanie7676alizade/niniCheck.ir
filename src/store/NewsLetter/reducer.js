import * as actionTypes from "./actionTypes";
import { updateObject } from "store/Test/node_modules/util/helpers";

const initialState = {
    message: "",
    messageType: "",
    showAlert: false,
    isSave: false,
}

const reducer = (state = initialState, action) => {
    // console.log(action , 'action');
    switch (action.type) {
        case actionTypes.NEWS_LETTER_INITIATE_IS_SAVE:
            return updateObject(state, { isSave: action.value })
        case actionTypes.NEWS_LETTER_SET_SHOW_ALERT:
            return updateObject(state, { showAlert: action.data })
        case actionTypes.NEWS_LETTER_SET_MESSAGE:
            return updateObject(state, { message: action.data })
        case actionTypes.NEWS_LETTER_SET_MESSAGE_TYPE:
            return updateObject(state, { messageType: action.data })
        default:
            return state;
    }
}

export default reducer