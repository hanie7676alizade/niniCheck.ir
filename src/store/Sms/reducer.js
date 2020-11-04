import * as actionTypes from "./actionTypes";
import { updateObject } from "store/Test/node_modules/util/helpers";

const initialState = {
    sent:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SMS_SET_SENDING_STATE:
            return updateObject(state, { sent: action.data })
        default:
            return state;
    }
}

export default reducer