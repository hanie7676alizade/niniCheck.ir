import { put } from "redux-saga/effects";

import { setLoading } from "store/Common/actions";
import { setStep, setMessage, setShowAlert, setMessageType, isVerified, setQuestion } from "store/Test/actions";
import axios from "axiosInstance";

export function* sendCodeSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.post(`test/send-code`, { "mobile": action.mobileNumber });
        console.log(response, 'sendCodeSaga');
        yield put(setMessage('کد اعتبارسنجی پیامک شد'))
        yield put(setMessageType('Success'))
        yield put(setShowAlert(true));
        yield put(setStep(0))
    } catch (err) {
        console.log(err.response, 'err sendCodeSaga');
        yield put(setMessage(err.response.data.mobile));
        yield put(setMessageType('Warning'))
        yield put(setShowAlert(true));
    } finally {
        yield put(setLoading(false));
    }
}

export function* VerifyCodeSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.post(`test/verify-code`, { "mobile": action.mobileNumber, 'code': action.code });
        console.log(response, 'VerifyCodeSaga');
        if (response.status === 200) {
            yield put(isVerified(true))
            yield put(setStep(1))
        }
    } catch (err) {
        console.log(err.response, 'err VerifyCodeSaga');
        yield put(setMessage(err.response.data.code));
        yield put(setMessageType('Warning'))
        yield put(setShowAlert(true));
    } finally {
        yield put(setLoading(false));
    }
}

export function* fetchQuestionSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.post(`test/questions`, { "mobile": action.mobileNumber });
        yield put(setQuestion(response.data))
        console.log(response.data, 'fetchQuestionSaga');
    } catch (err) {
        yield put(setStep(-1))
        yield put(setMessageType('Warning'))
        yield put(setShowAlert(true));
        yield put(setMessage('لطفا دوباره تلاش کنید'));
        console.log("sagaERR fetchQuestionSaga", err.response);
    } finally {
        yield put(setLoading(false));
    }
}

export function* saveAnswerSaga(action) {
    yield put(setLoading(true));
    try {
        const response = yield axios.post(`test/answer`, { "mobile": action.mobileNumber, "question_id": action.question_id, "answer_id": action.answer_id });
        console.log(response.data, 'saveAnswerSaga');
    } catch (err) {
        console.log("sagaERR saveAnswerSaga", err.response);
        yield put(setMessageType('Warning'))
        yield put(setShowAlert(true));
        yield put(setMessage(err.response.data.answer_id));
    } finally {
        yield put(setLoading(false));
    }
}

