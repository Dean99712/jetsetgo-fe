import React, {useRef} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRepeat} from "@fortawesome/free-solid-svg-icons";

const SearchComponent = props => {

    const origin = useRef()
    const destination = useRef()
    const departure_date = useRef()

    let slices = [{
        origin: origin.current?.value,
        destination: destination.current?.value,
        departure_date: departure_date.current?.value,
    }]

    return (
        <div>
            {/*Location Container*/}
            <div className="form-input input_location-container">
                {/* Origin*/}
                <input
                    className="form-search-input input_origin"
                    type="text"
                    name="slices.origin"
                    placeholder="From"
                    maxLength={3}
                    autoComplete="off"
                    ref={origin}
                />
                <label className="form-label-location label-location-origin">Where from?</label>

                {/* Destination*/}
                <FontAwesomeIcon className="switch-locations-icon" icon={faRepeat}/>
                <input
                    className="form-search-input input_destination"
                    type="text"
                    name="slices.destination"
                    placeholder="To"
                    maxLength={3}
                    autoComplete="off"
                    ref={destination}
                /><label className="form-label-location label-location-destination">Where to?</label>

                {/* Departure Date*/}
                <input
                    className="form-search date_departure_date"
                    type="date"
                    name="slices.departure_date"
                    placeholder="Departure Date"
                    ref={departure_date}
                />
                <label className="form-label-departure_date label-departure_date">Departure Date</label>
            </div>
            {/* Submit Form*/}
            <button type={"submit"} className="form-btn submit-form-button"
                    onSubmit={(e) => props.handelSubmit(e, slices)}
            >Find me a flight
            </button>
        </div>
    );
};

export default SearchComponent;
