import React, {useRef} from 'react';
import {motion, useMotionValue, useSpring, useTransform, useReducedMotion} from 'framer-motion';
import './MagneticButton.scss';

const SPRING = {stiffness: 150, damping: 12, mass: 0.2};

const MagneticButton = ({children, className = '', variant = 'gold', type = 'button', onClick, ...rest}) => {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, SPRING);
    const springY = useSpring(y, SPRING);
    const labelX = useTransform(springX, (v) => v * 0.4);
    const labelY = useTransform(springY, (v) => v * 0.4);

    const handleMouseMove = (e) => {
        if (reduceMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            type={type}
            className={`magnetic-button magnetic-button--${variant} ${className}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            style={{x: springX, y: springY}}
            whileTap={reduceMotion ? undefined : {scale: 0.97}}
            {...rest}
        >
            <motion.span className="magnetic-button__label" style={{x: labelX, y: labelY}}>
                {children}
            </motion.span>
        </motion.button>
    );
};

export default MagneticButton;
