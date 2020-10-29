import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchCategory() {
  yield takeEvery(actionTypes.CATEGORY_INITIATE_STORE, sagas.storeSaga);
  yield takeEvery(actionTypes.CATEGORY_FETCH_ALL, sagas.fetchAllSaga);
  yield takeEvery(actionTypes.CATEGORY_INITIATE_DELETE, sagas.deleteSaga);
  yield takeEvery(actionTypes.CATEGORY_INITIATE_UPDATE, sagas.updateSaga);
  yield takeEvery(actionTypes.CATEGORY_INITIATE_FETCH_FRONT_ALL, sagas.fetchFrontAllSaga);
}
