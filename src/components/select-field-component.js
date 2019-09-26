import React from 'react';
import PropTypes from 'prop-types';
import withKeypressEnterListener from '../HOCs/with-keypress-enter-listener';

const SelectField = ({
    onChange,
    options,
    value,
    ...other,
}) => {
    const handleOnChange = e => {
        onChange(e.target.value);
    };

    return (
        <select
            onChange={handleOnChange}
            defaultValue={value}
            {...other}>

            {options.map(status => {
                return <option key={status}>{status}</option>;
            })}
            
        </select>
    );
};

SelectField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
};

export default withKeypressEnterListener(SelectField);