import React from 'react';
import '../styles/Error.scss'
import ErrorImage from '../assets/images/error/NotFound.png'
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div className="error_page">
            <img src={ErrorImage} alt="error-message" className="errorImage"/>
            <h5>Page Not Found</h5>
            <Link to={'/'} className="text-uppercase">go home</Link>
        </div>
    );
};

export default Error;
