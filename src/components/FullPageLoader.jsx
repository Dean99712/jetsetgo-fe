import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";
import "../styles/FullPageLoader.scss"

class FullPageLoader extends Component {
    render() {
        return (
            <div className="loading-container">
                <div className="loader-container">
                    <Spinner className="spinner loader" animation={"border"} role={"status"}/>
                    <h4>Looking for flights...</h4>
                </div>
            </div>
        );
    }
}

export default FullPageLoader;