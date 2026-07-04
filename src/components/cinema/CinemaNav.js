import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useMotionValueEvent, useScroll} from 'framer-motion';
import MagneticButton from '../hero/MagneticButton';
import './CinemaNav.scss';

/** Fixed minimal nav: transparent over the hero, glass once scrolled. */
const CinemaNav = () => {
    const navigate = useNavigate();
    const {scrollY} = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, 'change', (y) => {
        const next = y > window.innerHeight * 0.4;
        setScrolled((prev) => (prev === next ? prev : next));
    });

    return (
        <header className={`cinema-nav ${scrolled ? 'is-scrolled' : ''}`}>
            <Link to="/" className="cinema-nav__wordmark">JetSetGo</Link>
            <nav className="cinema-nav__actions">
                <Link to="/login" className="cinema-nav__link">Sign in</Link>
                <MagneticButton
                    variant="gold"
                    className="cinema-nav__cta"
                    onClick={() => navigate('/book')}
                >
                    Book now
                </MagneticButton>
            </nav>
        </header>
    );
};

export default CinemaNav;
