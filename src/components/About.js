import React from 'react';
import '../styles/About.scss';
import {motion as m} from 'framer-motion';

const About = () => {
    return (
        <m.div className="about">
            <m.div className="about_content">
                <m.h3 className="about_header">About us</m.h3>

                <m.p className="about_text">
                    JetSetGo is a flight booking platform built to make travel planning simple,
                    fast and fun. Search flights from carriers all around the world, compare fares
                    and cabin classes, and book your next trip in just a few clicks — all wrapped
                    in a beautiful interface with playful animations.
                </m.p>

                <m.p className="about_text">
                    Booking with JetSetGo takes just five easy steps. Start by telling us where
                    you are flying from and where you want to go. We will then show you every
                    available flight so you can pick the one that fits your schedule and budget.
                    Next, choose your preferred fare and cabin class, add the details of the
                    passengers travelling with you, and confirm your order. That is it — you are
                    ready to fly!
                </m.p>

                <m.p className="about_text">
                    Create a free account to get the most out of JetSetGo. Signed-in travellers
                    can view and manage their orders at any time under "Your Orders", keep their
                    profile up to date, and pick up right where they left off. Wherever you are
                    headed, we are here to get you there. Have a good flight!
                </m.p></m.div>
            {/*<div className="shape oval"></div>*/}
            {/*<div className="shape circle2"></div>*/}
            {/*<div className="shape circle3"></div>*/}
        </m.div>
    );
};

export default About;
