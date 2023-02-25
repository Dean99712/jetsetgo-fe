import React, {Component} from 'react';
import "../styles/FullPageLoader.css"
import {CircularProgress} from "@mui/material";

class FullPageLoader extends Component {

    render() {
        return (
            <div className="loading-container">
                <div className="loader-container">
                    <CircularProgress className="spinner loader" animation={"border"} role={"status"}/>
                    <h4>Looking for flights...</h4>
                </div>
            </div>
        );
    }
}

export default FullPageLoader;