import * as actionTypes from "./actionTypes";
import { updateObject } from "util/helpers";

const initialState = {
    socialNetworks: [],
    message: "",
    showAlert: false,
    isSaved: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SOCIAL_NETWORK_SET_ITEMS:
            return updateObject(state, { socialNetworks: action.data.items })
        case actionTypes.SOCIAL_NETWORK_SET_SHOW_ALERT:
            return updateObject(state, { showAlert: action.data })
        case actionTypes.SOCIAL_NETWORK_SET_MESSAGE:
            return updateObject(state, { message: action.data })
        case actionTypes.SOCIAL_NETWORK_SET_IS_SAVED:
            return updateObject(state, { isSaved: action.data })
        // case actionTypes.POST_SET_FRONT_ALL:
        //     return updateObject(state, { frontPosts: action.data })
        // case actionTypes.POST_SET_FRONT_ONE:
        //     return updateObject(state, { frontPost: action.data })
        default:
            return state;
    }
}

export default reducer