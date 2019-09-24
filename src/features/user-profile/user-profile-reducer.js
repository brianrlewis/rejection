import autodux from 'autodux';

const setUserFromFirebase = ({
    uid = '',
    displayName = '',
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

export const {
    reducer,
    slice,
    actions: {
        setUser,
    },
    selectors: {
        getUser,
        isSignedIn
    }
} = autodux({
    slice: 'user',
    initial: setUserFromFirebase(),
    actions: {
        setUser: (type, payload) => setUserFromFirebase(payload)
    },
    selectors: {
        isSignedIn: state => !state.isAnonymous,
    }
});