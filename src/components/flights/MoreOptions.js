import React from 'react';
import {motion as m} from 'framer-motion';

const MoreOptions = ({moreOptions}) => {
    return (
        <m.div>
            {moreOptions.map(option => {
                return (
                    <ul key={option.id}>
                        <li></li>
                    </ul>
                )
            })}
        </m.div>
    );
};

export default MoreOptions;
