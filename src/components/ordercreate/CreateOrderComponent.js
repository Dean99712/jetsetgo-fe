import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Passenger from "../passenger/Passenger";
import '../../styles/CreateOrderComponent.scss'
import {useFormik} from "formik";

const CreateOrder = () => {

        const location = useLocation();

        const passenger = location.state.passengers;

        const [passengers, setPassengers] = useState(passenger);

        const [index, setIndex] = useState(0);

        // const createOrder = useMutation({
        //     mutationFn: OrderCreateService.getOfferById
        // })

    useEffect(() => {

        passengers.map((passenger, index) => {

            if (passenger.type === "infant_without_seat") {

            } else if (passenger.type === "adult") {
                return {...passenger, "infant_passenger_id": passenger.id}
            }
            setPassengers(passengers)
        })

    }, [])
        const formik = useFormik({

            initialValues: {
                passengers
            }, onSubmit: values => {
                console.log(values)
                // createOrder.mutate(values);
            }
        })

        console.log(formik.values)

        return (
            <div className="createOrder-containerAll">
                <div className='flight-order-summery--container'>
                    <div className="inner-summery-container">
                        <form onSubmit={formik.onSubmit}>
                            <div className="contact-details-container">
                                <h6>Contact details</h6>
                                <div className="details-container">

                                    <div className="contact-details">
                                        {/*<FontAwesomeIcon icon={faEnvelope}/>*/}
                                        <label className="fw-semibold">Email</label>
                                        <input
                                            type="text"
                                            name={`passengers.${[index]}.email`}
                                            value={formik.values.passengers.email}
                                            onChange={formik.handleChange}
                                            autoComplete={"false"}
                                        />
                                    </div>
                                    <div className="contact-details">
                                        <label className="fw-semibold">Phone number</label>
                                        <input type="number"
                                               name="phone_number"
                                               placeholder="+000-000-0000-00"
                                               value={formik.values.passengers.phone_number}
                                               onChange={formik.handleChange}
                                               autoComplete={"false"}
                                               maxLength={10}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="passengers-container">
                                <Passenger
                                    passengers={passengers}
                                    formik={formik}
                                />
                            </div>

                            <div id="flight-summery" style={{
                                background: "white"
                            }}>
                            </div>
                            <div id="flight-summery" style={{
                                background: "white"
                            }}>
                            </div>
                            <button className="btn btn-dark text-white" id="submit-button" type={"submit"}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
;

export default CreateOrder;