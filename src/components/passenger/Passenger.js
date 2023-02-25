import React, {useRef} from 'react';
import '../../styles/Passenger.scss'
import {faCircleUser} from "@fortawesome/free-regular-svg-icons/faCircleUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DatePicker from "../datepicker/DatePickerComponent";
import InputComponent from "../InputComponent";

const Passenger = (props) => {

    const color = "#0086ff";

    const passengers = props.passengers;

    const formik = props.formik

    function onChange(timestamp) {
    }

    return (
        passengers.map((passenger, index) => (
            <div className="passenger-container">
                <div className="form-passenger-details">
                    <div className="passenger-type">
                        <FontAwesomeIcon className="passenger-icon" style={{color: color}}
                                         icon={faCircleUser}/>
                        <h6
                            className="passengerType">Passenger {index + 1}</h6>
                    </div>
                    <section className="section-passenger-details">
                        <div className="passenger-details">

                            <div className="passenger-item">
                                <div className="form-item">
                                    <label className="fw-semibold">Title</label>
                                    <select
                                        name={`passengers.${[index]}.title`}
                                        value={formik.values.passengers.title}
                                        onChange={formik.handleChange}
                                        placeholder="Title"
                                    >
                                        <option autoCapitalize="true" value=""></option>
                                        <option value="mr">Mr</option>
                                        <option value="ms">Ms</option>
                                        <option value="dr">Dr</option>
                                        <option value="prof">Prof</option>
                                    </select>
                                </div>
                            </div>

                            <div className="passenger-item">
                                <div className="form-item">
                                    <InputComponent
                                        type={"text"}
                                        required={true}
                                        name={`passengers.${[index]}.given_name`}
                                        value={formik.values.passengers.given_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="First name"
                                    />
                                    {formik.errors.passengers?.[index]?.given_name ?
                                        <p className="text-danger">{formik.errors.passengers?.[index]?.given_name}</p> : <></>}
                                </div>

                            </div>
                            <div className="passenger-item">
                                <div className="form-item">
                                    <InputComponent
                                        type={"text"}
                                        name={`passengers.${[index]}.family_name`}
                                        value={formik.values.passengers.family_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Last name"
                                    />
                                    {formik.errors.passengers?.[index]?.family_name ?
                                        <p className="text-danger">{formik.errors.passengers?.[index]?.family_name}</p> : <></>}
                                </div>

                            </div>
                            <div className="passenger-item">

                                <div className="form-item">
                                    <InputComponent
                                    type={"date"}
                                    name={`passengers.${[index]}.born_on`}
                                    value={formik.values.passengers.born_on}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Date of birth"
                                /></div>

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
                                <div className="form-item">
                                    <input type="hidden"
                                            name={`passengers.${index}.email`}
                                            value={formik.values.passengers?.index?.email}
                                            onChange={formik.handleChange}
                                /></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )))
};

export default Passenger;
