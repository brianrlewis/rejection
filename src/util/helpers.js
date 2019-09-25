export const withProps = outerProps => Component => props =>
    Component({
        ...outerProps,
        ...props,
});

export const getFirstName = name => name != null
        ? name.split(' ')[0]
        : '';