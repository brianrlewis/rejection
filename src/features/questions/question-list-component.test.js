import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';
import QuestionList from './question-list-component-view';
import { getTestQuestions } from '../../util/testing';

describe('question-list-component', async assert => {
    const questions = getTestQuestions();

    const $ = render(<QuestionList questions={questions}/>);

    assert({
        given: 'questions prop',
        should: 'render the correct number of questions',
        actual: $('[data-test=question-wrapper]').length,
        expected: questions.length
    });

});