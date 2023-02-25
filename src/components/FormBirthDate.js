import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import '../styles/FormBirthDay.scss';

const FormBirthDate = ({values, handleChange}) => {

    const year = new Date().getFullYear()
    const years = []
    for (let i = 1900; i <= year; i++) {
        years.push(i);
    }
    const days = []
    for (let i = 1; i <= 31; i++) {
        days.push(i);
    }
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "Jun",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    return (
        <div className="form_birth-container">
            <h6>Date of birth</h6>
            <div>
                <select
                    name="bornOn.days"
                    onChange={handleChange}
                    value={values.days}>
                    {days && days.length && days.map(value => (
                        <option value={value}>{value}</option>
                    ))}
                    <FontAwesomeIcon icon={faArrowDown}/>
                </select>
                <select
                    name="bornOn.months"
                    onChange={handleChange}
                    value={values.months}>
                    {Object.entries(months).map(([key, value]) => {
                        return (
                            <option value={key}>{value}</option>
                        )
                    })}
                    <FontAwesomeIcon icon={faArrowDown}/>
                </select>
                <select
                    name="bornOn.years"
                    onChange={handleChange}
                    value={values.years}>
                    {years.map(value => (
                        <option value={value}>{value}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FormBirthDate;
