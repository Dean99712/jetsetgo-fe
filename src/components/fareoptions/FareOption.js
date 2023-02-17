import React from 'react';
import Card from "../Card";

const FareOption = (props) => {

    const slices = props.fare.slices.map(slice => {
        return slice;
    })

    const fare = props.fare

    const convertCurrency = amount => {
        const us = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD',
        });
        return us.format(amount)
    };

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
    } = fare

    return (
        <Card className="offers">
            <div className="items flight-owner-details">
                <img style={{height: '50px', width: '50px'}} src={logo_symbol_url} alt=""/>
                <p>{name}</p>
            </div>
            <div className="items flight-destination-details">
                        <p className="slice-day">{}</p>
                        <p className="slice-time">{}<span>{}</span></p>
                        <p className="slice-title">{city_name}</p>
            </div>
            <div className="items flight-duration">
                <p className="slice-time" id="flight-duration"><span className="text-capitalize">duration</span>{props.convertDuration(duration)}</p>
                <a href="">Show Flight details</a>
                <div>
                    <p className="slice-subtitle">{}</p>
                    <p className="slice-subtitle ">{}</p>
                </div>
            </div>
            <div className="items flight-origin-details">
                <p className="slice-day">{cityName}</p>
                <p className="slice-time">{convertDateToDigits(departing_at, timeZone)}<span>{}</span></p>
                <p className="slice-title ">{cityName}</p>

            </div>
            <div className="items offer-select">
                <h6>Price</h6>
                <h5>{props.convertCurrency(fare.total_amount)}<span style={{color:"#d5d5d5"}}>/pax</span></h5>
                <button className="button-viewDeals"
                        onClick={() => props.navigateToCreateOrder(fare)}> Select offer
                </button>
            </div>
        </Card>
    );
};

export default FareOption;
