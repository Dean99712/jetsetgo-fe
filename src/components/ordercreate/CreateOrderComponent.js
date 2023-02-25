import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import Passenger from "../passenger/Passenger";
import '../../styles/CreateOrder.scss'
import {useFormik} from "formik";
import InputComponent from "../InputComponent";
import {passengersValidations} from "../../validations/validationSchema";
import {useMutation} from "@tanstack/react-query";
import {createOrder} from "../../services/OrderCreateService";

const CreateOrder = () => {

        const location = useLocation();

        const fare = location.state.fare

        const passengerArray = location.state.passengers;
        const [passengers, setPassengers] = useState(passengerArray);

        const services = [];
        const payments = [{
            type: "balance",
            currency: "USD",
            amount: fare.total_amount
        }];

        const selected_offers = [fare.id]
        const type = "instant"

        const {data, mutate} = useMutation({
            mutationFn: createOrder
        })

        const onSubmit = () => {

            mutate({
                type,
                services,
                selected_offers: [fare.id],
                payments,
                passengers: values.passengers
            })
        }

        const {values, handleChange, handleSubmit, errors, handleBlur, touched} = useFormik({
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

                            <div className="contact-details-container">
                                <h6>Contact details</h6>
                                <div className="details-container">

                                    <div className="form-item">
                                        <InputComponent
                                            type={"text"}
                                            name={`passengers.[0].email`}
                                            value={values.passengers.email}
                                            onChange={handleChange}
                                            placeholder="email"
                                            handleBlur={handleBlur}
                                        />
                                        {errors.passengers?.[0]?.email ?
                                            <p className="text-danger">{errors.passengers?.[0]?.email}</p> : <></>}
                                    </div>

                                    <div className="form-item">
                                        <InputComponent
                                            type={"text"}
                                            name={`passengers.[0].phone_number`}
                                            value={values.passengers.phone_number}
                                            onChange={handleChange}
                                            placeholder="+000-000-0000-00"
                                        />

                                        {errors.passengers?.[0]?.phone_number ?
                                            <p className="text-danger">{errors.passengers?.[0]?.phone_number}</p> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className="passengers-container">
                                <Passenger
                                    passengers={passengers}
                                    formik={{values, handleChange, handleSubmit, errors, touched, handleBlur}}
                                />
                            </div>

                            <div id="flight-summery" style={{
                                background: "white"
                            }}>
                            </div>
                            <div id="flight-summery">
                            </div>
                            <button className="btn btn-dark text-white" id="submit-button" type={"submit"}>Submit Order</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
;

export default CreateOrder;