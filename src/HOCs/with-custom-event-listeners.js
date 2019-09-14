import { omit } from 'lodash';

export default listeners => Component => props => {
    const newProps = {};

    const apply = ({
        customEvent, // The name of the custom event handler
        domEvent, // The name of the standard DOM event handler that the custom
                  // handler is going to hook into
        handle // The function called when the DOM event is triggered and
               // determines whether or not to call the custom event handler
    }) => {
        const customHandler = props[customEvent];
        const domHandler = props[domEvent];

        // Check if the implementing component has passed a handler for
        // the custom event
        if (typeof customHandler === 'function') {
            // Combine the custom event handler with the DOM handler that
            // it relies on so that the custom event handler can be called
            // while preserving a handler that might have also been passed 
            // for the DOM event that the custom event hooks into
            newProps[domEvent] = e => {
                handle(e, customHandler);
                if (typeof domHandler === 'function') {
                    domHandler(e);
                }
            };
        }
    };

    listeners.forEach(apply);

    // Remove 'customEvent' props now that they have been combined  
    // into the 'domEvent' handler
    const strippedProps = omit(props, listeners.map(x => x.customEvent));

    return Component({
        ...strippedProps,
        ...newProps
    });
};