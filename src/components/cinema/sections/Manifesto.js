import React, {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useCinema} from '../CinemaProvider';

const LINES = ['We believe the journey', 'should feel as considered', 'as the destination.'];

const ManifestoLine = ({progress, index, children}) => {
    const start = 0.08 + index * 0.16;
    const opacity = useTransform(progress, [start, start + 0.14], [0.14, 1]);
    const y = useTransform(progress, [start, start + 0.14], [18, 0]);
    return (
        <motion.p className="manifesto__line" style={{opacity, y}}>
            {children}
        </motion.p>
    );
};

/** Typographic sticky interlude between the hero and cabin clips. */
const Manifesto = () => {
    const ref = useRef(null);
    const {mode} = useCinema();
    const {scrollYProgress} = useScroll({target: ref, offset: ['start start', 'end end']});
    const ruleScale = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);

    if (mode === 'static') {
        return (
            <section className="manifesto manifesto--static">
                <div className="manifesto__lines">
                    {LINES.map((line) => (
                        <p key={line} className="manifesto__line">{line}</p>
                    ))}
                    <div className="manifesto__rule"/>
                </div>
            </section>
        );
    }

    return (
        <section ref={ref} className="manifesto">
            <div className="manifesto__sticky">
                <div className="manifesto__lines">
                    {LINES.map((line, index) => (
                        <ManifestoLine key={line} progress={scrollYProgress} index={index}>
                            {line}
                        </ManifestoLine>
                    ))}
                    <motion.div className="manifesto__rule" style={{scaleX: ruleScale}}/>
                </div>
            </div>
        </section>
    );
};

export default Manifesto;
