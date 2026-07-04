import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion, useReducedMotion} from 'framer-motion';
import MagneticButton from '../../hero/MagneticButton';

const FinaleCTA = () => {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    return (
        <>
            <section className="finale">
                <motion.div
                    className="finale__content"
                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 32}}
                    whileInView={reduceMotion ? {opacity: 1} : {opacity: 1, y: 0}}
                    viewport={{once: true, margin: '-80px'}}
                    transition={{duration: .8, ease: [.2, .7, .2, 1]}}
                >
                    <h2 className="cinema-h2">Your seat is waiting.</h2>
                    <p className="cinema-sub">From search to boarding pass in minutes — beautifully.</p>
                    <MagneticButton variant="gold" onClick={() => navigate('/book')}>
                        Start booking <span aria-hidden="true">→</span>
                    </MagneticButton>
                </motion.div>
            </section>

            <footer className="cinema-footer">
                <span className="cinema-footer__wordmark">JetSetGo</span>
                <nav className="cinema-footer__links">
                    <Link to="/">Home</Link>
                    <Link to="/book">Book</Link>
                    <Link to="/login">Sign in</Link>
                </nav>
                <span className="cinema-footer__legal">© 2026 JetSetGo. All rights reserved.</span>
            </footer>
        </>
    );
};

export default FinaleCTA;
