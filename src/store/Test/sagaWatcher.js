import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchTest() {
  yield takeEvery(actionTypes.TEST_SEND_CODE, sagas.sendCodeSaga);
  yield takeEvery(actionTypes.TEST_VERIFY_CODE, sagas.VerifyCodeSaga);
  yield takeEvery(actionTypes.TEST_FETCH_QUESTION, sagas.fetchQuestionSaga);
  yield takeEvery(actionTypes.TEST_SAVE_ANSWER, sagas.saveAnswerSaga);
}
