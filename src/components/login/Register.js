import React, {useState} from 'react';
import '../login/Register.scss'
import InputComponent from "../InputComponent";
import {useFormik} from "formik";
import {useMutation} from "@tanstack/react-query";
import {register} from "../../services/AuthService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {CircularProgress} from "@mui/material";
import BirthDate from "../BirthDate";
import {useNavigate} from "react-router-dom";
import {notification} from "../../App";
import {registerValidation} from "../../validations/validationSchema";

const Register = () => {

    const navigate = useNavigate()

    const mobileOperators =
        ['050', '051', '052', '053', '054', '055', '058']

    const [serverErrors, setServerErrors] = useState('Something went wrong');

    const {mutate, isLoading, isError} = useMutation(register, {
        onSuccess: () => {
            notification("Success!", "User created successfully", "success")
            navigate('/', {replace: true})
        },
        onError: (error) => {
            switch (error.response.status) {
                case 401:
                    return setServerErrors("Email is already exist")
                case 400:
                    return setServerErrors("Bad request");
                case 500 :
                    return setServerErrors("Something went wrong... Please try again later")
                default :
                    setServerErrors("Something went wrong")
            }
        }
    });

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
        onSubmit,
        validationSchema: registerValidation
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
                    {isError && <p className="error-text p-2">{serverErrors}</p>}
                    <h6 className="form-title">Create and account</h6>
                    <div>
                        <div className="register-item">
                            <InputComponent
                                name="given_name"
                                onChange={handleChange}
                                handleBlur={handleBlur}
                                type="text"
                                value={values.given_name}
                                placeholder="First name"
                            />
                            {errors.given_name && touched.given_name ?
                                <p className="text-danger">{errors.given_name}</p> : null}
                        </div>
                        <div className="register-item">
                            <InputComponent
                                name="family_name"
                                onChange={handleChange}
                                handleBlur={handleBlur}
                                type="text"
                                value={values.family_name}
                                placeholder="Last name"
                            />
                            {errors.family_name && touched.family_name ?
                                <p className="text-danger">{errors.family_name}</p> : null}
                        </div>
                    </div>
                    <div>
                        <div className="register-item">
                            <InputComponent
                                name="password"
                                onChange={handleChange}
                                handleBlur={handleBlur}
                                type="password"
                                value={values.password}
                                placeholder="password"
                            />
                            {errors.password && touched.password ?
                                <p className="text-danger">{errors.password}</p> : null}
                        </div>
                        <div className="register-item">
                            <InputComponent
                                name="confirm_password"
                                onChange={handleChange}
                                handleBlur={handleBlur}
                                type="password"
                                value={values.confirm_password}
                                placeholder="confirm password"
                            />
                            {errors.confirm_password && touched.confirm_password ?
                                <p className="text-danger">{errors.confirm_password}</p> : null}
                        </div>
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
                                    required
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
                                    required
                                    value="female"
                                />
                                <label>Female</label>
                            </div>
                        </div>
                    </div>

                    <div className="register-item">
                        <InputComponent
                            name="email"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            type="email"
                            value={values.email}
                            placeholder="email"
                        />
                        {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : null}
                    </div>

                    <div>
                        <div className="register-item">
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
                        </div>
                        <div className="register-item">
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

                    </div>
                    <div className="register-item">
                        <BirthDate
                            values={values.bornOn}
                            bornOn={born_on}
                            handleChange={handleChange}
                            errors={errors.bornOn}
                        />
                    </div>
                    <button type="submit" className="register_button" disabled={isLoading && errors}>
                        {isLoading
                            ?
                            <CircularProgress sx={{
                                color: "#FFFFFF"
                            }}
                            />
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
