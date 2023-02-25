import React, {useEffect, useState} from 'react';
import '../fareoptions/FlightDetails.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane} from "@fortawesome/free-solid-svg-icons";
import {convertDuration} from "./FareOptions";
import {convertTimeToDigits} from "../flights/Flights";

const FlightDetails = ({flightDetails}) => {

    const [flightStops, setFlightStops] = useState('');

    const getFullYearDate = (date) => {
        return new Date(date).toLocaleString('en', {month: "short", day: "2-digit", year: "numeric"})
    };

    const {
        slices: [{
            segments,
            origin: {
                iata_code: oic,
                time_zone: otz,
            },
            destination: {
                name: dn,
                iata_code: dic,
                time_zone: dtz
            },
            duration
        }]
    } = flightDetails;

    const segment = segments.map(segment => {
        return {
            arriving_at: segment.arriving_at,
            departing_at: segment.departing_at,
            duration: segment.duration
        }
    })

    const [{departing_at}] = segment;

    const lastFlight = segment[segment.length - 1];

    useEffect(() => {
        if (segment.length <= 1) {
            setFlightStops('Direct');
        } else {
            setFlightStops(`${segment.length} stops`)
        }
    }, [])

    return (
        <div className="flightDetails">

            <div className="flight-details_title">
                <h5>{`Flight to ${dic}, ${dn}`}<span
                    className="flight-date">{getFullYearDate(segment[0].departing_at)}</span></h5>
            </div>

            <section className="flight-details_section">
                <div className="flight-details owner">
                    <img src={flightDetails?.owner.logo_symbol_url} alt="Owner image"/>
                </div>
                <div className="flight-details origin">
                    <h6>{convertTimeToDigits(departing_at, otz)}</h6>
                    <p>{oic}</p>
                </div>
                <div className="flight-details duration">
                    <p><span>Duration</span>{convertDuration(duration)}</p>
                    <div></div>
                    <FontAwesomeIcon icon={faPlane}/>
                    <p className="text-capitalize flight">{flightStops}</p>
                </div>
                <div className="flight-details destination">
                    <h6>{convertTimeToDigits(lastFlight.arriving_at, dtz)}</h6>
                    <p>{dic}</p>
                </div>
            </section>
        </div>
    );
};

export default FlightDetails;
