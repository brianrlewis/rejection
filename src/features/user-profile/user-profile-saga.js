import { call, takeEvery, all, put, select } from 'redux-saga/effects';
import { getUser, setUser } from './user-profile-reducer';
import { setQuestions, getQuestions } from '../questions/questions-reducer';

import {
    saveUserToFirebase,
    userNotInFirebase,
    saveQuestionsToFirebase,
    getQuestionsFromFirebase
} from '../firebase/firebase-client';

export function* handleSetUser() {
    const user = yield select(getUser);
    const firstTimeLoggingIn = yield call(userNotInFirebase, user.uid);
 
    yield call(saveUserToFirebase, user);    

    // If the user is logging into firebase for the first time then save the 
    // current questions from their anonymous session to their new profile
    if (firstTimeLoggingIn) {
        const questions = yield select(getQuestions);
        yield call(saveQuestionsToFirebase, user.uid, questions);
    // Otherwise load the user's questions from firebase
    } else {
        const questions = yield call(getQuestionsFromFirebase, user.uid);
        yield put(setQuestions(questions));
    }
}

export function* watchSetUser() {
    yield takeEvery(setUser().type, handleSetUser);
}
  
export default function* questions() {
    yield all([
        watchSetUser(),
    ]);
}