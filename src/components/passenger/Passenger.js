import React from 'react';
import '../../styles/Passenger.scss'
import {faCircleUser} from "@fortawesome/free-regular-svg-icons/faCircleUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputComponent from "../InputComponent";

const Passenger = ({formik, index}) => {

    const color = "#0086ff";

    return (
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


                        <div className="passenger-item passenger-title">
                            <div className="form-item">
                                <select
                                    name={`passengers.${[index]}.title`}
                                    value={formik.values.passengers.title}
                                    onChange={formik.handleChange}
                                    required
                                >
                                    <option autoCapitalize="true" className="text-" value="">Title</option>
                                    <option value="mr">Mr</option>
                                    <option value="ms">Ms</option>
                                    <option value="dr">Dr</option>
                                    <option value="prof">Prof</option>
                                </select>
                                {(formik.errors.passengers?.[index]?.title && formik.touched.passengers?.[index]?.title)
                                    &&
                                    <p className="text-danger error-message">{formik.errors.passengers?.[index]?.title}</p>
                                }
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
                                    handleBlur={formik.handleBlur}
                                    placeholder="First name"
                                />
                                {(formik.errors.passengers?.[index]?.given_name && formik.touched.passengers?.[index]?.given_name)
                                    &&
                                    <p className="text-danger error-message">{formik.errors.passengers?.[index]?.given_name}</p>
                                }
                            </div>

                        </div>
                        <div className="passenger-item">
                            <div className="form-item">
                                <InputComponent
                                    type="text"
                                    name={`passengers.${[index]}.family_name`}
                                    value={formik.values.passengers.family_name}
                                    onChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    onBlur={formik.handleBlur}
                                    placeholder="Last name"
                                />
                                {(formik.errors.passengers?.[index]?.family_name && formik.touched.passengers?.[index]?.family_name)
                                    &&
                                    <p className="text-danger error-message">{formik.errors.passengers?.[index]?.family_name}</p>}
                            </div>

                        </div>
                        <div className="passenger-item">

                            <div className="form-item">

                                <InputComponent
                                    type={"date"}
                                    name={`passengers.${[index]}.born_on`}
                                    value={formik.values.passengers.born_on}
                                    onChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    placeholder="Date of birth"
                                />
                                {(formik.errors.passengers?.[index]?.born_on && formik.touched.passengers?.[index]?.born_on)
                                    &&
                                    <p className="text-danger error-message">{formik.errors.passengers?.[index]?.born_on}</p>}
                            </div>

                        </div>
                        <div className="passenger-item gender">
                            <h6 className="title">Gender</h6>
                            <span className="gender-selection">
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
                            {(formik.errors.passengers?.[index]?.gender && formik.touched.passengers?.[index]?.gender)
                                &&
                                <p className="text-danger error-message">{formik.errors.passengers?.[index]?.gender}</p>}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )


};

export default Passenger;
