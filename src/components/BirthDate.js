import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import '../styles/FormBirthDay.scss';

const BirthDate = ({values, handleChange, handleBlur}) => {

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
        {value: 1, name: "January"},
        {value: 2, name: "February"},
        {value: 3, name: "March"},
        {value: 4, name: "April"},
        {value: 5, name: "May"},
        {value: 6, name: "Jun"},
        {value: 7, name: "July"},
        {value: 8, name: "August"},
        {value: 9, name: "September"},
        {value: 10, name: "October"},
        {value: 11, name: "November"},
        {value: 12, name: "December"},
    ]

    return (
        <div className="form_birth-container">
            <h6>Date of birth</h6>
            <div>
                <select
                    name="bornOn.days"
                    onChange={handleChange}
                    value={values?.days}
                    onBlur={handleBlur}
                >
                    {days && days.length && days?.map(value => <option value={value}>{value}</option>)}
                    <FontAwesomeIcon icon={faArrowDown}/>
                </select>
                <select
                    name="bornOn.months"
                    onChange={handleChange}
                    value={values?.months}
                    onBlur={handleBlur}
                >
                    {months.map(value => {
                        return <option value={value.value}>{value.name}</option>
                    })}
                    <FontAwesomeIcon icon={faArrowDown}/>
                </select>
                <select
                    name="bornOn.years"
                    onChange={handleChange}
                    value={values?.years}
                    onBlur={handleBlur}
                >
                    {years?.map(value => <option value={value}>{value}</option>)}
                </select>
            </div>
        </div>
    );
};

export default BirthDate;
