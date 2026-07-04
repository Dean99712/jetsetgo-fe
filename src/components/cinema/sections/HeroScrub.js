import React from 'react';
import {useNavigate} from 'react-router-dom';
import {motion, useTransform} from 'framer-motion';
import CinemaScrubSection from '../CinemaScrubSection';
import Beat from '../Beat';
import MagneticButton from '../../hero/MagneticButton';

const ScrollCue = ({progress}) => {
    const opacity = useTransform(progress, [0, 0.05], [1, 0]);
    return (
        <motion.div className="cinema-scroll-cue" style={{opacity}}>
            <span className="cinema-scroll-cue__label">Scroll</span>
            <span className="cinema-scroll-cue__line"/>
        </motion.div>
    );
};

const HeroCopy = ({navigate}) => (
    <>
        <span className="cinema-eyebrow">JetSetGo · Private-feeling travel</span>
        <h1 className="cinema-h1">Book flights <em>beautifully</em>.</h1>
        <p className="cinema-sub">Search, compare and manage your perfect trip in one elegant place.</p>
        <div className="cinema-ctas">
            <MagneticButton variant="gold" onClick={() => navigate('/book')}>
                Begin your journey <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton
                variant="ghost"
                onClick={() => window.scrollBy({top: window.innerHeight * 2.2, behavior: 'smooth'})}
            >
                Keep scrolling
            </MagneticButton>
        </div>
    </>
);

const HeroScrub = () => {
    const navigate = useNavigate();
    return (
        <CinemaScrubSection
            clip="hero"
            heightVh={320}
            eager
            className="hero-scrub"
            staticContent={
                <div className="cinema-beat cinema-beat--flow">
                    <HeroCopy navigate={navigate}/>
                </div>
            }
        >
            {(progress) => (
                <>
                    <Beat progress={progress} range={[0, 0.38]} pinStart>
                        <HeroCopy navigate={navigate}/>
                    </Beat>
                    <Beat progress={progress} range={[0.46, 0.8]} className="cinema-beat--center">
                        <h2 className="cinema-line">Above the everyday.</h2>
                    </Beat>
                    <ScrollCue progress={progress}/>
                </>
            )}
        </CinemaScrubSection>
    );
};

export default HeroScrub;
