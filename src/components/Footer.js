import React from 'react';
import '../styles/Footer.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import PlaneSvg from '../assets/svg/PlaneSVG.svg'
import Logo from '../assets/images/LogoMainWhite.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faGithub,
    faGoogle,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {

    const navigate = useNavigate()

    const flights = [
        {name: "all flights", path: "/allFlights"},
        {name: "schedule", path: "/schedule"}
    ];

    const navigations = [
        {name: "Home", path: "/"},
        {name: "Login", path: "/login"},
        {name: "Register", path: "/register"},
    ];
    const contacts = [
        {
            name: "facebook",
            link: "",
            logo: faFacebookF
        },
        {
            name: "github",
            link: "https://github.com/Dean99712?tab=repositories",
            logo: faGithub,
        },
        {
            name: "email",
            link: "dean2910997@gmail.com",
            logo: faGoogle
        },
        {
            name: "linkedin",
            link: " https://www.linkedin.com/in/dean-uziel-16979722a/",
            logo: faLinkedin,
        }
    ];
    const renderFooter = () => {

        return <div className="footer-container">

            <div className="subscribe-inquiries">
                <img className="plane-svg" src={PlaneSvg} alt="Plane Svg"/>
                <h6 className="title">Subscribe to our club</h6>
                <button onClick={() => navigate('/register')} className="submit-inquiry">Join us</button>
            </div>

            <div>
                <span className="footer-icons">
                    <FontAwesomeIcon className="footer-icon" icon={faFacebookF}/>
                    <FontAwesomeIcon className="footer-icon" icon={faGithub}/>
                    <FontAwesomeIcon className="footer-icon" icon={faGoogle}/>
                    <FontAwesomeIcon className="footer-icon" icon={faLinkedin}/>
                </span>
            </div>

            <div className="footer_bottom">
                <div className="footer_row">
                    <img className="footer-logo" src={Logo} alt="logo"/>
                    <p className="footer_logo-text">™2023. All rights reserved</p>
                </div>
                <div className="footer_row">
                    <h6 className="text-uppercase row-title">Navigation</h6>
                    <ul>
                        {navigations.map(navigation => {
                            return (
                                <li><Link to={navigation.path}>{navigation.name}</Link></li>
                            )
                        })}
                    </ul>
                </div>
                <div className="footer_row">
                    <h6 className="text-uppercase row-title">Flights</h6>
                    <ul>
                        {flights.map(flight => {
                            return (
                                <li className="text-capitalize"><a target="_self" href={flight.path}>{flight.name}</a></li>
                            )
                        })}
                    </ul>
                </div>
                <div className="footer_row">
                    <h6 className="text-uppercase row-title">About us</h6>
                    <ul>
                        <li><Link to={'/about'}>More about us</Link></li>
                    </ul>
                </div>
                <div className="footer_row">
                    <h6 className="text-uppercase row-title">Social</h6>
                    <ul>
                        {contacts.map((contact, index) => {
                            return (
                                <div className="footer-column" key={index}>
                                    <FontAwesomeIcon icon={contact.logo}/>
                                    <li><Link className="text-capitalize" to={contact.link}>{contact.name}</Link></li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
            ;

    };

    const location = useLocation()
    if (location.pathname === "/") {
        return renderFooter()
    } else return (<></>);
};

export default Footer;
