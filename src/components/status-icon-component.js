import React from 'react';
import PropTypes from 'prop-types';
import { Statuses } from '../../config/config';
import {
    FaRegCheckCircle,
    FaRegTimesCircle,
    FaRegQuestionCircle,
} from 'react-icons/fa';

const icons = {
    [Statuses.ACCEPTED]: FaRegCheckCircle,
    [Statuses.REJECTED]: FaRegTimesCircle,
    [Statuses.UNANSWERED]: FaRegQuestionCircle,
};

const colors = {
    [Statuses.ACCEPTED]: '#22dd22',
    [Statuses.REJECTED]: '#dd2222',
    [Statuses.UNANSWERED]: '#000',
};

const StatusIcon = props => React.createElement(icons[props.status], {
    color: colors[props.status],
    title: props.status,
    size: props.size,
});

StatusIcon.propTypes = {
    status: PropTypes.string,
    size: PropTypes.string,
};

export default StatusIcon;