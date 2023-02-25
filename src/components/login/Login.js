import React, {useState} from 'react';
import '../../styles/login/Login.scss'
import {useMutation} from "@tanstack/react-query";
import {loginUser} from "../../services/UserService";
import {useFormik} from "formik";
import jwtDecode from "jwt-decode";
import {useLocation, useNavigate} from "react-router-dom";
import Background from '../../assets/images/login/AdobeStock_239406450.jpeg'
import {loginValidation} from "../../validations/validationSchema";
import useAuth from "../../hooks/useAuth";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Input} from "@mui/material";
import InputComponent from "../InputComponent";

const Login = () => {

    const {auth, setAuth} = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const [formErrors, setFormErrors] = useState('');

    const {data, mutate, isError, isLoading} = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {

        },
        onError: (error) => {
            if (error.response.status === 403) {
                setFormErrors("Something went wrong")
            } else if (error.response.status === 401) {
                setFormErrors("Unauthorized")
                console.log('Unauthorized')
            } else if (error.response.status === 400) {
                setFormErrors("Wrong credentials")
                console.log('Wrong credentials')
            }
        }
    });


    const onSubmit = () => {
        mutate({
            email: values.email,
            password: values.password
        })
        const user = values.email
        const password = values.password
        const accessToken = data.token
        const decodedToken = jwtDecode(data.token)
        const role = decodedToken.iss.replace("[", "").replace("]", "")
        const roles = [role]
        setAuth({user, password, roles, accessToken})
        isAuth()
    }

    const isAuth = () => {
        if (!auth) {
            console.log('Loading')
        }
        return navigate(from, {replace: true})
    };

    const {values, handleSubmit, handleChange, handleBlur, errors, touched} = useFormik({
        initialValues: {
            email: "",
            password: ""
        }, onSubmit,
        validationSchema: loginValidation
    })

    return (
        <div className='login-container'>
            <form className="form_user-login" onSubmit={handleSubmit}>
                <h6>Login to continue</h6>

                {isError && <p className="error-text bg-danger w-100 p-2">{formErrors}</p>}
                <div>
                    <InputComponent
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name="email"*/}
                    {/*    value={values.email}*/}
                    {/*    placeholder="Email"*/}
                    {/*    autoComplete="none"*/}
                    {/*    onChange={handleChange}*/}
                    {/*    onBlur={handleBlur}*/}
                    {/*/>*/}
                    {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : <></>}
                </div>
                <div>
                    <InputComponent
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    {/*<input*/}
                    {/*    type="password"*/}
                    {/*    name="password"*/}
                    {/*    placeholder="Password"*/}
                    {/*    value={values.password}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    onBlur={handleBlur}*/}

                    {/*/>*/}
                    {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : <></>}

                </div>
                <div className="form-user-details">
                    <p className="forgot-password"></p>
                    <input type="checkbox" className="remember-me"/>
                </div>
                <button className="login-submitButton" type={"submit"}>{isLoading ? <Spinner/> : "Login"}</button>

                <div className="flex-row">
                    <FontAwesomeIcon id="ic-facebook" icon={faFacebook}/>
                    <FontAwesomeIcon id="ic-google" icon={faGoogle}/>
                </div>
            </form>

            <div className="right-columnContainer">
                <img src={Background} alt="login background"/>
            </div>

        </div>
    );
};

export default Login;
