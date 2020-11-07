import { put } from "redux-saga/effects";

import { setLoading } from "store/Common/actions";
import { setItems, setShowAlert, setMessage, setIsSaved } from "store/SocialNetwork/actions";
import axios from "axiosInstance";

export function* fetchAllSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.get('admin/layout/social-network');
        yield put(setItems(response.data));
    } catch (err) {
        console.log("saga", err.response);
    } finally {
        yield put(setLoading(false));
    }
}

export function* saveSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.put('admin/layout/social-network/' + action.data.id, { link: action.data.link });

        yield put(setIsSaved(true));
        yield put(setItems(response.data));
        yield put(setShowAlert(true));

    } catch (err) {
        console.log("saga", err.response);
        yield put(setMessage('خطایی رخ داد'));
        yield put(setShowAlert(true));
    } finally {
        yield put(setLoading(false));
    }
}



