import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchConfig() {
  yield takeEvery(actionTypes.CONFIG_INITIATE_FETCH, sagas.fetchConfigSaga);
  yield takeEvery(actionTypes.CONFIG_SAVE, sagas.saveConfigSaga);
}
