import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRepeat} from "@fortawesome/free-solid-svg-icons";

const OneRoadTrip = props => {

    return (
        <div style={{display:"flex", gap:'1em'}}>
                <div className="search-location">
                    {/* Origin*/}
                    <div className="search-input" id="origin-container">
                        <input
                            type="text"
                            name="slices.origin"
                            placeholder="From"
                            maxLength={3}
                            autoComplete="off"
                            ref={props.origin}
                        />
                        <label>Where From?</label>
                    </div>

                    {/* Destination*/}
                    <FontAwesomeIcon className="switch-locations" icon={faRepeat}/>
                    <div className="search-input" id="destination-container">
                        <input
                            type="text"
                            name="slices.destination"
                            placeholder="To"
                            maxLength={3}
                            autoComplete="off"
                            ref={props.destination}
                        />
                        <label>Where to?</label>
                    </div>
                    {/*Departure Date*/}
                </div>
                <div className="search-input search-date" id="departure_date-container"
                    // onClick={() => setOpenDepartureDate(true)}
                >
                    {/*{openDepartureDate && <DateRangeComponent departureDate={departure_date}/>}*/}
                    <input
                        type="date"
                        name="slices.departure_date"
                        placeholder="Departure Date"
                        ref={props.departureDate}
                    />
                    <label>Departure Date</label>
                </div>
        </div>
    );
};

export default OneRoadTrip;
