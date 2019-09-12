import React from 'react';
import PropTypes from 'prop-types';

const SelectField = props => {
    const onChange = e => {
        props.onChange(e.target.value);
    };

    return (
        <select
            name={props.name}
            onChange={onChange}
            defaultValue={props.value}>

            {props.options.map(status => {
                return <option key={status}>{status}</option>;
            })}
            
        </select>
    );
};

SelectField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func
};

export default SelectField;