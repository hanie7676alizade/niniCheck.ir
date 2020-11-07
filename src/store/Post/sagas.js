import { put } from "redux-saga/effects"
import store, * as fromStore from "store/reducer"
import { createBrowserHistory } from "history"

import axios from "axiosInstance"
import * as actions from "./actions"
import { setLoading } from "../Common/actions"

export function* storeSaga(action) {
    yield put(
        actions.formSetError({
            name: ""
        })
    )
    yield put(setLoading(true))
    yield put(actions.setLoading(true))
    try {
        yield axios.post("admin/post", action.data)
        yield put(actions.setFormClose(true))
        // yield put(actions.fetchAll());
    } catch (err) {
        console.log("saga", err.response)
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data))
        yield put(actions.setLoading(false))
        yield put(setLoading(false))
    }
}

export function* updateSaga(action) {
    yield put(
        actions.formSetError({
            name: ""
        })
    )
    yield put(setLoading(true))
    yield put(actions.setLoading(true))
    try {
        yield axios.put("admin/post/" + action.data.id, action.data)
        yield put(actions.setFormClose(true))
        // yield put(actions.fetchAll());
    } catch (err) {
        console.log("saga", err.response)
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data))
        yield put(actions.setLoading(false))
        yield put(setLoading(false))
    }
}

export function* fetchAllSaga(action) {
    yield put(setLoading(true))
    yield put(actions.setLoading(true))
    try {
        const response = yield axios.get(`admin/post/${action.page}`)
        // yield put(actions.setFormClose(true));
        yield put(actions.setAll(response.data))
    } catch (err) {
        console.log("saga", err.response)
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data))
    } finally {
        yield put(actions.setLoading(false))
        yield put(setLoading(false))
    }
}

export function* fetchFrontAllSaga(action) {
    yield put(setLoading(true))
    try {
        const paramsObject = yield fromStore.getFrontRouteParams(
            store.getState()
        )
        const query = {}
        if (typeof paramsObject.page === "number" && paramsObject.page > 1)
            query.page = paramsObject.page
        if (typeof paramsObject.rows === "number" && paramsObject.rows !== 10)
            query.rows = paramsObject.rows
        if (typeof paramsObject.q === "string" && paramsObject.q.trim().length)
            query.q = paramsObject.q
        const queryStrig = Object.keys(query)
            .map(key => {
                if (query.hasOwnProperty(key)) {
                    return `${key}=${query[key]}`
                }
                return ""
            })
            .join("&")
            .trim()
            // const history = createBrowserHistory()
        // if (typeof queryStrig === "string" && queryStrig.length) {
        //     history.replace({
        //         pathname: document.location.pathname,
        //         search: `?${queryStrig}`
        //     })
        // } else {
        //     history.replace({
        //         pathname: document.location.pathname,
        //         search: ''
        //     })
        // }

        const response = yield axios.get(`/post/${action.data}?${queryStrig}`)
        yield put(actions.frontSetAll(response.data))
    } catch (err) {
        console.log("saga", err.response,err)
    } finally {
        yield put(setLoading(false))
    }
}

export function* fetchFrontOneSaga(action) {
    yield put(setLoading(true))
    try {
        const response = yield axios.get("/post/byslug/" + action.data)
        yield put(actions.frontSetOne(response.data))
    } catch (err) {
        console.log("saga", err.response)
    } finally {
        yield put(setLoading(false))
    }
}

export function* deleteSaga(action) {
    yield put(setLoading(true))
    yield put(actions.setLoading(true))
    try {
        yield axios.delete("admin/post/" + action.data.postId)
        yield put(actions.fetchAll(action.data.page))
    } catch (err) {
        console.log("saga", err.response)
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data))
        yield put(setLoading(false))
        yield put(actions.setLoading(false))
    }
}
