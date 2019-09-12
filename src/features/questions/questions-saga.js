import { call, takeLatest, all, select } from 'redux-saga/effects';
import { saveQuestionsToFirebase } from '../firebase/firebase-client';
import { getUser } from '../user-profile/user-profile-reducer';

import {
    addQuestion,
    getQuestions,
    removeQuestion, 
    updateQuestion,
} from './questions-reducer';

export function* syncQuestionsWithDatabase() {
    const questions = yield select(getQuestions);
    const user = yield select(getUser);
    yield call(saveQuestionsToFirebase, user.uid, questions);
}

export function* watchQuestions() {
    yield takeLatest([
        addQuestion().type,
        removeQuestion().type,
        updateQuestion().type,
    ], syncQuestionsWithDatabase);
}
  
export default function* questions() {
    yield all([
        watchQuestions()
    ]);
}