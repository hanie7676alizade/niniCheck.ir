import * as actionTypes from "./actionTypes";
import Auth from "../../util/Auth";
import { updateObject } from "../../util/helpers";

const initialState = {
    signupErrors: {
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    },
    signinErrors: {
        username: "",
        password: "",
    },
    loading: false,
    auth: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SET:
            return updateObject(state, { auth: new Auth(action.data.user, action.data.token) })
        case actionTypes.AUTH_LOADING_START:
            return updateObject(state, { loading: true })
        case actionTypes.AUTH_LOADING_END:
            return updateObject(state, { loading: false })
        case actionTypes.AUTH_SIGNUP_SET_ERROR:
            return updateObject(state, { signupErrors: action.errors })
        case actionTypes.AUTH_SIGNIN_SET_ERROR:
            return updateObject(state, { signinErrors: action.errors })
        default:
            return state;
    }
}

export default reducer