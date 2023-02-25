import React, {useState} from 'react';
import '../login/Register.scss'
import InputComponent from "../InputComponent";
import {useFormik} from "formik";
import {useMutation} from "@tanstack/react-query";
import {register} from "../../services/AuthService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {CircularProgress} from "@mui/material";
import FormBirthDate from "../FormBirthDate";
import {useNavigate} from "react-router-dom";
import {notification} from "../../App";

const Register = () => {

    const navigate = useNavigate()

    const mobileOperators =
        ['050', '051', '052', '053', '054', '055', '058']

    const [serverErrors, setServerErrors] = useState('Something went wrong');

    const {data, mutate, isLoading, isError} = useMutation(["register"], register, {
        onSuccess: () => {
            if (data?.statusCodeValue === 201) {
                console.log('User has been created successfully')
                setServerErrors('User has been created successfully')
            }
        },
        onError: () => {
            if (data.statusCodeValue === 401) {
                setServerErrors(data?.body)
                console.log(data?.body)

            } else if (data?.statusCodeValue === 400) {
                setServerErrors(data?.body)
            }
        }
    })

    const onSubmit = () => {
        mutate({
            phone_number,
            gender: values.gender,
            born_on: born_on,
            given_name: values.given_name,
            family_name: values.family_name,
            email: values.email,
            password: values.password,
            confirm_password: values.confirm_password
        })

        if (values) {
            notification("Success!", "User created successfully", "success")
            return navigate('/', {replace: true})
        }
    }

    const {values, errors, handleChange, handleBlur, handleSubmit, touched} = useFormik({
        initialValues: {
            phone_number: {
                mobile_operator: '',
                number: ''
            },
            gender: "",
            bornOn: {
                days: '',
                months: '',
                years: ''
            },
            given_name: "",
            family_name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        onSubmit
    })

    let phone_number = values.phone_number.mobile_operator + values.phone_number.number

    let born_on = new Date(
        values.bornOn.years,
        values.bornOn.months,
        values.bornOn.days)
        .toLocaleString(
            'en',
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).replaceAll("/", "-")

    return (
        <div className="register">
            <div className="register_background"></div>
            <section>
                <form className="form-register" onSubmit={handleSubmit}>
                    {isError && <p className="error-text">{serverErrors}</p>}
                    <h6 className="form-title">Create and account</h6>
                    <div>
                        <InputComponent
                            name="given_name"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            type="text"
                            value={values.given_name}
                            placeholder="First name"
                        />
                        <InputComponent
                            name="family_name"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            type="text"
                            value={values.family_name}
                            placeholder="Last name"
                        />
                    </div>
                    <div>
                        <InputComponent
                            name="password"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            type="password"
                            value={values.password}
                            placeholder="password"
                        />
                        <InputComponent
                            name="confirm_password"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            type="password"
                            value={values.confirm_password}
                            placeholder="confirm password"
                        />
                    </div>
                    <div className="gender_container">
                        <h6>Gender</h6>
                        <div>
                            <div className="gender-type_container">
                                <InputComponent
                                    name="gender"
                                    onChange={handleChange}
                                    handleBlur={handleBlur}
                                    type="radio"
                                    value="male"
                                />
                                <label>Male</label>
                            </div>
                            <div className="gender-type_container">
                                <InputComponent
                                    name="gender"
                                    onChange={handleChange}
                                    handleBlur={handleBlur}
                                    type="radio"
                                    value="female"
                                />
                                <label>Female</label>
                            </div>
                        </div>
                    </div>
                    <InputComponent
                        name="email"
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        type="email"
                        value={values.email}
                        placeholder="email"
                    />
                    <div>
                        <select
                            name="phone_number.mobile_operator"
                            onChange={handleChange}
                            value={values.phone_number.mobile_operator}
                        >
                            {mobileOperators.map(value => (
                                <option value={value}>{value}</option>
                            ))}
                            <FontAwesomeIcon icon={faArrowDown}/>
                        </select>
                        <InputComponent
                            name="phone_number.number"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            type="text"
                            value={values.phone_number.number}
                            placeholder="phone number"
                            max={7}
                        />
                    </div>
                    <FormBirthDate
                        values={values.bornOn}
                        bornOn={born_on}
                        handleChange={handleChange}
                    />
                    <button type="submit" className="register_button" disabled={errors?.length >= 1}>
                        {isLoading
                            ?
                            <CircularProgress/>
                            :
                            "Submit"
                        }
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Register;
