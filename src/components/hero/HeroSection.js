import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {motion, useMotionValue, useSpring, useTransform, useReducedMotion} from 'framer-motion';
import {ToastContainer} from 'react-toastify';
import GlassSearchCard from './GlassSearchCard';
import FlightShowcaseCards from './FlightShowcaseCards';
import RouteGlobe from './RouteGlobe';
import MagneticButton from './MagneticButton';
import HeroFallback from './HeroFallback';
import './HeroSection.scss';

const HeroScene = lazy(() => import('./scene/HeroScene'));

const detectWebGL = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch (error) {
        return false;
    }
};

const entrance = (reduceMotion, delay) => ({
    initial: reduceMotion ? {opacity: 0} : {opacity: 0, y: 26},
    animate: reduceMotion ? {opacity: 1} : {opacity: 1, y: 0},
    transition: {duration: .8, delay, ease: [.2, .7, .2, 1]},
});

const HeroSection = () => {
    const reduceMotion = useReducedMotion();
    const [canRun3D] = useState(() => window.innerWidth >= 768 && detectWebGL());
    const show3D = canRun3D && !reduceMotion;

    const heroRef = useRef(null);
    const searchRef = useRef(null);
    const showcaseRef = useRef(null);

    // Pause the WebGL frameloop when the hero scrolls out of view
    const [sceneActive, setSceneActive] = useState(true);
    useEffect(() => {
        if (!show3D || !heroRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setSceneActive(entry.isIntersecting),
            {threshold: 0.05}
        );
        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, [show3D]);

    // Subtle counter-parallax on the UI while the scene parallaxes behind it
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = {stiffness: 60, damping: 16};
    const copyX = useSpring(useTransform(mouseX, (v) => v * -5), springConfig);
    const copyY = useSpring(useTransform(mouseY, (v) => v * -3), springConfig);
    const cardX = useSpring(useTransform(mouseX, (v) => v * -10), springConfig);
    const cardY = useSpring(useTransform(mouseY, (v) => v * -6), springConfig);

    const handleMouseMove = (e) => {
        if (reduceMotion) return;
        mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
        mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    const focusSearch = () => {
        searchRef.current?.querySelector('input')?.focus();
    };

    const scrollToShowcase = () => {
        showcaseRef.current?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'});
    };

    return (
        <div className="hero-page">
            <ToastContainer theme="dark" position="top-right" autoClose={3000}/>

            <section className="hero-page__hero" ref={heroRef} onMouseMove={handleMouseMove}>
                <div className="hero-page__sky" aria-hidden="true">
                    {show3D ? (
                        <Suspense fallback={<HeroFallback/>}>
                            <HeroScene active={sceneActive}/>
                        </Suspense>
                    ) : (
                        <HeroFallback/>
                    )}
                </div>

                <div className="hero-page__inner">
                    <motion.div className="hero-page__parallax" style={{x: copyX, y: copyY}}>
                        <motion.div className="hero-page__copy" {...entrance(reduceMotion, 0)}>
                            <span className="hero-page__eyebrow">JetSetGo · Premium flight booking</span>
                            <h1>Book flights <em>beautifully</em></h1>
                            <p>Search, compare and manage your perfect trip in one elegant place.</p>
                            <div className="hero-page__ctas">
                                <MagneticButton variant="gold" onClick={focusSearch}>
                                    Start your journey <span aria-hidden="true">→</span>
                                </MagneticButton>
                                <MagneticButton variant="ghost" onClick={scrollToShowcase}>
                                    Explore destinations
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div className="hero-page__parallax" style={{x: cardX, y: cardY}}>
                        <motion.div ref={searchRef} {...entrance(reduceMotion, 0.18)}>
                            <GlassSearchCard/>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="hero-page__showcase" ref={showcaseRef}>
                <div className="hero-page__showcase-inner">
                    <FlightShowcaseCards/>
                    <RouteGlobe/>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
