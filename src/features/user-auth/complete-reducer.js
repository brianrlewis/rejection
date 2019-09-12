import autodux, { id } from 'autodux';

export const {
    slice,
    reducer,
    actions: { authComplete },
    selectors: { isAuthComplete },
} = autodux({
    slice: 'userAuthComplete',
    initial: false,
    actions: {
        authComplete: state => true,
    },
    selectors: {
        isAuthComplete: id
    },
});
