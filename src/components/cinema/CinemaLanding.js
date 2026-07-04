import React, {useLayoutEffect} from 'react';
import {CinemaProvider} from './CinemaProvider';
import Preloader from './Preloader';
import CinemaNav from './CinemaNav';
import HeroScrub from './sections/HeroScrub';
import Manifesto from './sections/Manifesto';
import CabinScrub from './sections/CabinScrub';
import DestinationsScrub from './sections/DestinationsScrub';
import StatsStrip from './sections/StatsStrip';
import FinaleCTA from './sections/FinaleCTA';
import './CinemaLanding.scss';

const CinemaLanding = () => {
    useLayoutEffect(() => {
        document.body.classList.add('cinema-active');
        const previousHtmlBackground = document.documentElement.style.background;
        document.documentElement.style.background = '#04081A';
        return () => {
            document.body.classList.remove('cinema-active');
            document.documentElement.style.background = previousHtmlBackground;
        };
    }, []);

    return (
        <CinemaProvider>
            <div className="cinema-landing">
                <Preloader/>
                <CinemaNav/>
                <HeroScrub/>
                <Manifesto/>
                <CabinScrub/>
                <DestinationsScrub/>
                <StatsStrip/>
                <FinaleCTA/>
            </div>
        </CinemaProvider>
    );
};

export default CinemaLanding;
