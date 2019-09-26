import cuid from 'cuid';
import { Statuses } from '../../config/config';

export const createTestQuestion = ({
    id = cuid(),
    createdAt = new Date().getTime(),
    question = '',
    askee = '',
    status = Statuses.UNANSWERED
}) => ({
    id,
    createdAt,
    question,
    askee,
    status
});

export const getTestQuestions = () => [{
        question: 'Can I have breakfast?',
        askee: 'Mom',
        status: Statuses.UNANSWERED,
    },{
        question: 'Can I have lunch?',
        askee: 'Dad',
        status: Statuses.ACCEPTED,
    },{
        question: 'Can I have dinner?',
        askee: 'Uncle',
        status: Statuses.REJECTED,
    }]
    .map(createTestQuestion);

export const getTestQuestion = () => getTestQuestions()[0];

export const getTestQuestionsExpectedScore = () => 11;