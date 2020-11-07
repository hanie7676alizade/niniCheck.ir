import { put } from "redux-saga/effects";

import { setLoading } from "store/Common/actions";
import { setShowAlert, isSaveEmail, setMessage, setMessageType } from "./actions";
import axios from "axiosInstance";

export function* saveSaga(action) {
    // console.log('newsletter befor saveSaga');

    yield put(setLoading(true));
    try {
        const response = yield axios.post('/newsletter', { 'email': action.email });

        console.log(response, 'saveSaga');
        yield put(setMessage('پیامی به ایمیل شما ارسال شد.لطفا برای تایید، به ایمیل خود مراجعه فرمایید.'))
        yield put(setMessageType('Success'))
        yield put(setShowAlert(true));
        yield put(isSaveEmail(true));

    } catch (err) {
        console.log("saga", err.response.data.email);
        yield put(setMessageType('Warning'))
        yield put(setMessage(err.response.data.email));
        yield put(setShowAlert(true));
        yield put(isSaveEmail(false));

    } finally {
        yield put(setLoading(false));
    }
}



