export const appTitle = 'Rejection App';

export const Statuses = {
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
    UNANSWERED: 'Unanswered'
};

export const Scoring = {
    [Statuses.ACCEPTED]: 1,
    [Statuses.REJECTED]: 10,
    [Statuses.UNANSWERED]: 0,
};