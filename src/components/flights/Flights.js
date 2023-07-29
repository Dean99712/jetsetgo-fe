import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faDollarSign,
    faFilter, faPlane, faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../Card";
import './Flights.scss'
import CardSkeleton from "../skeletoncard/CardSkeleton";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {faSortDown} from "@fortawesome/free-solid-svg-icons/faSortDown";
import Button from "../Button";
import {convertDuration} from "../fareoptions/FareOptions";
import {getOfferById} from "../../services/OfferRequestService";
import Connections from "./Connections";
import PriceOptions from "./PriceOptions";
import TimeOptions from "./TimeOptions";
import {AnimatePresence} from "framer-motion";

const Flights = () => {


    const [offers, setOffers] = useState([]);
    const [groupedOffers, setGroupedOffers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [passengers, setPassengers] = useState();

    const location = useLocation()
    const navigate = useNavigate()
    const id = location.state?.id;

    const [limit, setLimit] = useState(10);
    const [maxConnections, setMaxConnections] = useState(1);
    const [sort, setSort] = useState("");

    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isMaxConnectionsOpen, setIsMaxConnectionsOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            const response = await getOfferById(
                {
                    id,
                    limit,
                    sort,
                    maxConnections
                }
            )
            setOffers(response.data?.data);
            setIsLoading(false)
        };
        fetchData();

    }, [limit, maxConnections, sort]);

    useEffect(() => {
        if (offers.length > 0) {
            const grouped = offers.reduce((acc, offer) => {
                const operatingName = offer?.slices[0]?.segments[0]?.operating_carrier?.name.replace(" ", "_")
                const flightNumber = offer?.slices[0]?.segments[0]?.operating_carrier_flight_number
                const key = `${operatingName}-${flightNumber}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(offer);
                return acc;
            }, {});
            setGroupedOffers(grouped);
            handelPassengers()
        }
    }, [offers]);

    const getDateTimeLetters = date => {
        const time = new Date(date).toLocaleTimeString('en-US', {
            timeStyle: "short", hour12: true, timeZone: "UTC",
        });
        return time.slice(-2)
    };

    const getDateDay = date => {
        return new Date(date).toLocaleString('en-US', {weekday: "short"});
    };

    const loadMore = () => {
        setLimit(limit + 5)
    }

    const renderFirstOffer = (key, fares) => {
        const numAscending = [...groupedOffers[key]].sort((a, b) => a.total_amount - b.total_amount);
        const [...rest] = numAscending;
        const firstOffer = rest[0]

        const {
            slices: [{
                origin: {iata_code, time_zone: otz},
                duration,
                destination: {iata_code: iataCode, time_zone: dtz},
                segments: [{
                    departing_at, operating_carrier: {
                        name,
                        logo_symbol_url
                    }
                }]
            }]
        } = firstOffer;

        let arriving_at = firstOffer.slices.map(slice => slice.segments.map(segment => {
            return segment.arriving_at
        }))

        const [last] = arriving_at
        arriving_at = last[last.length - 1]

        return <Card className="offers" key={firstOffer.id}>
            <div className="items flight-owner-details">
                <img style={{height: '50px', width: '50px'}} src={logo_symbol_url} alt="owner-logo"/>
                <h6>{name}</h6>
            </div>
            <div className="items flight-destination-details">
                <p className="slice-day">{getDateDay(departing_at)}</p>
                <p className="slice-time">{convertTimeToDigits(departing_at, otz)}<span>{getDateTimeLetters(departing_at)}</span>
                </p>
                <p className="slice-title">{iata_code}</p>
            </div>
            <div className="items flight-duration">
                <p className="slice-time" id="flight-duration"><span
                    className="text-capitalize">duration</span>{convertDuration(duration)}
                </p>
                <div className="flights-median">
                    <FontAwesomeIcon icon={faPlane}/>
                </div>
                <div style={{display: "flex", gap: '1em', justifyContent: "space-evenly"}}>
                    <Button className="flight-details-button"><a href="src/components/flights/Flights">Show Flight
                        details</a></Button>
                </div>
            </div>
            <div className="items flight-destination-details">
                <p className="slice-day">{getDateDay(arriving_at)}</p>
                <p className="slice-time">{convertTimeToDigits(arriving_at, dtz)}<span>{getDateTimeLetters(arriving_at)}</span>
                </p>
                <p className="slice-title">{iataCode}</p>
            </div>
            <div className="items offer-select">
                <h6>Start from</h6>
                <h5>{convertCurrency(firstOffer.total_amount)} <span>/pax</span></h5>
                <button className="button-viewDeals"
                        onClick={() => navigateToPassengersDetails(fares)}> View deals
                </button>
            </div>
        </Card>
    };

    const handelPassengers = async () => {
        offers.map(offer => {
            const fetchedPassengers = offer?.passengers.map(passenger => {
                return {
                    id: passenger.id,
                    type: passenger.type,
                    given_name: passenger.given_name,
                    family_name: passenger.family_name,
                    age: passenger.age
                }
            })
            return setPassengers(fetchedPassengers)
        })
    }

    const navigateToPassengersDetails = (flight) => {
        navigate(`/fares`, {state: {fare: flight, passengers}, replace: true})
    };

    return (
        <div className="flights">
            <div className="offers-background">
                <div className="offers-container">
                    <div className="offer-filter-container">
                        {!isLoading && <div className="offers-filter">
                            <button className="filter-item" onClick={() => {
                                setIsTimeOpen(!isTimeOpen)
                                setIsMaxConnectionsOpen(false)
                                setIsPriceOpen(false)
                            }}>
                                <FontAwesomeIcon className="icon" id="times" icon={faClock}/> Times
                                {isTimeOpen
                                    ?
                                    <FontAwesomeIcon className="arrow-down" icon={faSortDown}/>
                                    :
                                    <FontAwesomeIcon className="arrow-down" icon={faSortUp}/>
                                }

                            </button>
                            <button className="filter-item" onClick={() => {
                                setIsPriceOpen(!isPriceOpen)
                                setIsTimeOpen(false)
                                setIsMaxConnectionsOpen(false)
                            }}>
                                <FontAwesomeIcon className="icon" id="price"
                                                 icon={faDollarSign}/> Price
                                {isPriceOpen
                                    ?
                                    <FontAwesomeIcon className="arrow-down" icon={faSortDown}/>
                                    :
                                    <FontAwesomeIcon className="arrow-down" icon={faSortUp}/>
                                }

                            </button>
                            <button className="filter-item"
                                    onClick={() => {
                                        setIsPriceOpen(false)
                                        setIsTimeOpen(false)
                                        setIsMaxConnectionsOpen(!isMaxConnectionsOpen)
                                    }}>

                                <FontAwesomeIcon className="icon"
                                                 id="more"
                                                 icon={faFilter}/> Connections
                                {isMaxConnectionsOpen
                                    ?
                                    <FontAwesomeIcon className="arrow-down" icon={faSortDown}/>
                                    :
                                    <FontAwesomeIcon className="arrow-down" icon={faSortUp}/>
                                }
                            </button>
                        </div>}
                    </div>
                    <AnimatePresence>
                        {isMaxConnectionsOpen &&
                        <Connections maxConnections={maxConnections} setMaxConnections={setMaxConnections}/>}
                        {isTimeOpen && <TimeOptions sort={sort} setSort={setSort}/>}
                        {isPriceOpen && <PriceOptions sort={sort} setSort={setSort}/>}
                    </AnimatePresence>

                    {isLoading && <CardSkeleton cards={5}/>}
                    <div>{!isLoading && Object.entries(groupedOffers).map(([key, offers], index) => (
                        <div key={index}>
                            {renderFirstOffer(key, offers)}
                        </div>))}
                        {!offers.length < 0 &&
                            <Card className="offers ">
                                <h6 className="text-center flex-grow-1 align-self-center fs-5">We're sorry, No offers
                                    available</h6>
                            </Card>}
                    </div>
                    {!isLoading &&
                        <button id="load-more_button" disabled={limit > offers.length} onClick={loadMore}>Load
                            more</button>}
                </div>
            </div>
        </div>
    );
};

export default Flights;


export const convertTimeToDigits = (date, local) => {
    const time = new Date(date).toLocaleTimeString('en-us', {
        timeStyle: "short", hour12: true, timeZone: local
    });
    return time.slice(0, -2)
};

export const convertCurrency = amount => {
    const us = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    });
    return us.format(amount)
};