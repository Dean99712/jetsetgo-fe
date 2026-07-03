import React from 'react';

/**
 * Static sky rendered when WebGL is unavailable, the viewport is small,
 * or the user prefers reduced motion. Also the Suspense fallback while
 * the 3D scene chunk loads.
 */
const HeroFallback = () => (
    <div className="hero-fallback" aria-hidden="true">
        <div className="hero-fallback__stars"/>
        <div className="hero-fallback__cloud hero-fallback__cloud--one"/>
        <div className="hero-fallback__cloud hero-fallback__cloud--two"/>
        <div className="hero-fallback__cloud hero-fallback__cloud--three"/>
    </div>
);

export default HeroFallback;
