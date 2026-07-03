import React from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlane} from '@fortawesome/free-solid-svg-icons';
import './FlightShowcaseCards.scss';

const SHOWCASE_FLIGHTS = [
    {
        airline: 'Qatar Airways',
        monogram: 'QR',
        detail: 'QSuite · Direct',
        departure: {time: '08:40', code: 'LHR'},
        arrival: {time: '17:55', code: 'DOH'},
        duration: '6h 15m',
        baggage: '2 × 23 kg included',
        cabin: 'Business',
        price: '$1,240',
    },
    {
        airline: 'Emirates',
        monogram: 'EK',
        detail: 'A380 · Direct',
        departure: {time: '22:20', code: 'JFK'},
        arrival: {time: '19:10', code: 'DXB'},
        duration: '12h 50m',
        baggage: '2 × 32 kg included',
        cabin: 'First',
        price: '$3,980',
    },
    {
        airline: 'Singapore Airlines',
        monogram: 'SQ',
        detail: 'Suites · One stop',
        departure: {time: '09:15', code: 'SIN'},
        arrival: {time: '16:45', code: 'CDG'},
        duration: '14h 30m',
        baggage: '1 × 23 kg included',
        cabin: 'Premium',
        price: '$1,860',
    },
];

const FlightShowcaseCards = () => {
    const reduceMotion = useReducedMotion();

    const reveal = (delay) => ({
        initial: reduceMotion ? {opacity: 0} : {opacity: 0, y: 32},
        whileInView: reduceMotion ? {opacity: 1} : {opacity: 1, y: 0},
        viewport: {once: true, margin: '-80px'},
        transition: {duration: .7, delay, ease: [.2, .7, .2, 1]},
    });

    return (
        <div className="flight-showcase">
            <motion.div className="flight-showcase__head" {...reveal(0)}>
                <span className="flight-showcase__eyebrow">Curated fares</span>
                <h2>Fly with the world&rsquo;s finest</h2>
                <p>Hand-picked routes on airlines we&rsquo;d board ourselves — transparent fares, generous
                    baggage, no surprises at the gate.</p>
            </motion.div>

            <div className="flight-showcase__grid">
                {SHOWCASE_FLIGHTS.map((flight, index) => (
                    <motion.article className="flight-showcase__card" key={flight.airline} {...reveal(index * 0.1)}>
                        <div className="flight-showcase__airline">
                            <span className="flight-showcase__monogram">{flight.monogram}</span>
                            <div>
                                <b>{flight.airline}</b>
                                <span>{flight.detail}</span>
                            </div>
                        </div>

                        <div className="flight-showcase__route">
                            <div>
                                <div className="flight-showcase__time">{flight.departure.time}</div>
                                <div className="flight-showcase__code">{flight.departure.code}</div>
                            </div>
                            <div className="flight-showcase__leg">
                                <FontAwesomeIcon icon={faPlane}/>
                            </div>
                            <div>
                                <div className="flight-showcase__time">{flight.arrival.time}</div>
                                <div className="flight-showcase__code">{flight.arrival.code}</div>
                            </div>
                        </div>

                        <div className="flight-showcase__meta">
                            <span>{flight.duration}</span>
                            <span aria-hidden="true">·</span>
                            <span>{flight.baggage}</span>
                            <span className="flight-showcase__chip">{flight.cabin}</span>
                        </div>

                        <div className="flight-showcase__footer">
                            <span className="flight-showcase__from">From</span>
                            <span className="flight-showcase__price">{flight.price}</span>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    );
};

export default FlightShowcaseCards;
