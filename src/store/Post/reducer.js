import * as actionTypes from "./actionTypes"
import { updateObject } from "store/Test/node_modules/util/helpers"

const initialState = {
    postFormErrors: {
        title: "",
        slug: "",
        introImage: "",
        content: "",
        categoryId: ""
    },
    loading: false,
    closeForm: false,
    posts: null,
    frontPosts: [],
    frontPage: 1,
    frontRows: 10,
    frontQuery: "",
    frontPost: {
        Category: {
            id: "",
            name: "",
            slug: ""
        },
        categoryId: 0,
        content: "",
        id: 0,
        introImage: "",
        slug: "",
        title: ""
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_FORM_SET_ERROR:
            return updateObject(state, { postFormErrors: action.data })
        case actionTypes.POST_FORM_SET_LOADING:
            return updateObject(state, { loading: action.data })
        case actionTypes.POST_SET_FORM_CLOSE:
            return updateObject(state, { closeForm: action.data })
        case actionTypes.POST_SET_ALL:
            return updateObject(state, { posts: action.data })
        case actionTypes.POST_SET_FRONT_ALL:
            return updateObject(state, { frontPosts: action.data })
        case actionTypes.POST_SET_FRONT_ONE:
            return updateObject(state, { frontPost: action.data })
        case actionTypes.POST_FRONT_SET_SEARCH:
            return updateObject(state, { frontQuery: action.data })
        case actionTypes.POST_FRONT_SET_PAGE:
            return updateObject(state, { frontPage: action.data })
        case actionTypes.POST_FRONT_SET_ROWS:
            return updateObject(state, { frontRows: action.data })
        default:
            return state
    }
}

export default reducer

export const getFrontRouteParams = state => {
    return {
        page: state.frontPage,
        rows: state.frontRows,
        q: state.frontQuery
    }
}