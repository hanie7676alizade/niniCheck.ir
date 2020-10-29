import * as actionTypes from "./actionTypes";
import { updateObject } from "../../util/helpers";

const initialState = {
    error: {},
    loading: false,
    documentTitle: "نی نی چک"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMMON_SET_ERROR:
            return updateObject(state, { error: action.error })
        case actionTypes.COMMON_SET_LOADING:
            return updateObject(state, { loading: action.data.loading })
        case actionTypes.COMMON_SET_DOCUMENT_TITLE:
            return updateObject(state, { documentTitle: action.data.title })
        default:
            return state
    }
}

export default reducer