import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane} from "@fortawesome/free-solid-svg-icons";
import '../../styles/BoardingPass.scss'
import {convertDuration} from "../fareoptions/FareOptions";
import {convertTimeToDigits} from "../flights/Flights";
import moment from "moment/moment";


const BoardingPass = ({order}) => {

    const slices = order.slices.map(item => {
        return {
            destination: item?.destination,
            fare_brand_name: item?.fare_brand_name,
            origin: item?.origin,
            origin_type: item?.origin_type,
            segments: item?.segments
        }
    })

    console.log(slices)

    const convertDate = (date) => {
       return new Date(date).toLocaleString('en', {month: "2-digit", day: "2-digit", year: "numeric"})
    }
    const [{
        origin: {
            iata_code: oic,
            city_name: ocn
        },
        destination: {
            iata_code: dic,
            city_name: dcn
        },
        segments: [{
            arriving_at,
            departing_at,
            destination,
            origin,
            origin_terminal,
            marketing_carrier_flight_number,
            passengers: [{
                cabin_class_marketing_name,
                seat
            }]
        }]
    }] = slices

    const getBoardingTime = (time, local) => {
        time = moment(time).subtract(40, "minute")
        return  convertTimeToDigits(time, local)
    };

    return (
        <div className="boarding-pass">
            {/* Card Top*/}
            <div className="card card-top">

                {/*Origin*/}
                <div className="origin">
                    <div className="code">{oic}</div>
                    <div className="city">{ocn}</div>
                </div>

                {/*Flight median*/}
                <div className="flight-median">
                    <FontAwesomeIcon icon={faPlane}/>
                </div>

                {/* Destination*/}
                <div className="destination">
                    <div className="code">{dic}</div>
                    <div className="city">{dcn}</div>
                </div>
            </div>
            {/*Median*/}
            <div className="median">

            </div>

            {/*Card Bottom*/}
            <div className="card card-bottom">
                <div className="card-row">

                    <div className="card-item">
                        <span className="label">Passenger<span> /s</span></span>
                        <p className="content">{order.passengers.length}</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Date</span>
                        <p className="content">{convertDate(departing_at)}</p>
                    </div>
                </div>

                <div className="card-row">

                    <div className="card-item">
                        <span className="label">Flight No</span>
                        <p className="content">{marketing_carrier_flight_number}</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Terminal</span>
                        <p className="content">{origin_terminal}</p>
                    </div>
                    <div className="card-item">
                        <span className="label">Seat</span>
                        <p className="content">{seat ? seat : '4A'}</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Class</span>
                        <p className="content">{cabin_class_marketing_name}</p>
                    </div>
                </div>

                <div className="card-row">

                    <div className="card-item">
                        <span className="label">Boarding Time</span>
                        <p className="content">{getBoardingTime(departing_at, origin?.time_zone)}</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Departure Time</span>
                        <p className="content">{convertTimeToDigits(departing_at, origin?.time_zone)}</p>
                    </div>
                    <div className="card-item">
                        <span className="label">Arrival Time</span>
                        <p className="content">{convertTimeToDigits(arriving_at, destination?.time_zone)}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BoardingPass;
