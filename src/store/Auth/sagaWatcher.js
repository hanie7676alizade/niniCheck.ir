import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_SIGNUP, sagas.signupSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_SIGNIN, sagas.signinSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_INITIAL_CHECK, sagas.initialAuthCheckSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, sagas.logoutSaga);
}
