import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import '../roundtrip/RoundTrip.scss'
import {DateRangePicker} from "@mui/x-date-pickers-pro";

const RoundTrip = props => {

    const [value, setValue] = React.useState([
        new Date().getUTCFullYear(),
        ('2022-04-21'),
    ]);


    console.log(new Date().getUTCFullYear())
    return (
        <div className="round-trip">
            <div className="search-location">
                {/* Origin*/}
                <div className="search-input" id="origin-container">
                    <div>
                        <FontAwesomeIcon className="icon" icon={faPlaneDeparture}/>
                    </div>
                    <div>
                        {/*<Suggestions*/}
                        {/*    query={originQuery}*/}
                        {/*    setQuery={setOriginQuery}*/}
                        {/*    ref={props.origin}*/}
                        {/*/>*/}
                        <input
                            type="text"
                            name={`slices.origin`}
                            placeholder="From"
                            maxLength={3}
                            autoComplete="off"
                            ref={props.origin}
                        />
                        <label>Where From?</label>
                    </div>
                </div>

                {/* Destination*/}
                <div className="search-input" id="destination-container">
                    <div>
                        <FontAwesomeIcon className="icon" icon={faPlaneArrival}/>
                    </div>
                    <div>
                        <input
                            type="text"
                            name={`slices.destination`}
                            placeholder="To"
                            maxLength={3}
                            autoComplete="off"
                            ref={props.destination}
                        />
                        <label>Where to?</label>
                    </div>

                    {/*Suggestion*/}

                    {/*<Suggestions*/}
                    {/*    query={destinationQuery}*/}
                    {/*    setQuery={setDestinationQuery}*/}
                    {/*    ref={props.destination}*/}
                    {/*/>*/}
                </div>
                {/*Departure Date*/}
            </div>
            <div className="search-input search-date">
                <label>Departure Date</label>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }}  onChange={(newValue) => setValue(newValue)} value={value} renderInput={"input"}/>
                {/*<DatePicker*/}
                {/*    onChange={onChange}*/}
                {/*    inputRef={props.departureDate}/>*/}
                {/*<DatePicker*/}
                {/*    onChange={onChange}*/}
                {/*    inputRef={props.departureDate}/>*/}
            </div>
        </div>
    );
};

export default RoundTrip;
