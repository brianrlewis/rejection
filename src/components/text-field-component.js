import React from 'react';
import PropTypes from 'prop-types';
import withKeypressEnterListener from '../HOCs/with-keypress-enter-listener';
import { omit } from 'lodash';

const TextField = ({
    onChange,
    trim,
    ...other
}) => {
    const handleOnChange = e => onChange(e.target.value);
    const handleOnBlur = e => onChange(e.target.value.trim());

    return (        
        <input
            type="text"
            onChange={handleOnChange}
            onBlur={trim !== false ? handleOnBlur : ()=>{}}
            {...other}/>
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

export default withKeypressEnterListener(TextField);