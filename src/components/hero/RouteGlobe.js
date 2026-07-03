import React from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import './RouteGlobe.scss';

const RouteGlobe = () => {
    const reduceMotion = useReducedMotion();

    const reveal = {
        initial: reduceMotion ? {opacity: 0} : {opacity: 0, y: 32},
        whileInView: reduceMotion ? {opacity: 1} : {opacity: 1, y: 0},
        viewport: {once: true, margin: '-80px'},
        transition: {duration: .7, ease: [.2, .7, .2, 1]},
    };

    return (
        <div className="route-globe">
            <motion.div className="route-globe__copy" {...reveal}>
                <span className="route-globe__eyebrow">One itinerary, everywhere</span>
                <h2>Your route, drawn in gold</h2>
                <p>Every leg of your trip on a single quiet canvas — departures, connections and
                    arrivals traced live as you build the journey.</p>
            </motion.div>

            <motion.div className="route-globe__panel" {...reveal}>
                <svg
                    viewBox="0 0 800 400"
                    role="img"
                    aria-label="Stylized globe with an animated flight route from London to Dubai"
                >
                    <g className="route-globe__graticule">
                        <ellipse cx="400" cy="200" rx="330" ry="170"/>
                        <ellipse cx="400" cy="200" rx="240" ry="170"/>
                        <ellipse cx="400" cy="200" rx="120" ry="170"/>
                        <line x1="400" y1="30" x2="400" y2="370"/>
                        <ellipse cx="400" cy="200" rx="330" ry="120"/>
                        <ellipse cx="400" cy="200" rx="330" ry="60"/>
                        <line x1="70" y1="200" x2="730" y2="200"/>
                    </g>

                    <g>
                        <circle cx="285" cy="128" r="5" fill="#F5C36B"/>
                        <circle className="route-globe__pulse" cx="285" cy="128" r="14"/>
                        <circle cx="520" cy="235" r="5" fill="#F5C36B"/>
                        <circle className="route-globe__pulse route-globe__pulse--late" cx="520" cy="235" r="14"/>
                        <circle cx="640" cy="150" r="3.5" fill="rgba(245, 195, 107, .5)"/>
                        <circle cx="180" cy="255" r="3.5" fill="rgba(245, 195, 107, .5)"/>
                    </g>

                    <path
                        className="route-globe__arc"
                        d="M285 128 Q420 40 520 235"
                        stroke="url(#route-globe-arc-gradient)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient
                            id="route-globe-arc-gradient"
                            x1="285" y1="128" x2="520" y2="235"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stopColor="#FFDCA3"/>
                            <stop offset="1" stopColor="#ECAA44"/>
                        </linearGradient>
                    </defs>

                    <g className="route-globe__labels">
                        <text x="252" y="110">LHR</text>
                        <text x="536" y="252">DXB</text>
                    </g>
                </svg>
            </motion.div>
        </div>
    );
};

export default RouteGlobe;
