import React, {useRef} from 'react';
import './Options.scss'
import {motion as m} from 'framer-motion';

const TimeOptions = ({setSort}) => {
    const timeOptions = [
        {name: "Sort by the Longest Duration", action: "-total_duration"},
        {name: "Sort by the shortest Duration", action: "total_duration"}
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
                {timeOptions.map(option => {
                        return (
                            <m.li whileTap={{scale: 0.97}}><input onClick={() => setSort(option.action)} type="radio" name="time"/>{option.name}</m.li>
                        )
                    }
                )}
            </ul>
        </m.div>
    );
};

export default TimeOptions;
