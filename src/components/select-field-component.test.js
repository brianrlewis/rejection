import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import SelectField from './select-field-component';

describe('select-field-component', async assert => {
    const options = [
        'Run',
        'Jog',
        'Walk',
    ];
    const value = options[0];
    const $ = render(<SelectField
                        value={value}
                        options={options}/>);

    assert({
        given: 'value prop',
        should: 'render with correct option selected',
        actual: $('select option:selected').val().trim(),
        expected: value,
    });

    assert({
        given: 'an options prop',
        should: 'render the correct number of options',
        actual: $('select option').length,
        expected: options.length,
    });
});