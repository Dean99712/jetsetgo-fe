import React from 'react';
import '../styles/Card.scss'

const Card = (props) => {
    const classes = 'card-container ' + props.className

    return (
        <div className={classes}>
            {props.children}
        </div>
    );
};

export default Card;
