import * as actionTypes from "./actionTypes";

export const setError = (error) => {
    return {
        type: actionTypes.COMMON_SET_ERROR,
        error
    }
}

export const setLoading = (loading) => {
    return {
        type: actionTypes.COMMON_SET_LOADING,
        data: { loading }
    }
}

export const setDocumentTitle = (title) => {
    return {
        type: actionTypes.COMMON_SET_DOCUMENT_TITLE,
        data: { title }
    }
}
