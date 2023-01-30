import React from 'react';
import "../styles/Header.scss"
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <Navbar className="header-container">
                <div className="log-in-button">
                    <button className="btn-login">Log in</button>
                </div>

                <div className="header-middle-titles">
                    <h3 className="header-middle-title">Book a Flight</h3>
                    <h3 className="header-middle-title">Get Ready</h3>
                    <h3 className="header-middle-title">Service & Information</h3>
                </div>
                <div>
                    <h1 className="logo"><Link to={"/"}/>Logo</h1>
                </div>
            </Navbar>
        </div>
    );
};

export default Header;
