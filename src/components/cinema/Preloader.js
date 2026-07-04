import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useCinema} from './CinemaProvider';
import {useFrameProgress} from './hooks/useFrameStore';
import './Preloader.scss';

const MIN_DISPLAY_MS = 1200;

/**
 * Full-screen brand intro shown while the hero clip's coarse frame pass
 * loads. In static mode (mobile / reduced motion) it becomes a short brand
 * card. Exits with a clip-path wipe.
 */
const Preloader = () => {
    const {manifest, mode} = useCinema();
    const heroMeta = manifest?.clips?.hero;
    const {loadedCount, total, ready} = useFrameProgress('hero', mode === 'scrub' ? heroMeta : null, mode === 'scrub');

    const [minElapsed, setMinElapsed] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setMinElapsed(true), mode === 'static' ? 600 : MIN_DISPLAY_MS);
        return () => clearTimeout(timer);
    }, [mode]);

    const contentReady = mode === 'static' ? true : (manifest ? ready : false);
    const done = minElapsed && contentReady;
    const fraction = mode === 'static' ? 1 : Math.min(1, loadedCount / Math.max(1, Math.ceil(total / 8) + 1));

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="cinema-preloader"
                    initial={false}
                    exit={{clipPath: 'inset(0 0 100% 0)', transition: {duration: .8, ease: [.7, 0, .2, 1]}}}
                >
                    <motion.span
                        className="cinema-preloader__wordmark"
                        initial={{opacity: 0, letterSpacing: '0.6em'}}
                        animate={{opacity: 1, letterSpacing: '0.32em'}}
                        transition={{duration: 1.1, ease: [.2, .7, .2, 1]}}
                    >
                        JETSETGO
                    </motion.span>
                    <div className="cinema-preloader__bar">
                        <div
                            className="cinema-preloader__fill"
                            style={{transform: `scaleX(${fraction})`}}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
