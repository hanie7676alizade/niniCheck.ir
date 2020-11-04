import axios from "store/Test/node_modules/axiosInstance";
import { put } from "redux-saga/effects";

import * as actions from "./actions";
import { setLoading } from "../Common/actions";
export function* getDataSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.get('public-layout/header');
        yield put(actions.setLayoutData(response.data));
        // yield put(actions.fetchAll());
    } catch (err) {
        console.log("saga", err.response);
    } finally {
        yield put(setLoading(false));
    }
}


