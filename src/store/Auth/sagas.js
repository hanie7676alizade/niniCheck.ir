import { put } from "redux-saga/effects";
import moment from "moment";

import axios from "store/Test/node_modules/axiosInstance";
import * as actions from "./actions";

export function* signupSaga(action) {
    yield put(actions.signupSetError({
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    }));
    yield put(actions.loadingStart());
    try {
        const response = yield axios.post('signup', action.userData);
        yield localStorage.setItem('user', JSON.stringify(response.data.user))
        const user = response.data.user
        const token = response.data.token;
        token.exp = moment(token.exp).unix();
        yield localStorage.setItem('token', JSON.stringify(token));
        yield put(actions.authSet({
            user,
            token
        }));
    } catch (err) {
        console.log("saga", err.response);
        if (err.response && err.response.status === 422)
            yield put(actions.signupSetError(err.response.data));
    } finally {
        yield put(actions.loadingEnd());
    }
}

export function* initialAuthCheckSaga() {
    const userStorage = yield localStorage.getItem('user') ? localStorage.getItem('user') : false;
    const tokenStorage = yield localStorage.getItem('token') ? localStorage.getItem('token') : false;
    const user = yield userStorage !== "undefined" ? JSON.parse(userStorage) : false;
    const token = yield tokenStorage !== "undefined" ? JSON.parse(tokenStorage) : false;

    const now = moment(new Date()).unix();

    if (!user || !token || now >= token.exp) {
        if (user) yield localStorage.removeItem('user');
        if (token) yield localStorage.removeItem('token');
        return yield put(actions.authSet({}));
    }

    yield put(actions.authSet({
        user,
        token
    }));
}

export function* logoutSaga() {
    yield localStorage.removeItem('user');
    yield localStorage.removeItem('token');
    yield put(actions.authSet({}));
}

export function* signinSaga(action) {
    yield put(actions.signinSetError({
        username: "",
        password: "",
    }));
    yield put(actions.loadingStart());
    try {
        const response = yield axios.post('admin/signin', action.userData);
        yield localStorage.setItem('user', JSON.stringify(response.data.user))
        const user = response.data.user
        const token = response.data.token;
        token.exp = moment(token.exp).unix();
        yield localStorage.setItem('token', JSON.stringify(token));
        yield put(actions.authSet({
            user,
            token
        }));
    } catch (err) {
        console.log("saga", err.response);
        yield put(actions.authSet({}));
        if (err.response && err.response.status === 422)
            yield put(actions.signinSetError(err.response.data));
    } finally {
        yield put(actions.loadingEnd());
    }
}
