import autodux from 'autodux';

const defaultUser = {
    uid: '',
    displayName: 'Anonymous',
    email: '',
    photoURL: '',
    isAnonymous: true,
};

export const {
    reducer,
    slice,
    actions: {
        setUser,
    },
    selectors: {
        getUser,
        isSignedIn,
    }
} = autodux({
    slice: 'user',
    initial: defaultUser,
    actions: {
        setUser: {
            create: ({
                uid = '',
                displayName = defaultUser.displayName,
                email = defaultUser.email,
                photoURL = defaultUser.photoURL,
                isAnonymous = defaultUser.isAnonymous,
            } = {}) => ({
                uid,
                displayName,
                email,
                photoURL,
                isAnonymous,
            }),
        }
    },
    selectors: {
        isSignedIn: state => !state.isAnonymous
    }
});