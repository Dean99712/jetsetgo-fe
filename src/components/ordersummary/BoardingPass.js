import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane} from "@fortawesome/free-solid-svg-icons";
import '../../styles/BoardingPass.scss'


const BoardingPass = props => {

    return (
        <div className="boarding-pass">
            {/* Card Top*/}
            <div className="card card-top">

                {/*Origin*/}
                <div className="origin">
                    <div className="code">TLV</div>
                    <div className="city">Tel Aviv</div>
                </div>

                {/*Flight median*/}
                <div className="flight-median">
                    <FontAwesomeIcon icon={faPlane}/>
                </div>

                {/* Destination*/}
                <div className="destination">
                    <div className="code">DXB</div>
                    <div className="city">Dubai</div>
                </div>
            </div>
            {/*Median*/}
            <div className="median">

            </div>

            {/*Card Bottom*/}
            <div className="card card-bottom">
                <div className="card-row">

                    <div className="card-item">
                        <span className="label">Passenger</span>
                        <p className="content">PassengerName</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Date</span>
                        <p className="content">13/10/2023</p>
                    </div>
                </div>

                <div className="card-row">

                    <div className="card-item">
                        <span className="label">Flight No</span>
                        <p className="content">5229</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Gate</span>
                        <p className="content">D4</p>
                    </div>
                    <div className="card-item">
                        <span className="label">Seat</span>
                        <p className="content">4A</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Class</span>
                        <p className="content">Business</p>
                    </div>
                </div>

                <div className="card-row">

                    <div className="card-item">
                        <span className="label">Boarding Time</span>
                        <p className="content">17:25</p>
                    </div>

                    <div className="card-item">
                        <span className="label">Departure Time</span>
                        <p className="content">18:00</p>
                    </div>
                    <div className="card-item">
                        <span className="label">Arrival Time</span>
                        <p className="content">22:41</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BoardingPass;
