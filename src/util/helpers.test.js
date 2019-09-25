import { describe } from 'riteway';
import { withProps, getFirstName } from './helpers';

describe('withProps function', async assert => {
    const props1 = { aaa: 'aaa' };
    const props2 = { bbb: 'bbb' };
    const mergedProps = withProps(props1)(x => x)(props2);

    assert({
        given: '2 sets of props and a function',
        should: 'merge the props and pass them to the function',
        actual: mergedProps,
        expected: {
            ...props1,
            ...props2,
        },
    });
});

describe('getFirstName function', async assert => {
    const name = 'John Smith';

    assert({
        given: 'a string of words',
        should: 'return the first word',
        actual: getFirstName(name),
        expected: 'John',
    });
});