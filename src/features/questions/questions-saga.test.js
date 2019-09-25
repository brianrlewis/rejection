import { describe } from 'riteway';
import { takeLatest } from 'redux-saga/effects';
import { watchQuestions, syncQuestionsWithDatabase } from './questions-saga';

import {
    addQuestion,
    removeQuestion, 
    updateQuestion,
} from './questions-reducer';

describe('questions-saga/watchQuestions()', async assert => {
    const iterator = watchQuestions();

    assert({
        given: 'addQuestion, removeQuestion or updateQuestion action',
        should: 'sync questions with database',
        actual: iterator.next().value,
        expected: takeLatest([
            addQuestion().type,
            removeQuestion().type,
            updateQuestion().type,
        ], syncQuestionsWithDatabase),
    });
});
