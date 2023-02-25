import React from 'react';
import '../styles/InputComponent.scss'

const InputComponent = ({name, onChange, ref, value, handleBlur, placeholder, type, required, max, min}) => {
    const classes = 'input '

    return (
        <input
            className={classes}
            type={type}
            name={name}
            value={value}
            ref={ref}
            placeholder={placeholder}
            autoComplete="off"
            onChange={onChange}
            onBlur={handleBlur}
            required={required}
            maxLength={max}
            minLength={min}
        />
    );
};

export default InputComponent;
