import { call, takeEvery, all, select } from 'redux-saga/effects';
import { getUser, setUser } from './user-profile-reducer';
import { saveUserToFirebase } from '../firebase/firebase-client';

export function* handleSetUser() {
    const user = yield select(getUser);
    yield call(saveUserToFirebase, user);    
}

export function* watchSetUser() {
    yield takeEvery(setUser().type, handleSetUser);
}
  
export default function* questions() {
    yield all([
        watchSetUser(),
    ]);
}