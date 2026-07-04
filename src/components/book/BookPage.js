import React, {useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';
import {motion, useReducedMotion} from 'framer-motion';
import {ToastContainer} from 'react-toastify';
import GlassSearchCard from '../hero/GlassSearchCard';
import './BookPage.scss';

const BookPage = () => {
    const reduceMotion = useReducedMotion();

    useLayoutEffect(() => {
        const previousHtmlBackground = document.documentElement.style.background;
        document.documentElement.style.background = '#04081A';
        return () => {
            document.documentElement.style.background = previousHtmlBackground;
        };
    }, []);

    return (
        <div className="book-page">
            <ToastContainer theme="dark" position="top-right" autoClose={3000}/>

            <header className="book-page__nav">
                <Link to="/" className="book-page__back">← JetSetGo</Link>
                <Link to="/login" className="book-page__signin">Sign in</Link>
            </header>

            <motion.main
                className="book-page__content"
                initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 24}}
                animate={reduceMotion ? {opacity: 1} : {opacity: 1, y: 0}}
                transition={{duration: .7, ease: [.2, .7, .2, 1]}}
            >
                <span className="book-page__eyebrow">JetSetGo · Premium booking</span>
                <h1>Where to next?</h1>
                <GlassSearchCard/>
            </motion.main>
        </div>
    );
};

export default BookPage;
