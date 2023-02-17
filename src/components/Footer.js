import React from 'react';
import '../styles/Footer.scss'
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";

const Footer = () => {

    const renderMainFooter = () => {
        return <footer className="bg-light text-center text-dark">

            <div className="container p-4">
                <section className="mb-4">

                </section>

                <section className="">
                    <form action="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-auto">
                                <p className="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </div>

                            <div className="col-md-5 col-12">

                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="form5Example21" className="form-control"/>
                                    <label className="form-label" htmlFor="form5Example21">Email address</label>
                                </div>
                            </div>

                            <div className="col-auto">

                                <button type="submit" className="btn btn-outline-light mb-4">

                                </button>
                            </div>

                        </div>

                    </form>
                </section>

                <section className="">

                    <div className="row">

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Social links</h5>

                            <ul className="list-unstyled mb-0" style={{
                                display:"flex", gap:"1em"
                            }}>
                                <li>
                                    <FontAwesomeIcon icon={faFacebook}/><a href={''} style={{textDecoration:"none"}} className="text-white">Facebook</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faInstagram}/><a href={''} style={{textDecoration:"none"}} className="text-white">Instagram</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faGithub}/><a href={''} style={{textDecoration:"none"}} className="text-white">Github</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faLinkedin}/><a href={''} style={{textDecoration:"none"}} className="text-white">Linkedin</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Social links</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <FontAwesomeIcon icon={faFacebook}/><a href={''} style={{textDecoration:"none"}} className="text-white">Facebook</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faInstagram}/><a href={''} style={{textDecoration:"none"}} className="text-white">Instagram</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faGithub}/><a href={''} style={{textDecoration:"none"}} className="text-white">Github</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faLinkedin}/><a href={''} style={{textDecoration:"none"}} className="text-white">Linkedin</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Social links</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <FontAwesomeIcon icon={faFacebook}/><a href={''} style={{textDecoration:"none"}} className="text-white">Facebook</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faInstagram}/><a href={''} style={{textDecoration:"none"}} className="text-white">Instagram</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faGithub}/><a href={''} style={{textDecoration:"none"}} className="text-white">Github</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faLinkedin}/><a href={''} style={{textDecoration:"none"}} className="text-white">Linkedin</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Social links</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <FontAwesomeIcon icon={faFacebook}/><a href={''} style={{textDecoration:"none"}} className="text-white">Facebook</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faInstagram}/><a href={''} style={{textDecoration:"none"}} className="text-white">Instagram</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faGithub}/><a href={''} style={{textDecoration:"none"}} className="text-white">Github</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faLinkedin}/><a href={''} style={{textDecoration:"none"}} className="text-white">Linkedin</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                © 2023 Copyright:
                <a className="text-white" href="http://localhost:3000/"> JetSetGo</a>
            </div>
        </footer>
    }

    const location = useLocation();
    if (location.pathname === "/") {
        return renderMainFooter()
    } else {
        <div></div>
    }
    return (
        <div className="footer-container">

        </div>
    );
};

export default Footer;
