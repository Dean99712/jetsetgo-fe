import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import '../../components/fareoptions/FareOptions.scss';
import Fare from "./Fare";
import moment from "moment/moment";
import FlightDetails from "./FlightDetails";
import SelectedFare from "./SelectedFare";

export const convertDuration = (duration) => {

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
    if (minute === 'p0d' || minute === 'P0D') {
        minute = '';
    }

    return ` ${hour.toLowerCase()} ${minute.toLowerCase()} ${day.toLowerCase()}`;
};

const FareOptions = () => {

    const location = useLocation();
    const fares = location.state.fare;

    const passengers = location.state.passengers

    const numAscending = [...fares].sort((a, b) => a.total_amount - b.total_amount);

    const navigate = useNavigate()

    const [selected, setSelected] = useState({});

    const convertCurrency = amount => {
        const us = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return us.format(amount)
    };

    const convertDate = date => {
        return new Date(date).toLocaleTimeString('he-IL', {timeStyle: "short", hour12: false, timeZone: "UTC",});
    };

    const navigateToCreateOrder = (offer) => {
        return navigate(`/createOrder`, {state: {fare: offer, passengers}})
    };

    return (
        <div className="fare-options_container">

            <div className="flight-fares">
                <FlightDetails
                    flightDetails={fares[0]}
                    convertDuration={convertDuration}
                    convertDate={convertDate}
                />

                <div className="fares">{numAscending.map(fare => (
                    <Fare
                        key={fare.id}
                        fare={fare}
                        convertCurrency={convertCurrency}
                        selected={{selected, setSelected}}
                    />
                ))}</div>

                <SelectedFare
                    fareDetails={fares[0]?.owner}
                    convertCurrency={convertCurrency}
                    navigateToCreateOrder={navigateToCreateOrder}
                    selected={selected}
                />
            </div>

        </div>
    );

};

export default FareOptions;

