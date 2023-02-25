import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import '../roundtrip/RoundTrip.scss'
import {DatePicker} from "@mui/lab";

const RoundTrip = ({departureDate, origin, destination}) => {

    function onChange(timestamp) {}

    return (
        <div className="round-trip">
            <div className="search-location">
                {/* Origin*/}
                <div className="search-input" id="origin-container">
                    <div>
                        <FontAwesomeIcon className="icon" icon={faPlaneDeparture}/>
                    </div>
                    <div>
                        <input
                            type="text"
                            name={`slices.origin`}
                            placeholder="From"
                            maxLength={3}
                            autoComplete="off"
                            ref={origin}
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
                            ref={destination}
                        />
                        <label>Where to?</label>
                    </div>
                </div>
                {/*Departure Date*/}
            </div>
            <div className="search-input search-date">
                <label>Departure Date</label>

                <DatePicker
                    onChange={onChange}
                    inputRef={departureDate}/>

                <DatePicker
                    onChange={onChange}
                    inputRef={departureDate}/>
            </div>
        </div>
    );
};

export default RoundTrip;
