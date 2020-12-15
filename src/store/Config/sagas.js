import { put } from "redux-saga/effects";

import { setLoading } from "store/Common/actions";
import { setConfig } from "store/Config/actions";
import axios from "axiosInstance";

export function* fetchConfigSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.get(`admin/config/${action.section}`);
        yield put(setConfig(response.data));
        // console.log(response.data, 'fetchConfigSaga');
    } catch (err) {
        console.log("sagaERR fetchConfigSaga", err.response);
    } finally {
        yield put(setLoading(false));
    }
}

export function* saveConfigSaga(action) {
    yield put(setLoading(true));
    try {
        yield axios.post('admin/config', { config: action.data });

    } catch (err) {
        console.log("sagaERR saveConfigSaga", err.response);
    } finally {
        yield put(setLoading(false));
    }
}
