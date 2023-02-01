import React, {useEffect, useState} from 'react';
import '../styles/OfferCard.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faPlane} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

const OfferCard = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [slices, setSlices] = useState([])
    const [passengers, setPassengers] = useState([])
    const [segments, setSegments] = useState([])
    // const [segmentPassengers, setSegmentPassengers] = useState([])

    const convertDate = (date) => {
        return new Date(date).toLocaleTimeString('en', {timeStyle: "short", hour12: false, timeZone: "UTC"});
    }

    const convertDuration = (date = toString()) => {
        const hours = date.slice(2, (date.length - 3))
        // const minutes = date
        const minutes = date.slice((date.length - 3))
        date = (`${hours} ${minutes}`).toLowerCase()
        console.log(date)
        return date
    };


    useEffect(() => {

        const fetchedDataHandler = () => {

            const transferredSlices = props.slices.map(slice => {
                return {
                    id: slice.id,
                    duration: slice.duration,
                    destination: slice.destination,
                    fare_brand_name: slice.fare_brand_name,
                    origin: slice.origin,
                    segments: slice.segments
                }
            })
            const transferredPassengers = props.passengers.map(passenger => {
                return {
                    id: passenger.id,
                    age: passenger.age,
                    family_name: passenger.family_name,
                    given_name: passenger.given_name,
                    type: passenger.type,
                }
            })
            setSlices(transferredSlices)
            setPassengers(transferredPassengers)
            setIsLoading(false)
        };

        fetchedDataHandler();

    }, []);

    // const fetchedSegmentPassengerHandler = () => {
    //
    //     segments.map(segment => {
    //         const transferredSegmentPassengers = segment.passengers.map(passenger => {
    //             return {
    //                 passenger_id: passenger.passenger_id,
    //                 cabin_class: passenger.cabin_class,
    //                 cabin_class_marketing_name: passenger.cabin_class_marketing_name,
    //                 fare_basis_code: passenger.fare_basis_code
    //             }
    //         })
    //     setSegmentPassengers(transferredSegmentPassengers)
    //     })
    // }

    useEffect(() => {
        const fetchedSegmentsHandler = () => {

            props.slices.map(slice => {
                const transferredSegments = slice.segments.map(segment => {
                    return {
                        id: segment.id,
                        arriving_at: segment.arriving_at,
                        departing_at: segment.departing_at,
                        aircraft: segment.aircraft,
                        marketing_carrier: segment.marketing_carrier,
                        operating_carrier: segment.operating_carrier,
                        marketing_carrier_flight_number: segment.marketing_carrier_flight_number,
                        duration: segment.duration,
                        origin_terminal: segment.origin_terminal,
                        passengers: segment.passengers,
                        stops: segment.stops,
                    }
                })
                setSegments(transferredSegments)
            })
            return true
        }

        fetchedSegmentsHandler()
    }, [])


    const selectOffer = (id) => {
        console.log(id)
    }

    console.log(segments)

    return (

        <div>
            <Card>
                <div className="origin-title">
                    {slices.map(slice => (
                        <div>
                            {segments.map(segment => (
                                <div className="time">{convertDate(segment.arriving_at)}</div>
                            ))}
                            <p className="city-title">{slice.origin.city_name}</p>
                            <p className="iata-title">{slice.origin.iata_code}</p>
                        </div>
                    ))}
                </div>
                <div className="duration-title">
                    {segments.map(segment => (
                        <div className="duration-container" style={{borderBottom: "1px #27939f solid"}}>
                            <FontAwesomeIcon style={{color: "#27939f"}} icon={faPlane}/>
                            <div className="duration"><p>{convertDuration(segment.duration)}</p></div>
                            <p>{segment.stops}</p>
                            <FontAwesomeIcon icon={faCircle}/>
                        </div>
                    ))}
                </div>
                <div className="destination-title">
                    {slices.map(slice => (
                        <div>
                            {segments.map(segment => (
                                <div className="time">{convertDate(segment.departing_at)}</div>
                            ))}
                            <p className="city-title">{slice.destination.city_name}</p>
                            <p className="iata-title">{slice.destination.iata_code}</p>
                        </div>
                    ))}
                </div>
                <div className="cabin_class-container">
                    {segments.map(segment => (
                        <div className="passengers-container">
                            {segment.passengers.map(passenger => (
                                <div>{passenger.cabin_class_marketing_name}</div>
                            ))}<span className="fw-bold">From</span>
                            <p className="fw-semibold">{props.totalAmount}<span> {props.baseCurrency}</span></p>
                        </div>
                    ))}
                </div>
                <button className="btn btn-dark text-white" onClick={() => selectOffer(props.id)}>Select offer</button>
            </Card>
        </div>
    );
};

export default OfferCard;
