import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchNewsLetter() {
  yield takeEvery(actionTypes.NEWS_LETTER_INITIATE_SAVE, sagas.saveSaga);
}
