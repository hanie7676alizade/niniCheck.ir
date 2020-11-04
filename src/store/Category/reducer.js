import * as actionTypes from "./actionTypes";
import { updateObject } from "store/Test/node_modules/util/helpers";

const initialState = {
    categoryFormErrors: {
        name: "",
    },
    loading: false,
    closeForm: false,
    categories:[],
    frontCategories:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_FORM_SET_ERROR:
            return updateObject(state, { categoryFormErrors: action.data })
        case actionTypes.CATEGORY_FORM_SET_LOADING:
            return updateObject(state, { loading: action.data })
        case actionTypes.CATEGORY_SET_FORM_CLOSE:
            return updateObject(state, { closeForm: action.data })
        case actionTypes.CATEGORY_SET_ALL:
            return updateObject(state, { categories: action.data })
        case actionTypes.CATEGORY_SET_FRONT_ALL:
            return updateObject(state, { frontCategories: action.data })
        default:
            return state;
    }
}

export default reducer