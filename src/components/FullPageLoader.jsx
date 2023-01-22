import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";
import "../styles/FullPageLoader.css"

class FullPageLoader extends Component {
    render() {
        return (
            <div className="loader-container">
                <div className="loader">
                    <Spinner className="loader" animation={"border"} role={"status"}/>
                </div>
            </div>
        );
    }
}

export default FullPageLoader;