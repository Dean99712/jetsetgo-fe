import React from 'react';
import {motion, useTransform} from 'framer-motion';

/**
 * An overlay copy block choreographed to a progress range: fades/rises in at
 * `range[0]`, holds, and fades/lifts out by `range[1]`. `pinStart`/`pinEnd`
 * keep it visible at the very start/end of the section (for the first and
 * last beats). MotionValues mutate style directly — no re-renders per tick.
 */
const Beat = ({progress, range, pinStart = false, pinEnd = false, className = '', drift = 26, children}) => {
    const [from, to] = range;
    const pad = Math.min(0.08, (to - from) / 3);

    const inStops = pinStart ? [from, from + 0.0001] : [from, from + pad];
    const outStops = pinEnd ? [to - 0.0001, to] : [to - pad, to];

    const opacity = useTransform(
        progress,
        [...inStops, ...outStops],
        [pinStart ? 1 : 0, 1, 1, pinEnd ? 1 : 0]
    );
    const y = useTransform(
        progress,
        [...inStops, ...outStops],
        [pinStart ? 0 : drift, 0, 0, pinEnd ? 0 : -drift]
    );

    return (
        <motion.div className={`cinema-beat ${className}`} style={{opacity, y}}>
            {children}
        </motion.div>
    );
};

export default Beat;
