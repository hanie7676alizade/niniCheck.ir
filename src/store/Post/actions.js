import * as actionTypes from "./actionTypes"

export const newPost = data => {
    return {
        type: actionTypes.POST_INITIATE_STORE,
        data
    }
}

export const updatePost = data => {
    return {
        type: actionTypes.POST_INITIATE_UPDATE,
        data
    }
}

export const formSetError = data => {
    return {
        type: actionTypes.POST_FORM_SET_ERROR,
        data
    }
}

export const setLoading = data => {
    return {
        type: actionTypes.POST_FORM_SET_LOADING,
        data
    }
}

export const setFormClose = data => {
    return {
        type: actionTypes.POST_SET_FORM_CLOSE,
        data
    }
}

export const fetchAll = (page = 1) => {
    return {
        type: actionTypes.POST_FETCH_ALL,
        page
    }
}

export const setAll = data => {
    return {
        type: actionTypes.POST_SET_ALL,
        data
    }
}

export const deletePost = data => {
    return {
        type: actionTypes.POST_INITIATE_DELETE,
        data
    }
}

export const frontFetchAll = data => {
    return {
        type: actionTypes.POST_INITIATE_FRONT_FETCH_ALL,
        data
    }
}

export const frontSetSearch = data => {
    return {
        type: actionTypes.POST_FRONT_SET_SEARCH,
        data
    }
}

export const frontSetPage = data => {
    return {
        type: actionTypes.POST_FRONT_SET_PAGE,
        data
    }
}
export const frontSetRows = data => {
    return {
        type: actionTypes.POST_FRONT_SET_ROWS,
        data
    }
}

export const frontSetAll = data => {
    return {
        type: actionTypes.POST_SET_FRONT_ALL,
        data
    }
}

export const frontFetchOne = data => {
    return {
        type: actionTypes.POST_INITIATE_FRONT_FETCH_ONE,
        data
    }
}

export const frontSetOne = data => {
    return {
        type: actionTypes.POST_SET_FRONT_ONE,
        data
    }
}
