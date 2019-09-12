import React from 'react';
import PropTypes from 'prop-types';

const TextField = props => {
    const onChange = e => props.onChange(e.target.value);
    const onBlur = e => props.onChange(e.target.value.trim());

    return (        
        <input
            className={props.className}
            type="text"
            name={props.name}
            onChange={onChange}
            onBlur={props.trim !== false ? onBlur : ()=>{}}
            placeholder={props.placeholder}
            value={props.value}/>
    );
};

TextField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    trim: PropTypes.bool,
};

export default TextField;