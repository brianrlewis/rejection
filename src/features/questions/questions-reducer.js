import autodux from 'autodux';
import cuid from 'cuid';
import { Scoring } from '../../../config/config';

/*const initialQuestions = [{
    id: cuid(),
    question: 'Can I have free money?',
    askee: 'Bob',
    status: 'Rejected'
}];*/

export const {
    reducer,
    slice,
    actions: {
        _addQuestion,
        removeQuestion,
        updateQuestion,
        setQuestions,
    },
    selectors: {
        getQuestions,
        getScore,
    }
} = autodux({
    slice: 'questions',
    initial: [],
    actions: {
        _addQuestion: (state, payload) => 
                            state.concat([payload]),
        removeQuestion: (state, payload) =>
                            state.filter(question => question.id !== payload),
        updateQuestion: (state, payload) => 
                            state.map(question => question.id === payload.id
                                ? { ...question, ...payload.fields }
                                : question),
        setQuestions: (state, payload) => payload,
    },
    selectors: {
        getScore: state => state.reduce((score, question) =>
            score + Scoring[question.status]
        , 0),
    }
});

export const addQuestion = (payload) => _addQuestion({
    id: cuid(),
    timestamp: Date.now(),
    ...payload,                                
});