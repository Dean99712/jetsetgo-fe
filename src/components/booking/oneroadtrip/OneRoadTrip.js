import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../datepicker/DatePickerComponent";
import '../oneroadtrip/OneRoadTrip.scss'
import Suggestions from "../suggestion/Suggestions";
import {useState} from "react";

const OneRoadTrip = props => {

    function onChange(timestamp) {}
    const [originQuery, setOriginQuery] = useState('');
    const [destinationQuery, setDestinationQuery] = useState('');

    const [originIataCode, setOriginIataCode] = useState('');
    const [destinationIataCode, setDestinationIataCode] = useState('');

    return (
        <div className="one-road">
            <div className="search-location">
                {/* Origin*/}
                <div className="search-input" id="origin-container">
                    <div><FontAwesomeIcon className="icon" icon={faPlaneDeparture}/></div>
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
                <DatePicker
                    onChange={onChange}
                    inputRef={props.departureDate}/>
            </div>
        </div>
    );
};

export default OneRoadTrip;
