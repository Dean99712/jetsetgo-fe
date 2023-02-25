import React, {useState} from 'react';
import '../../styles/login/Login.scss'
import {LOGIN_URL, loginUser} from "../../services/AuthService";
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

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const {setAuth} = useAuth()
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [apiErrors, setApiErrors] = useState('');

    const postLogin = async () => {
        setIsLoading(true)
        const response = await axios.post(LOGIN_URL, {
            email: values.email,
            password: values.password
        })
        if (response.status === 200) {
            await getUserByEmail(response.data?.token)
            console.log("Status 200");
            setApiErrors('')
            setIsError(false)
            setIsLoading(false)
        } else if (response.status === 401) {
            setIsError(true)
            setApiErrors('Wrong username or password')
            setIsLoading(false)
        } else if (response.status === 400) {
            setApiErrors('Bad request');
            setIsError(true);
            setIsLoading(false)
        }else if (response.status === 500) {
            setIsError(true);
            setIsLoading(false)
            setApiErrors('Oops... Something went wrong!');
        }
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
        if (response.status === 200) {
            const accessToken = token;
            const user = response.data
            const role = response.data?.role;
            const roles = [role]
            setAuth({user, roles, accessToken});
            window.localStorage.setItem('accessToken', token);
            setIsLoading(false);
            navigate(from, {replace: true})
            notification("Success!", "Login Successfully!", "success", true, 1500);
        } else if (response.status === 401) {
            setApiErrors('Unauthorized!')
            setIsError(true)
            setIsLoading(false);
        } else if (response.status === 400) {
            setApiErrors('Bad request');
            setIsError(true);
            setIsLoading(false);
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
                {isError && <p className="error-text">{apiErrors}</p>}
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
                <div className="form-user-details">
                    <input type="checkbox" className="remember-me"/>
                    <label className="remember-user ">remember me</label>
                </div>
                <button type={"submit"} disabled={isLoading} className="login-submitButton">{
                    isLoading
                        ? <CircularProgress/>
                        :
                        'Login'
                }</button>

                <div className="flex-row login-options">
                    <FontAwesomeIcon id="ic-facebook" icon={faFacebook}/>
                    <img src={GoogleSvg} alt="google"/>
                </div>
            </form>
            <div className="right-columnContainer">
                <img src={Background} alt="login background"/>
            </div>
        </div>
    );
};


export default Login;

