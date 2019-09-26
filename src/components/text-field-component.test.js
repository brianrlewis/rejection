import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import TextField from './text-field-component';

describe('text-field-component', async assert => {
    const value = 'foo';
    const placeholder = 'bar';
    const $ = render(<TextField
                        value={value}
                        placeholder={placeholder}/>);

    assert({
        given: 'value prop',
        should: 'render value attribute',
        actual: $('input').val().trim(),
        expected: value,
    });

    assert({
        given: 'placeholder prop',
        should: 'render placeholder attribute',
        actual: $('input').attr('placeholder').trim(),
        expected: placeholder,
    });
});