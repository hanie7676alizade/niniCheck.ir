import * as actionTypes from "./actionTypes";

export const signup = (userData) => {
    return {
        type: actionTypes.AUTH_INITIATE_SIGNUP,
        userData
    }
}

export const authSet = (data) => {
    return {
        type: actionTypes.AUTH_SET,
        data
    };
}

export const initiateInitialAuthCheck = () => {
    return{
        type: actionTypes.AUTH_INITIATE_INITIAL_CHECK
    }
}

export const loadingStart = () => {
    return {
        type: actionTypes.AUTH_LOADING_START,
    };
}

export const loadingEnd = () => {
    return {
        type: actionTypes.AUTH_LOADING_END,
    };
}

export const logout = () => {
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const signupSetError = (errors) => {
    return {
        type: actionTypes.AUTH_SIGNUP_SET_ERROR,
        errors
    };
}

export const signin = (userData) => {
    return {
        type: actionTypes.AUTH_INITIATE_SIGNIN,
        userData
    };
}

export const signinSetError = (errors) => {
    return {
        type: actionTypes.AUTH_SIGNIN_SET_ERROR,
        errors
    };
}

