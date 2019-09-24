import { take, call, fork, put, takeEvery, all } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { firebase } from '@firebase/app';
import { authComplete } from './complete-reducer';
import { setQuestions } from '../questions/questions-reducer';
import { setUser } from '../user-profile/user-profile-reducer';
import { initialize } from './user-auth-reducer';

import {
    signIn,
    reportSignInSuccess,
    reportSignInFailure,
    signOut,
} from './user-auth-reducer';

import {
    signInWithGitHub,
    signInAnonymously,
    signOutWithFirebase,
} from '../firebase/firebase-client';

/*************** Status Change **************/

export function* watchInit() {
    yield takeEvery(initialize().type, watchStatusChange);
}

export const createAuthChannel = () => eventChannel(emitter =>
    firebase.auth().onAuthStateChanged(user => emitter({ user })));

export function* watchStatusChange() {
    const chan = yield call(createAuthChannel);
    while (true) {
        const { user } = yield take(chan);
        yield call(handleStatusChange, user);   
    }
}

export function* handleStatusChange(user) {
    if (user == null) {
        yield call(signInAnonymously);
    } else {
        yield put(reportSignInSuccess(user));
    }
}

/*************** Sign In **************/

export function* watchSignIn() {
    yield takeEvery(signIn().type, handleSignIn);
}

export function* handleSignIn() {
    try {
        yield call(signInWithGitHub);
    } catch (error) {
        console.log(error);
        yield put(reportSignInFailure(error));
    }
}

/*************** Sign In Success **************/

export function* watchSignInSuccess() {
    yield takeEvery(reportSignInSuccess().type, handleSignInSuccess);
}

export function* handleSignInSuccess({ payload }) {
    yield put(setUser(payload));
    yield put(authComplete());
}

/*************** Sign Out **************/

export function* watchSignOut() {
    yield takeEvery(signOut().type, handleSignOut);
}

export function* handleSignOut() {
    yield call(signOutWithFirebase);
    yield put(setQuestions([]));
}

/*************** Root Saga **************/

export default function* userAth() {
    yield all([
        fork(watchSignIn),
        fork(watchSignOut),
        fork(watchInit),
        fork(watchSignInSuccess),
    ]);
}
  