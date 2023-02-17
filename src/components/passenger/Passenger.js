import React from 'react';
import '../../styles/Passenger.scss'
import {faCircleUser} from "@fortawesome/free-regular-svg-icons/faCircleUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Passenger = (props) => {

    const colors = ["#ECAA44", "#0086ff"];

    const passengers = props.passengers;
    const formik = props.formik

    const renderInfantId = (passenger, index) => {
        if (passengers.includes(passenger)) {
        }
            // for (let i = 0; i <= passengers.length; i++) {
            //     if (passenger.type === "infant_without_seat") {
            //         console.log("True",passenger.type, index)
            //        return console.log(passenger.id)
            //     }
            // }
            // if (passenger.type === "infant_without_seat") {
            //     console.log(passenger.id);
            //     return <input className="form-input"
            //                   type="text"
            //                   name={`passengers.${[index]}."infant_passenger_id`}
            //                   value={passenger.id}
            //                   onChange={formik.handleChange}
            //     />;
            // }
        };

        return (
                passengers.map((passenger, index) => (
                    <div className="passenger-container">
                        <div className="form-passenger-details">
                            <div className="passenger-type">
                                <FontAwesomeIcon className="passenger-icon" style={{color: colors[index]}}
                                                 icon={faCircleUser}/>
                                <h6
                                    className="passengerType">Passenger {index + 1}</h6>
                            </div>
                            <section className="section-passenger-details">
                                <div className="passenger-details">

                                    <div className="passenger-item">
                                        <label className="fw-semibold">Title</label>
                                        <select
                                            name={`passengers.${[index]}.title`}
                                            value={formik.values.passengers.title}
                                            onChange={formik.handleChange}>

                                            <option autoCapitalize="true" value=""></option>
                                            <option value="mr">Mr</option>
                                            <option value="ms">Ms</option>
                                            <option value="dr">Dr</option>
                                            <option value="prof">Prof</option>
                                        </select>
                                    </div>
                                    <div className="passenger-item">
                                        <label className="fw-semibold">First Name</label>
                                        <input className="form-input"
                                               type="text"
                                               name={`passengers.${[index]}.given_name`}
                                               value={formik.values.passengers.given_name}
                                               onChange={formik.handleChange}
                                        />
                                        {renderInfantId(passenger, index)}
                                    </div>
                                    <div className="passenger-item">
                                        <label className="fw-semibold">Last Name</label>
                                        <input className="form-input"
                                               name={`passengers.${[index]}.family_name`}
                                               value={formik.values.family_name}
                                               onChange={formik.handleChange}
                                               type="text"/>
                                    </div>
                                    <div className="passenger-item">
                                        <label className="fw-semibold">Date of Birth</label>

                                        <input className="form-input"
                                               id="DatePickerInput"
                                               name={`passengers.${[index]}.born_on`}
                                               value={formik.values.born_on}
                                               onChange={formik.handleChange}
                                               max={new Date().toString()}
                                               type="date"/>
                                    </div>
                                    <div className="passenger-item">
                                        <h6>Gender</h6>
                                        <span>
                                <input className="form-input"
                                       name={`passengers.${[index]}.gender`}
                                       value="m"
                                       onChange={formik.handleChange}
                                       type="radio"/>
                                <label>Male</label>
                                <input className="form-input"
                                       name={`passengers.${[index]}.gender`}
                                       onChange={formik.handleChange}
                                       value="f"
                                       type="radio"/>
                                <label>Female</label>
                            </span>
                                    </div>
                                    <div className="passenger-details">
                                        <input type="hidden"
                                               name={`passengers.email`}
                                               value={formik.values.passengers.email}
                                               onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )))
    };

    export default Passenger;
