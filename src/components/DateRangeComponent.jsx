import React, {useState} from 'react';
import {DateRange} from "react-date-range";

const DateRangeComponent = (props) => {

    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }])

    console.log(props.departureDate.current);

    return (
        <DateRange
            ref={props.departureDate}
            // ref={props.departureDate.current.props.ranges}
            minDate={new Date()}
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            color={'#7AC1D3'}
            rangeColors={'#5BAEBC'}

        />
    );
};

export default DateRangeComponent;
