import * as actionTypes from "./actionTypes";
import { updateObject } from "store/Test/node_modules/util/helpers";

const initialState = {
    categories: [],
    socialNetworks: [],
    posts: [],
    config: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PUBLIC_LAYOUT_SET_LAYOUT_DATA:
            return updateObject(state, {
                categories: action.data.categories,
                socialNetworks: action.data.socialNetworks,
                posts: action.data.posts,
                config: action.data.config,
            })
        default:
            return state;
    }
}

export default reducer