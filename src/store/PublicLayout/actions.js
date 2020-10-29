import * as actionTypes from "./actionTypes";

export const getLayoutData = () => {
    return {
        type: actionTypes.PUBLIC_LAYOUT_GET_LAYOUT_DATA,
    }
}

export const setLayoutData = (data) => {
    return {
        type: actionTypes.PUBLIC_LAYOUT_SET_LAYOUT_DATA,
        data
    }
}




