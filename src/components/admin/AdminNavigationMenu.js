import React from 'react';
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../admin/NavigationMenu.scss'

const NavigationMenu = () => {
    return (
        <Nav className="navigation-drawer">
            <Link to={''}>Home</Link>
            <Link to={'users'}>Users</Link>
            <Link to={''}></Link>
            <Link to={''}></Link>
            <Link to={''}></Link>
            <Link to={'/'}>Logout</Link>
        </Nav>
    );
};

export default NavigationMenu;
