import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import '../roundtrip/RoundTrip.scss'
import Suggestions from "../suggestion/Suggestions";

const RoundTrip = ({origin, destination}) => {

    const {setOrigin} = origin
    const {setDestination} = destination

    const [originQuery, setOriginQuery] = useState('');
    const [destinationQuery, setDestinationQuery] = useState('');


    return (
        <div className="round-trip">
            <div className="search-location">
                {/* Origin*/}
                <div className="search-input" id="origin-container">
                    <div>
                        <FontAwesomeIcon className="icon" icon={faPlaneDeparture}/>
                    </div>
                    <div>
                        <Suggestions
                            query={originQuery}
                            setQuery={setOriginQuery}
                            setLocation={setOrigin}
                            placeholder={"From"}
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
                        <Suggestions
                            query={destinationQuery}
                            setQuery={setDestinationQuery}
                            setLocation={setDestination}
                            placeholder={"To"}
                        />
                        <label>Where to?</label>
                    </div>
                </div>
                {/*Departure Date*/}
            </div>
            {/*    Range Date Picker*/}
        </div>
    );
};

export default RoundTrip;
