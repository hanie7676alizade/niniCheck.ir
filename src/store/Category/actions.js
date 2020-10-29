import * as actionTypes from "./actionTypes";


export const newCategory = (data) => {
    return {
        type: actionTypes.CATEGORY_INITIATE_STORE,
        data
    }
}

export const updateCategory = (data) => {
    return {
        type: actionTypes.CATEGORY_INITIATE_UPDATE,
        data
    }
}

export const formSetError = (data) => {
    return {
        type: actionTypes.CATEGORY_FORM_SET_ERROR,
        data
    }
}

export const setLoading = (data) => {
    return {
        type: actionTypes.CATEGORY_FORM_SET_LOADING,
        data
    }
}

export const setFormClose = (data) => {
    return {
        type: actionTypes.CATEGORY_SET_FORM_CLOSE,
        data
    }
}

export const fetchAll = () => {
    return {
        type: actionTypes.CATEGORY_FETCH_ALL,
    }
}

export const setAll = (data) => {
    return {
        type: actionTypes.CATEGORY_SET_ALL,
        data
    }
}

export const deleteCategory = (data) => {
    return {
        type: actionTypes.CATEGORY_INITIATE_DELETE,
        data
    }
}

export const fetchFrontAll = () => {
    return {
        type: actionTypes.CATEGORY_INITIATE_FETCH_FRONT_ALL,
    }
}

export const setFrontAll = (data) => {
    return {
        type: actionTypes.CATEGORY_SET_FRONT_ALL,
        data
    }
}


