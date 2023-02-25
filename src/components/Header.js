import React, {useState} from 'react';
import "../styles/header/Header.scss"
import {Navbar} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import '../styles/header/HeaderBackground.scss'
import LogoMainWhite from './../assets/images/LogoMainWhite.png'
import LogoMain from './../assets/images/LogoMain.png'


const Header = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const {auth, setAuth} = useAuth()

    const [searchIcon, setSearchIcon] = useState('nav_search-icon');
    const [headerBackground, setHeaderBackground] = useState('');
    const [headerButtonBackground, setHeaderButtonBackground] = useState('btn-signup');
    const [middleTitleBackground, setMiddleTitleBackground] = useState('header_middle-title');
    const [logo, setLogo] = useState(LogoMainWhite);
    const [userIconWBg, setUserIconWBg] = useState('user-icon');

    const goToLoginPage = () => {
        return navigate('login')
    }

    const logout = () => {
        setAuth({})
    }

    const addBackground = () => {
        if (window.scrollY >= 100) {
            setHeaderBackground('w-bg')
            setLogo(LogoMain)
            setMiddleTitleBackground('middle-title_bg')
            setUserIconWBg('user-icon_bg')
            setHeaderButtonBackground('btn-signup_bg')
            setSearchIcon('search-icon_bg')
        } else {
            setHeaderBackground('')
            setLogo(LogoMainWhite)
            setMiddleTitleBackground('header_middle-title')
            setUserIconWBg('user-icon')
            setHeaderButtonBackground('btn-signup')
            setSearchIcon('nav_search-icon')
        }
    }

    window.addEventListener('scroll', addBackground)

    const renderMainHeader = () => {
        return <Navbar className={`header ${headerBackground}`}>
            <div className="header-container" >
                {!auth.user ?
                    <div className="log-in-buttons">
                        <FontAwesomeIcon id={searchIcon} icon={faSearch}/>
                        <button className="btn-signIn" onClick={() => goToLoginPage()}>Sign in</button>
                        <button className={`${headerButtonBackground}`}>Sign up</button>
                    </div>
                    :
                    <div className="log-in-buttons">
                        <FontAwesomeIcon id={searchIcon} icon={faSearch}/>
                        <button className="btn-signIn" onClick={() => logout()}>Logout
                        </button>
                        {!auth.profilePic ? <FontAwesomeIcon id={`${userIconWBg}`} icon={faUser}/> :
                            <img src="userProfile" alt="userProfile picture"/>}
                    </div>
                }
                {/**/}
                <div className="header_middle-titles">
                    <button className={`${middleTitleBackground} left`}>All flights</button>
                    <button className={`${middleTitleBackground} middle`}>Schedule</button>
                    {auth.user
                        ?
                        <button className={`${middleTitleBackground} right`}>Your orders</button>
                        :
                        <></>
                    }
                </div>
                <div>
                    <Link to={"/"}>
                        <img src={logo} className="logo"
                             alt="some text"/>
                    </Link>
                </div>
            </div>
        </Navbar>
    };

    switch (location.pathname) {
        case '/login':
            return
        case '/orders':
            return
        default :
            return renderMainHeader()
    }
};

export default Header;
