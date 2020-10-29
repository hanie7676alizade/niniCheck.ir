import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchPublicLayout() {
  yield takeEvery(actionTypes.PUBLIC_LAYOUT_GET_LAYOUT_DATA, sagas.getDataSaga);
}
