export const withProps = outerProps => Component => props =>
    Component({
        ...outerProps,
        ...props,
});