import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchPost() {
  yield takeEvery(actionTypes.POST_INITIATE_STORE, sagas.storeSaga);
  yield takeEvery(actionTypes.POST_FETCH_ALL, sagas.fetchAllSaga);
  yield takeEvery(actionTypes.POST_INITIATE_DELETE, sagas.deleteSaga);
  yield takeEvery(actionTypes.POST_INITIATE_UPDATE, sagas.updateSaga);
  yield takeEvery(actionTypes.POST_INITIATE_FRONT_FETCH_ALL, sagas.fetchFrontAllSaga);
  yield takeEvery(actionTypes.POST_INITIATE_FRONT_FETCH_ONE, sagas.fetchFrontOneSaga);
}
