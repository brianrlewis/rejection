import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';
import Question from './question-component';
import { getTestQuestion } from '../../util/testing';

describe('question-component', async assert => {
    const question = getTestQuestion();

    const $ = render(<Question
                        question={question}
                        onUpdate={() => {}}
                        onRemove={() => {}}/>);

    assert({
        given: 'question prop',
        should: 'render question.question',
        actual: $('[data-test=question]').html().trim(),
        expected: question.question,
    });

    assert({
        given: 'question prop',
        should: 'render question.askee',
        actual: $('[data-test=askee]').html().trim(),
        expected: question.askee,
    });

    assert({
        given: 'question prop',
        should: 'render question.status',
        actual: $('[data-test=status]').html().trim(),
        expected: question.status,
    });
});