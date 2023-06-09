import React from 'react';
import './Options.scss'
import {motion as m} from 'framer-motion';


const PriceOptions = ({setSort}) => {

    const priceOptions = [
        {name: "Sort by the highest Price", action: "-total_amount"},
        {name: "Sort by the lowest Price", action: "total_amount"}
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
                {priceOptions.map(option => {
                    return (
                        <m.li whileTap={{ scale: 0.97}}><input type="radio" onClick={() => setSort(option.action)} name="price"/>{option.name}</m.li>
                    );
                })}
            </ul>
        </m.div>
    );
};

export default PriceOptions;
