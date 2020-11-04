import { put } from "redux-saga/effects";

import axios from "store/Test/node_modules/axiosInstance";
import * as actions from "./actions";
import { setLoading } from "../Common/actions";

export function* storeSaga(action) {
    yield put(actions.formSetError({
        name: "",
    }));
    yield put(setLoading(true));
    yield put(actions.setLoading(true));
    try {
        yield axios.post('admin/category', action.data);
        yield put(actions.setFormClose(true))
        // yield put(actions.fetchAll());
    } catch (err) {
        console.log("saga", err.response);
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data));
        yield put(actions.setLoading(false));
        yield put(setLoading(false));
    }
}

export function* updateSaga(action) {
    yield put(actions.formSetError({
        name: "",
    }));
    yield put(setLoading(true));
    yield put(actions.setLoading(true));
    try {
        yield axios.put('admin/category/' + action.data.id, action.data);
        yield put(actions.setFormClose(true))
        // yield put(actions.fetchAll());
    } catch (err) {
        console.log("saga", err.response);
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data));
        yield put(actions.setLoading(false));
        yield put(setLoading(false));
    }
}

export function* fetchAllSaga(action) {
    yield put(setLoading(true));
    yield put(actions.setLoading(true));
    try {
        const response = yield axios.get('admin/category');
        // yield put(actions.setFormClose(true));
        yield put(actions.setAll(response.data));
    } catch (err) {
        console.log("saga", err.response);
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data));
    } finally {
        yield put(actions.setLoading(false));
        yield put(setLoading(false));
    }
}

export function* deleteSaga(action) {
    yield put(setLoading(true));
    yield put(actions.setLoading(true));
    try {
        yield axios.delete('admin/category/' + action.data);
        yield put(actions.fetchAll());
    } catch (err) {
        console.log("saga", err.response);
        if (err.response && err.response.status === 422)
            yield put(actions.formSetError(err.response.data));
        yield put(setLoading(false));
        yield put(actions.setLoading(false));
    }
}

export function* fetchFrontAllSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.get('category/header');
        yield put(actions.setFrontAll(response.data));
    } catch (err) {
        console.log("saga", err.response);
    } finally {
        yield put(setLoading(false));
    }
}

