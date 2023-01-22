import React, {useState} from 'react';
import {DateRange} from "react-date-range";

const DateRangeComponent = () => {

    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    }])
    return (
        <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
        />
    );
};

export default DateRangeComponent;
