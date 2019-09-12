import { combineReducers } from 'redux';
import * as userAuth from '../src/features/user-auth/user-auth-reducer';
import * as userAuthComplete from '../src/features/user-auth/complete-reducer';
import * as questions from '../src/features/questions/questions-reducer';
import * as userProfile from '../src/features/user-profile/user-profile-reducer';

export default combineReducers({
    [userAuth.slice]: userAuth.reducer,
    [userAuthComplete.slice]: userAuthComplete.reducer,
    [questions.slice]: questions.reducer,
    [userProfile.slice]: userProfile.reducer
});
