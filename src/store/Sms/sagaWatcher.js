import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchPost() {
  yield takeEvery(actionTypes.SMS_INITIATE_SEND, sagas.sendSaga);
}
