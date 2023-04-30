import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../datepicker/DatePickerComponent";
import '../oneroadtrip/OneRoadTrip.scss'
import {useState} from "react";
import Suggestions from "../suggestion/Suggestions";

const OneRoadTrip = (props) => {

    function onChange(timestamp) {}

    const {setOrigin} = props.origin;
    const {setDestination} = props.destination

    const [originQuery, setOriginQuery] = useState('');
    const [destinationQuery, setDestinationQuery] = useState('');

    return (
        <div className="one-road">
            <div className="search-location">
                {/* Origin*/}
                <div className="search-input" id="origin-container">
                    <div><FontAwesomeIcon className="icon" icon={faPlaneDeparture}/></div>
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
            <div className="search-input search-date">
                <label>Departure Date</label>
                <DatePicker
                    onChange={onChange}
                    inputRef={props.departureDate}/>
            </div>
        </div>
    );
};

export default OneRoadTrip;
