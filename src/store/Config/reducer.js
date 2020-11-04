import * as actionTypes from "./actionTypes";
import { updateObject } from "store/Test/node_modules/util/helpers";

const initialState = {
    loading: false,
    config: [],
    message: "",
    showAlert: false,
    isSaved: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONFIG_SET:
            return updateObject(state, { config: action.data })
        case actionTypes.CONFIG_SET_LOADING:
            return updateObject(state, { loading: action.data })
            case actionTypes.CONFIG_SET_SHOW_ALERT:
                return updateObject(state, { showAlert: action.data })
            case actionTypes.CONFIG_SET_MESSAGE:
                return updateObject(state, { message: action.data })
            case actionTypes.CONFIG_SET_IS_SAVED:
                return updateObject(state, { isSaved: action.data })
        default:
            return state;
    }
}

export default reducer;