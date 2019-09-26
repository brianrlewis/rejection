import { describe } from 'riteway';
import {
    slice,
    reducer,
    setUser,
    getUser,
    isSignedIn,
} from './user-profile-reducer';

const createTestUser = ({
    uid = '',
    displayName = 'Anonymous',
    email = '',
    photoURL = '',
    isAnonymous = true,
} = {}) => ({
    uid,
    displayName,
    email,
    photoURL,
    isAnonymous,
});

describe('UserProfile reducer', async assert => {
    assert({
        given: 'no arguments',
        should: 'produce valid initial state',
        actual: reducer(),
        expected: createTestUser(),
    });
});

describe('UserProfile reducer', async assert => {
    const user = createTestUser({ uid: '12345' });

    assert({
        given: 'default state and setUser action',
        should: 'produce expected state',
        actual: reducer(reducer(), setUser(user)),
        expected: user,
    });
});

describe('getUser selector', async assert => {
    const state = reducer();

    assert({
        given: 'default state',
        should: 'return default state',
        actual: getUser({ [slice]: state }),
        expected: state,
    });
});

describe('isSignedIn selector', async assert => {
    {
        const state = reducer();

        assert({
            given: 'default state',
            should: 'return false',
            actual: isSignedIn({ [slice]: state }),
            expected: false,
        });
    }{
        const user = createTestUser({ isAnonymous: false }); 
        const state = reducer(reducer(), setUser(user));

        assert({
            given: 'default state and setUser action with isAnonymous = false',
            should: 'return true',
            actual: isSignedIn({ [slice]: state }),
            expected: true,
        });
    }
});