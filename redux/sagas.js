
import { all } from 'redux-saga/effects';
import questions from '../src/features/questions/questions-saga';
import userAuth from '../src/features/user-auth/user-auth-saga';
import userProfile from '../src/features/user-profile/user-profile-saga';

export default function* rootSaga() {
    yield all([
        questions(),
        userAuth(),
        userProfile(),
    ]);
};