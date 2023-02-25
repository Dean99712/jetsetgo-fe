import React from 'react';
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

const CreateOrder = () => {

    const {auth} = useAuth();
    const {flight} = useFlight()

    const {passengers, fare} = flight;
    const {id, total_amount} = fare;
    const navigate = useNavigate()
    const payments = [{
        type: "balance",
        currency: "USD",
        amount: total_amount
    }];

    const onSubmit = async () => {
        mutate({
            type: "instant",
            services: [],
            selected_offers: [id],
            payments,
            passengers: values.passengers,
            email: auth?.user?.email
        });

        if (error.response.status === 500) {
            console.log('ERROR 500')
        } else if (error.response.status === 401) {
            console.log('ERROR 401')
        }

        notification('Success!', 'Order has been created successfully!', 'success')
        return navigate('orderSummary', {replace: true})
    }

    const {data, mutate, isLoading, isSuccess, isError, error} = useMutation({
        mutationFn: createOrder
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
                        {/*{isError ? <div className="errors"><h6>{apiErrors}</h6></div> : null}*/}
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
                        <button type={"submit"}>Create order</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;