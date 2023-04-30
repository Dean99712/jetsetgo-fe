import React, {useState} from 'react';
import '../../styles/login/Login.scss'
import {LOGIN_URL} from "../../services/AuthService";
import {useLocation, useNavigate} from "react-router-dom";
import Background from '../../assets/images/login/AdobeStock_239406450.jpeg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import InputComponent from "../InputComponent";
import GoogleSvg from '../../assets/svg/GoogleSvg.svg'
import {GET_USER_BY_EMAIL_URL} from "../../services/UserService";
import {CircularProgress} from "@mui/material";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {notification} from "../../App";
import {useFormik} from "formik";
import {loginValidation} from "../../validations/validationSchema";
import useUser from "../../hooks/useUser";

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const {setAuth} = useAuth()
    const {setUser} = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [serverErrors, setServerErrors] = useState('');

    const postLogin = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(LOGIN_URL, {
                email: values.email,
                password: values.password
            })
            await getUserByEmail(response.data?.token)
            setServerErrors(null);
            setIsError(false);
            setIsLoading(false);
        } catch (error) {
            if (error.response.status === 401) {
                setIsError(true);
                setIsLoading(false);
                setServerErrors("Wrong username or password")
            }
            if (error.response.status === 400) {
                setIsError(true);
                setIsLoading(false);
                setServerErrors("Bad Request")
            }
            if (error.response.status === 500) {
                setIsError(true);
                setIsLoading(false);
                setServerErrors("Something went wrong...")
            }
        }
        setIsLoading(false);
    }

    const {values, errors, handleChange, handleBlur, touched} = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema: loginValidation
    })

    const getUserByEmail = async (token) => {
        const response = await axios.get(`${GET_USER_BY_EMAIL_URL}/${values.email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        try {
            const accessToken = token;
            const email = response.data?.email;
            const user = response.data;
            const role = response.data?.role;
            const roles = [role];
            setUser({user})
            setAuth({email, roles, accessToken});
            window.localStorage.setItem('accessToken', token);
            setIsError(false)
            setIsLoading(false);
            notification("Success!", "Login Successfully!", "success", true, 1500);
            navigate(from, {replace: true});
        } catch (error) {

            if (error.response.status === 401) {
                setServerErrors('Unauthorized!')
                setIsError(true)
                setIsLoading(false);
            } else if (error.response.status === 400) {
                setServerErrors('Bad request');
                setIsError(true);
                setIsLoading(false);
            } else if (error.response.status === 500) {
                setServerErrors('Something went wrong... ' +
                    'please try again later');
                setIsError(true);
                setIsLoading(false);
            }
        }
        setIsLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postLogin();
    }

    return (
        <div className='login-container'>
            <form className="form_user-login" onSubmit={handleSubmit}>
                <h6>Login to continue</h6>
                {isError ? <p className="error-text">{serverErrors}</p> : null}
                <div>
                    <InputComponent
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {(errors.email && touched.email) && <p className="text-danger">{errors.email}</p>}

                </div>
                <div>
                    <InputComponent
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : null}
                </div>
                {/*<div className="form-user-details">*/}
                {/*    <input type="checkbox" className="remember-me"/>*/}
                {/*    <label className="remember-user ">remember me</label>*/}
                {/*</div>*/}
                <button type={"submit"} disabled={isLoading} className="login-submitButton">{
                    isLoading
                        ? <CircularProgress sx={{color: "#FFFFFF"}}/>
                        :
                        'Login'
                }</button>

                {/*<div className="flex-row login-options">*/}
                {/*    <FontAwesomeIcon id="ic-facebook" icon={faFacebook}/>*/}
                {/*    <img src={GoogleSvg} alt="google"/>*/}
                {/*</div>*/}
            </form>
            <div className="right-columnContainer"/>
        </div>
    );
};


export default Login;

