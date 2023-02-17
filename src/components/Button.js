import React from 'react';
import './../styles/Button.scss'

const Button = (props) => {
    const classes = 'button '

    return (
        <div className={classes + props.className}>
            {props.children}
        </div>
    );
};

export default Button;
