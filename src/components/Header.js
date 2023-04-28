import React, {useRef, useState} from 'react';
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
import Logo from './../assets/images/LogoOnly.png'
import SearchBar from "./SearchBar";
import {motion as m} from 'framer-motion';
import useUser from "../hooks/useUser";


const Header = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const {auth, setAuth} = useAuth()
    const {user: currentUser, setUser} = useUser();
    const user = currentUser?.user

    const [openSearch, setOpenSearch] = useState(false);

    const [searchIcon, setSearchIcon] = useState('nav_search-icon');
    const [headerBackground, setHeaderBackground] = useState('');
    const [headerButtonBackground, setHeaderButtonBackground] = useState('btn-signup');
    const [middleTitleBackground, setMiddleTitleBackground] = useState('header_middle-title');
    const [logo, setLogo] = useState(LogoMainWhite);
    const [userIconWBg, setUserIconWBg] = useState('user-icon');

    const goToLoginPage = () => {
        return navigate('login', {replace: true})
    }

    const logout = () => {
        setUser({})
        setAuth({})
        window.localStorage.removeItem('accessToken')
    };
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

    const inputRef = useRef(null);

    window.addEventListener('scroll', addBackground)

    const mainHeader = () => {
        return <Navbar
            className={`header ${headerBackground}`}>
            <m.div
                initial={{position: "absolute"}}
                className="header-container">
                {user
                    ?
                    <div className="log-in-buttons">
                        <FontAwesomeIcon id={searchIcon}
                                         style={{display: openSearch ? "none" : "block"}}
                                         onClick={() => setOpenSearch(!openSearch)} icon={faSearch}/>
                        {openSearch && <SearchBar
                            openSearch={{openSearch, setOpenSearch}}
                            inputRef={inputRef}
                        />}
                        <button className="btn-signIn" onClick={() => logout()}>Logout
                        </button>
                        {!user.profile_picture
                            ?
                            <FontAwesomeIcon onClick={() => navigate(`/user/${user?.user_id}`, {replace: true})}
                                             id={`${userIconWBg}`} icon={faUser}/>
                            :
                            <img src={user?.profile_picture} onClick={() => navigate(`/user/${user?.user_id}`)}
                                 alt="user profile picture"/>}
                    </div>
                    :
                    <div className="log-in-buttons">
                        <FontAwesomeIcon id={searchIcon} style={{display: openSearch ? "none" : "block"}}
                                         onClick={() => setOpenSearch(!openSearch)} icon={faSearch}/>
                        {openSearch && <SearchBar
                            openSearch={{openSearch, setOpenSearch}}
                            inputRef={inputRef}
                        />}
                        <button className="btn-signIn" onClick={() => goToLoginPage()}>Sign in</button>
                        <button onClick={() => navigate('/register', {replace: true})}
                                className={`${headerButtonBackground}`}>Sign up
                        </button>
                    </div>
                }
                {/**/}
                <div className="header_middle-titles">
                    <button className={`${middleTitleBackground} left`}>All flights</button>
                    <button className={`${middleTitleBackground} middle`}>Schedule</button>
                    {user
                        ?
                        location.pathname !== `/user/${auth?.user}/orders`
                            ?
                            <button onClick={() => navigate(`/user/${user?.user_id}/orders`, {replace: true})}
                                    className={`${middleTitleBackground} right`}>Your orders</button>
                            : null
                        :
                        null
                    }
                </div>
                <div>
                    <Link to={"/"}>
                        <img src={logo} className="main-logo"
                             alt="some text"/>
                    </Link>
                </div>
            </m.div>
        </Navbar>;
    };

    const secondaryHeader = () => {
        return <Navbar className="header w-bg">
            <div className="header-container">
                {!user ?
                    <div className="log-in-buttons">
                        <FontAwesomeIcon id="search-icon_bg"
                                         style={{display: openSearch ? "none" : "block"}}
                                         onClick={() => setOpenSearch(!openSearch)}
                                         icon={faSearch}/>
                        {openSearch && <SearchBar
                            openSearch={{openSearch, setOpenSearch}}
                            inputRef={inputRef}
                        />}
                        <button className="btn-signIn" onClick={() => goToLoginPage()}>Sign in</button>
                        <button className="btn-signup_bg" onClick={() => navigate('register', {replace: true})}>Sign
                            up
                        </button>
                    </div>
                    :
                    <div className="log-in-buttons">
                        <FontAwesomeIcon id='search-icon_bg'
                                         style={{display: openSearch ? "none" : "block"}}
                                         onClick={() => setOpenSearch(!openSearch)}
                                         icon={faSearch}/>
                        {openSearch && <SearchBar
                            openSearch={{openSearch, setOpenSearch}}
                            inputRef={inputRef}
                        />}
                        <button className="btn-signIn" onClick={() => logout()}>Logout
                        </button>
                        {!user?.profile_picture ?
                            <FontAwesomeIcon id="user-icon_bg"
                                             onClick={() => navigate(`/user/${user?.user_id}`, {replace: true})}
                                             icon={faUser}/> :
                            <img src={user?.profile_picture}
                                 onClick={() => navigate(`/user/${user?.user_id}`, {replace: true})}
                                 alt="user profile picture"/>}
                    </div>
                }
                <div className="header_middle-titles">
                    <button className="middle-title_bg left">All flights</button>
                    <button className="middle-title_bg middle">Schedule</button>
                    {user?.user_id
                        ?
                        location.pathname !== `/user/${user?.user_id}/orders` ?
                            <button onClick={() => navigate(`/user/${user?.user_id}/orders`, {replace: true})}
                                    className="middle-title_bg right">Your orders</button>
                            : null
                        :
                        null
                    }
                </div>
                <div>
                    <Link to={"/"}>
                        <img src={Logo} className="logo"
                             alt="some text"/>
                    </Link>
                </div>
            </div>
        </Navbar>;

    };


    switch (location.pathname) {
        case '/register':
            return
        case '/login':
            return
        case '/':
            return mainHeader()
        case '/orderSummary':
            return mainHeader()
        default :
            return secondaryHeader()
    }
};

export default Header;
