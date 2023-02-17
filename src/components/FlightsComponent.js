import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faDollarSign,
    faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import '../styles/FlightsComponent.scss'
import CardSkeleton from "./skeletoncard/CardSkeleton";
import moment from "moment";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {faSortDown} from "@fortawesome/free-solid-svg-icons/faSortDown";
import Button from "./Button";

const FlightsComponent = () => {

        const [offers, setOffers] = useState([]);
        const [groupedOffers, setGroupedOffers] = useState([]);

        const [isLoading, setIsLoading] = useState(false);

        const [passengers, setPassengers] = useState();

        const location = useLocation()
        const navigate = useNavigate()
        const offerId = location.state.id;

        const [limit, setLimit] = useState(10);
        const [maxConnections, setMaxConnections] = useState(0);
        const [sort, setSort] = useState("total_amount");

        useEffect(() => {

            const fetchData = async () => {
                setIsLoading(true)
                const response = await axios.get("http://localhost:8080/api/offers/getOfferById", {
                    params: {
                        offer_request_id: offerId,
                        limit: limit,
                        sort: sort,
                        max_connections: maxConnections
                    }
                })
                setOffers(response.data.data);
                setIsLoading(false)
            };
            fetchData();

        }, [limit, maxConnections, sort]);

        useEffect(() => {

            const fetchedDataHandler = () => {

            }
            fetchedDataHandler();
        }, []);

        const convertCurrency = amount => {
            const us = new Intl.NumberFormat('en-US', {
                style: 'currency', currency: 'USD',
            });
            return us.format(amount)
        };

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

        const convertDateToDigits = (date, local) => {
            const time = new Date(date).toLocaleTimeString('en', {
                timeStyle: "short", hour12: true, timeZone: local
            });
            return time.slice(0, -2)
        };

        const getDateTimeLetters = date => {
            const time = new Date(date).toLocaleTimeString('en-US', {
                timeStyle: "short", hour12: true, timeZone: "UTC",
            });
            return time.slice(-2)
        };

        const getDateDay = date => {
            return new Date(date).toLocaleString('en-US', {weekday: "short"});
        };

        const convertDuration = (duration) => {

            const days = moment.duration(duration).days()
            const hours = moment.duration(duration).hours()
            const minutes = moment.duration(duration).minutes()

            let day = moment.duration({
                d: days,
            }).toISOString();
            let hour = moment.duration({
                h: hours,
            }).toISOString();
            let minute = moment.duration({
                m: minutes,
            }).toISOString();

            day = day.replace("P", "");
            hour = hour.replace("PT", "");
            minute = minute.replace("PT", "");

            if (day.includes("0")) {
                day = '';
            } else {
                day = `+${days}`
            }
            if (minute === 'p0d' || minute === 'P0D' ) {
                minute = '';
            }

            return ` ${hour.toLowerCase()} ${minute.toLowerCase()} ${day.toLowerCase()}`;
        };

        const filterMaxConnections = (value) => {
            setMaxConnections(value)
            console.log(maxConnections)
            if (maxConnections >= 2) {
                setMaxConnections(0)
            }
        }

        const sortByDuration = () => {
            setSort("total_duration")
        }

        const sortByAmount = () => {
            setSort("total_amount")
        }

        const loadMore = () => {
            setLimit(limit + 5)
            console.log(offers)
        }


        const renderFirstOffer = (key, fares) => {
            const numAscending = [...groupedOffers[key]].sort((a, b) => a.total_amount - b.total_amount);
            const [...rest] = numAscending;
            const firstOffer = rest[0]

            const {
                slices: [{
                    origin: {iata_code, city_name, time_zone},
                    duration,
                    destination: {iata_code: iataCode, city_name: cityName, time_zone: timeZone},
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
                    <img style={{height: '50px', width: '50px'}} src={logo_symbol_url} alt=""/>
                    <p>{name}</p>
                </div>
                <div className="items flight-destination-details">
                    <p className="slice-day">{getDateDay(departing_at)}</p>
                    <p className="slice-time">{convertDateToDigits(departing_at, timeZone)}<span>{getDateTimeLetters(departing_at)}</span>
                    </p>
                    <p className="slice-title">{iata_code}</p>
                </div>
                <div className="items flight-duration">
                    <p className="slice-time" id="flight-duration"><span className="text-capitalize">duration</span>{convertDuration(duration)}</p>
                    <div style={{display: "flex", gap: '1em', justifyContent: "space-evenly"}}>
                        <Button className="flight-details-button"><a href="">Show Flight details</a></Button>
                    </div>
                </div>
                <div className="items flight-destination-details">
                    <p className="slice-day">{getDateDay(arriving_at)}</p>
                    <p className="slice-time">{convertDateToDigits(arriving_at, time_zone)}<span>{getDateTimeLetters(arriving_at)}</span>
                    </p>
                    <p className="slice-title">{iataCode}</p>
                </div>
                <div className="items offer-select">
                    <h6>Start from</h6>
                    <h5>{convertCurrency(firstOffer.total_amount)}</h5>
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

        const navigateToPassengersDetails = (fare) => {
            navigate(`/fare_options`, {state: {fare, passengers}})
        };

        return (
            <div className="flights-container--all">
                <div className="offers-page-background">
                    <div style={{
                        position:"relative",
                        top:"37em",
                        paddingBottom:"4em"
                    }}>
                        <div className="offer-filter-container">
                            {!isLoading && <div className="offers-filter">
                                <button className="filter-item" onClick={sortByDuration}><FontAwesomeIcon className="icon" id="times" icon={faClock}/> Times
                                </button>
                                <button className="filter-item" onClick={sortByAmount}><FontAwesomeIcon className="icon" id="price"
                                                                                 icon={faDollarSign}/> Price
                                </button>
                                <button className="filter-item"><FontAwesomeIcon className="icon" id="more"
                                                                                 icon={faFilter}/> More<FontAwesomeIcon
                                    id="icon" icon={faSortDown}/></button>
                            </div>}
                        </div>
                        {isLoading && <CardSkeleton cards={5}/>}

                        <div>{!isLoading && Object.entries(groupedOffers).map(([key, offers], index) => (
                            <div key={index}>
                                {renderFirstOffer(key, offers)}
                            </div>))}</div>
                        <button id="load-more--button" onClick={loadMore}>Load more</button>
                    </div>
                </div>
            </div>)
            ;
    }
;

export default FlightsComponent;
