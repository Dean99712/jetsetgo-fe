import React from 'react';
import {motion, useReducedMotion} from 'framer-motion';

const STATS = [
    {value: '480+', label: 'Destinations, one search'},
    {value: '24/7', label: 'Travel concierge'},
    {value: '4.9★', label: 'Traveller rating'},
    {value: 'CO₂-aware', label: 'Smarter routing'},
];

const StatsStrip = () => {
    const reduceMotion = useReducedMotion();
    return (
        <section className="stats-strip">
            <div className="stats-strip__grid">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="stats-strip__tile"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 28}}
                        whileInView={reduceMotion ? {opacity: 1} : {opacity: 1, y: 0}}
                        viewport={{once: true, margin: '-60px'}}
                        transition={{duration: .6, delay: index * 0.08, ease: [.2, .7, .2, 1]}}
                    >
                        <span className="stats-strip__value">{stat.value}</span>
                        <span className="stats-strip__label">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatsStrip;
