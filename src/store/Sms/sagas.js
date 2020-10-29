import axios from "axiosInstance";
import { put } from "redux-saga/effects";

import * as actions from "./actions";
import { setLoading } from "../Common/actions";

export function* sendSaga(action) {
  yield put(setLoading(true));
  // try {
  //     yield axios.post('admin/post', action.data);
  //     yield put(actions.setFormClose(true))
  //     // yield put(actions.fetchAll());
  // } catch (err) {
  //     console.log("saga", err.response);
  //     if (err.response && err.response.status === 422)
  //         yield put(actions.formSetError(err.response.data));
  //     yield put(actions.setLoading(false));
  //     yield put(setLoading(false));
  // }
}
