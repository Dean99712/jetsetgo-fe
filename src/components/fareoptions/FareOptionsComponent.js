import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import '../../components/fareoptions/FareOptions.scss';
import FareOption from "./FareOption";
import moment from "moment/moment";

const FareOptionsComponent = () => {

    const location = useLocation();
    const fares = location.state.fare;

    const passengers = location.state.passengers

    const numAscending = [...fares].sort((a, b) => a.total_amount - b.total_amount);

    const navigate = useNavigate()

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

    console.log(fares)

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
        return navigate(`/flight_checkout`, {state: {fare: offer, passengers}})
    };

    return (
        <div className="fares-containerAll">
            <div className="fare-options--container">
                <div className="fares-container">{numAscending.map(fare => (
                    <span style={{height: "200px", margin: "8px 0"}} key={fare.id}>
                        <FareOption
                            fare={fare}
                            convertDate={convertDate}
                            navigateToCreateOrder={navigateToCreateOrder}
                            convertCurrency={convertCurrency}
                            convertDuration={convertDuration}
                        />
                    </span>
                ))}</div>
            </div>
        </div>
    );

};

export default FareOptionsComponent;
