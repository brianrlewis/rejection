import { take, call, fork, put, takeEvery, all, select, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { firebase } from '@firebase/app';
import { authComplete } from './complete-reducer';
import { setQuestions,  getQuestions } from '../questions/questions-reducer';
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
    getQuestionsFromFirebase,
    saveQuestionsToFirebase,
    userExistsInFirebase,
} from '../firebase/firebase-client';

export function* watchInit() {
    yield takeEvery(initialize().type, watchStatusChange);
}

export const createAuthChannel = () => eventChannel(emitter =>
    firebase.auth().onAuthStateChanged(user => emitter({ user })));

export function* watchStatusChange() {
    const chan = yield call(createAuthChannel);
    while (true) {
        const { user } = yield take(chan);
        //if (process.browser) {
            yield call(handleStatusChange, user);
        //}        
    }
}

export function* handleStatusChange(user) {
    if (user == null) {
        yield call(signInAnonymously);
    } else {
        yield put(reportSignInSuccess(user));
    }
}

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

export function* watchSignInSuccess() {
    yield takeEvery(reportSignInSuccess().type, handleSignInSuccess);
}

export function* handleSignInSuccess({ payload }) {
    const firstTimeLoggingIn = !(yield call(userExistsInFirebase, payload.uid));

    yield put(setUser(payload));
    yield put(authComplete());

    if (firstTimeLoggingIn) {
        // Give firebase time to save the user doc that we want to update
        yield delay(1000); 
        // Save current questions to new user's firebase doc so that
        // their data is not lost
        const questions = yield select(getQuestions);
        yield call(saveQuestionsToFirebase, payload.uid, questions);
    } else {
        const questions = yield call(getQuestionsFromFirebase, payload.uid);
        yield put(setQuestions(questions));
    }
}
  
export function* watchSignOut() {
    yield takeEvery(signOut().type, handleSignOut);
}

export function* handleSignOut() {
    yield call(signOutWithFirebase);
    yield put(setQuestions([]));
}

export default function* userAth() {
    yield all([
        fork(watchSignIn),
        fork(watchSignOut),
        fork(watchInit),
        fork(watchSignInSuccess),
    ]);
}
  