import autodux from 'autodux';

const defaultUser = {
    uid: '',
    displayName: 'Anonymous',
    email: '',
    photoURL: '',
    isAnonymous: true,
};

/*const createUserProfile = ({
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
});*/

export const {
    reducer,
    slice,
    actions: {
        setUser,
    },
    selectors: {
        getUser,
        isLoaded,
        isSignedIn
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
        isSignedIn: state => !state.isAnonymous,
        isLoaded: state => state.uid !== '',
    }
});