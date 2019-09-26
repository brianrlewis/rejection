import { describe } from 'riteway';
import { cloneDeep, merge } from 'lodash';

import {
    slice,
    reducer,
    addQuestion,
    removeQuestion,
    updateQuestion,
    setQuestions,
    getScore,
} from './questions-reducer';

import {
    getTestQuestions,
    getTestQuestionsExpectedScore
} from '../../util/testing';

describe('Questions reducer', async assert => {
    assert({
        given: 'no arguments',
        should: 'produce valid initial state',
        actual: reducer(),
        expected: {
            loaded: false,
            questions: [],
        },
    });
});

describe('Questions reducer', async assert => {
    const question = getTestQuestions()[0];
    const action = addQuestion(question);

    assert({
        given: 'addQuestion action',
        should: 'add the question to state',
        actual: reducer(reducer(), action).questions,
        expected: [ action.payload ],
    });
});

describe('Questions reducer', async assert => {
    const questions = getTestQuestions();
    const action = removeQuestion(questions[0].id);
    const newQuestions = reducer({ questions }, action).questions;

    assert({
        given: 'removeQuestion action',
        should: 'return state with one less question',
        actual: newQuestions.length,
        expected: questions.length - 1,
    });
});

describe('Questions reducer', async assert => {
    const questions = getTestQuestions();
    const fieldsToChange = { question: 'Edited text' };
    
    // Create the action
    const updateQuestionAction = updateQuestion({
        id: questions[0].id,
        fields: fieldsToChange
    });

    // Create the expected state
    const expectedState = cloneDeep(questions);
    merge(expectedState[0], fieldsToChange);

    assert({
        given: 'updateQuestion action',
        should: 'return expected state',
        actual: reducer({ questions }, updateQuestionAction).questions,
        expected: expectedState,
    });
});

describe('Questions reducer', async assert => {
    const questions = getTestQuestions();
    const action = setQuestions(questions);

    assert({
        given: 'setQuestions action',
        should: 'return expected state',
        actual: reducer(reducer(), action),
        expected: {
            loaded: true,
            questions,
        },
    });
});

describe('getScore selector', async assert => {
    assert({
        given: 'no questions',
        should: 'return 0',
        actual: getScore({ [slice]: { 
            questions: []
        }}),
        expected: 0
    });

    const questions = getTestQuestions();
    const statuses = questions.map(x => x.status).join(', ');
    const score = getTestQuestionsExpectedScore();
 
    assert({
        given: `${questions.length} questions with statuses: ${statuses}`,
        should: `return ${score}`,
        actual: getScore({ [slice]: reducer({ questions }) }),
        expected: score
    });
});