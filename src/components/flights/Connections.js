import React from 'react';
import {motion as m} from 'framer-motion';
import './Options.scss'

const Connections = ({maxConnections, setMaxConnections}) => {

    const connectionsOptions = [
        {name: "Direct Flight", action: maxConnections},
        {name: `Flight with 1 stop`, action: maxConnections},
        {name: `Flight with 2 stops`, action: maxConnections}
    ]

    return (
        <m.div className="filter-option"
               initial={{
                   translateY: -10
               }}
               animate={{
                   translateY: 5,
                   transition: {
                       type: "spring",
                       stiffness: 270,
                       damping: 10,
                   }
               }}
               exit={{
                   translateY: -20,
                   opacity: 0
               }}>
            <ul>
                {connectionsOptions.map((option, index) => {
                    return (
                        <m.li whileTap={{ scale: 0.97 }}><input onClick={() => setMaxConnections(index)} name="connections" type="radio"/>
                            {option.name}</m.li>
                    )
                })
                }
            </ul>
        </m.div>
    );
};

export default Connections;
