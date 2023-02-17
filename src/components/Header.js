import React from 'react';
import "../styles/Header.scss"
import {Navbar} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate()

    const location = useLocation()

    const goToLoginPage = () => {
        return navigate('/login')
    }

    const renderHeader = () => {
        return <Navbar className="header-containerAll">
            <div className="header-container">
                <div className="log-in-buttons">
                    <button className="btn-signin" onClick={() => goToLoginPage()}>Sign in</button>
                    <button className="btn-signup">Sign in</button>
                </div>
                {/**/}
                <div className="header-middle-titles">
                    <span><button className="header-middle-title left">All flights</button></span>
                    <span><button className="header-middle-title middle">Schedule</button></span>
                    <span><button className="header-middle-title right">Your orders</button></span>
                </div>
                <div>
                    <Link to={"/"}>
                        <img src={require('./../assets/images/Logo.png')} className="logo"
                             alt="some text"/>
                    </Link>
                </div>
            </div>
        </Navbar>
    }

    const renderMainHeader = () => {
        return <Navbar className="header-containerAll">
            <div className="header-container">
                <div className="log-in-buttons">
                    <button className="btn-signin" onClick={() => goToLoginPage()}>Sign in</button>
                    <button className="btn-signup">Sign in</button>
                </div>
                {/**/}
                <div className="header-middle-titles">
                    <span><button className="header-middle-title left">All flights</button></span>
                    <span><button className="header-middle-title middle">Schedule</button></span>
                    <span><button className="header-middle-title right">Your orders</button></span>
                </div>
                <div>
                    <Link to={"/"}>
                        <img src={require('./../assets/images/Logowhite.png')} className="logo"
                             alt="some text"/>
                    </Link>
                </div>
            </div>
        </Navbar>
    }

    // if (location.pathname === '/login') {
    //     return <div>Shalom</div>
    // } else if (location.pathname === '/booking/flights') {
    //     return renderHeader()
    // } else if (location.pathname === '/fare_options'){
    //     return renderHeader()
    // }

    switch (location.pathname) {
        case '/login':
            return <div>Shalom</div>
        case '/booking/flights':
            return renderHeader()
        default :
             renderHeader()
    }

    return (
        <div>
            {renderMainHeader()}
            {/*{location.pathname === "/" ? renderMainHeader() : <div>What sup</div>}*/}
        </div>
    );
};

export default Header;
