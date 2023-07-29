import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/CreateOrder.scss'
import {useFormik} from "formik";
import InputComponent from "../InputComponent";
import {passengersValidations} from "../../validations/validationSchema";
import {useMutation} from "@tanstack/react-query";
import {createOrder} from "../../services/OrderService";
import useAuth from "../../hooks/useAuth";
import {notification} from "../../App";
import useFlight from "../../hooks/useFlight";
import StepperComponent from "../StepperComponent";
import {CircularProgress} from "@mui/material";
import useUser from "../../hooks/useUser";

const CreateOrder = () => {

    const {auth} = useAuth();
    const {user: currentUser} = useUser();
    const {flight} = useFlight();

    const token = auth?.accessToken;
    const user = currentUser?.user
    const {passengers, fare} = flight;
    const {id, total_amount} = fare;
    const [isLoading, setIsLoading] = useState(false);

    const [serverErrors, setServerErrors] = useState('');

    const navigate = useNavigate()
    const payments = [{
        type: "balance",
        currency: "USD",
        amount: total_amount
    }];

    const onSubmit = async () => {
        setIsLoading(true)
        mutate({
            type: "instant",
            services: [],
            selected_offers: [id],
            payments,
            passengers: values.passengers,
            email: user?.email,
            token: token
        });
    }

    const {mutate, isError} = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            if (data !== null) {
                setIsLoading(false)
                const order = data?.data
                notification("Success!", "Order has been successfully created", "success");
                navigate("/orderSummary", {state: {order}});
            }
        },
        onError: (error) => {
            switch (error.response.status) {
                case 401:
                    setIsLoading(false)
                    return setServerErrors("Unauthorized")
                case 400:
                    setIsLoading(false)
                    return setServerErrors("Bad request");
                case 500:
                    setIsLoading(false)
                    return setServerErrors("Something went wrong... please try again later");
                default:
                    return
            }
        }
    })

    const {values, handleChange, handleSubmit, errors, handleBlur, touched, handleReset} = useFormik({
        initialValues: {
            passengers
        }, onSubmit,
        validationSchema: passengersValidations
    })

    return (
        <div className="createOrder-containerAll">
            <div className='flight-order-summery--container'>
                <div className="inner-summery-container">
                    <form onSubmit={handleSubmit}>
                        {isError ? <div className="error-text"><h6>{serverErrors}</h6></div> : null}
                        <div className="passengers-container">
                            <StepperComponent
                                formik={{
                                    values,
                                    handleChange,
                                    handleSubmit,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleReset
                                }}
                                steps={passengers}>
                            </StepperComponent>

                        </div>
                        <div className="contact-details-container">
                            <h6>Contact details</h6>
                            <div className="details-container">

                                <div className="form-item">
                                    <InputComponent
                                        type={"text"}
                                        name={`passengers.[0].email`}
                                        value={values.passengers.email}
                                        onChange={handleChange}
                                        placeholder={"email"}
                                        handleBlur={handleBlur}
                                    />
                                    {(errors.passengers?.[0]?.email && touched.passengers?.[0].email)
                                        &&
                                        <p className="text-danger error-message">{errors.passengers?.[0]?.email}</p>
                                    }
                                </div>

                                <div className="form-item">
                                    <InputComponent
                                        type={"text"}
                                        name={`passengers.[0].phone_number`}
                                        value={values.passengers.phone_number}
                                        onChange={handleChange}
                                        handleBlur={handleBlur}
                                        placeholder="+000-000-0000-00"
                                    />

                                    {(errors.passengers?.[0]?.phone_number && touched.passengers?.[0]?.phone_number)
                                        &&
                                        <p className="text-danger error-message">{errors.passengers?.[0]?.phone_number}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <button id="submit-button" disabled={isLoading} type={"submit"}>{isLoading ?
                            <CircularProgress sx={{
                                color: "#FFFFFF"
                            }}/> : "Create order"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;