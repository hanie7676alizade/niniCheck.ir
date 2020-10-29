import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchSocialNetwork() {
  yield takeEvery(actionTypes.SOCIAL_NETWORK_INITIATE_FETCH_ALL, sagas.fetchAllSaga);
  yield takeEvery(actionTypes.SOCIAL_NETWORK_INITIATE_SAVE, sagas.saveSaga);
}
