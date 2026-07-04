import React, {createContext, useContext, useEffect, useState} from 'react';
import {useReducedMotion} from 'framer-motion';

const CinemaContext = createContext({manifest: null, mode: 'scrub'});

// Module-level singleton so StrictMode's double effect run reuses the same fetch.
let manifestPromise = null;
const fetchManifest = () => {
    if (!manifestPromise) {
        manifestPromise = fetch(`${process.env.PUBLIC_URL}/cinema/manifest.json`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null);
    }
    return manifestPromise;
};

export const CinemaProvider = ({children}) => {
    const [manifest, setManifest] = useState(null);
    const reduceMotion = useReducedMotion();
    const [isSmallViewport] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
    );
    const mode = reduceMotion || isSmallViewport ? 'static' : 'scrub';

    useEffect(() => {
        let mounted = true;
        fetchManifest().then((m) => mounted && setManifest(m));
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <CinemaContext.Provider value={{manifest, mode}}>
            {children}
        </CinemaContext.Provider>
    );
};

export const useCinema = () => useContext(CinemaContext);
