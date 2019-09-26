import autodux from 'autodux';
import cuid from 'cuid';
import { Scoring } from '../../../config/config';

export const {
    reducer,
    slice,
    actions: {
        addQuestion,
        removeQuestion,
        updateQuestion,
        setQuestions,
    },
    selectors: {
        getQuestions,
        getScore,
        isLoaded,
    }
} = autodux({
    slice: 'questions',
    initial: {
        loaded: false,
        questions: [],
    },
    actions: {
        addQuestion: {
            create: payload => ({
                id: cuid(),
                timestamp: Date.now(),
                ...payload,                                
            }),
            reducer: (state, payload) => ({
                ...state,
                questions: state.questions.concat([payload]),
            })
        },
        removeQuestion: (state, payload) => ({
            ...state,
            questions: state.questions.filter(question => question.id !== payload),
        }),
        updateQuestion: (state, payload) => ({
            ...state,
            questions: state.questions.map(question => question.id === payload.id
                                    ? { ...question, ...payload.fields }
                                    : question),
        }),
        setQuestions: (state, payload) => ({
            ...state,
            loaded: true,
            questions: payload,
        }),
    },
    selectors: {
        getScore: state => state.questions.reduce((score, question) =>
            score + Scoring[question.status]
        , 0),
        isLoaded: state => state.loaded,
    }
});