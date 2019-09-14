
import withCustomEventListeners from './with-custom-event-listeners';

export default Component => withCustomEventListeners([{
    customEvent: 'onEnterPressed',
    domEvent: 'onKeyPress',
    handle: (e, customHandler) => e.key === 'Enter'
        ? customHandler()
        : null
}])(Component);