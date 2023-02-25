import React from 'react';
import '../styles/InputComponent.scss'

const InputComponent = ({name, onChange, value, handleBlur, placeholder, type, required}) => {
    const classes = 'input '

    return (
        <input
            className={classes}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete="off"
            onChange={onChange}
            onBlur={handleBlur}
            required={required}
        />
    );
};

export default InputComponent;
