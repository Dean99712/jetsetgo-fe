import React from 'react';
import '../../styles/OrderSummary.scss'
import BoardingPass from "./BoardingPass";
import {Link, useLocation} from "react-router-dom";
import {convertCurrency} from "../flights/Flights";
import useUser from "../../hooks/useUser";


const OrderSummary = () => {

    const location = useLocation()

    const {order} = location.state
    const {user: currentUser} = useUser()
    const user = currentUser?.user

    const passengers = order?.passengers[0]

    return (
        <div className="orderSummary">

            <div className="orderSummary-container">
                <div className="summary passengers-summary">

                    <div className="summary-top">
                        <h6>Contact details</h6>
                    </div>
                    <div className="summary-bottom summary-contact">
                        <div className="passenger-name_details">
                            <span className="summary_passenger-details">
                            <p className="summary_passenger-title">first name</p>
                            <p className="summary_passenger-text">{passengers.given_name}</p>
                        </span>
                            <span className="summary_passenger-details">
                            <p className="summary_passenger-title">last name</p>
                            <p className="summary_passenger-text">{passengers.family_name}</p>
                        </span>
                        </div>
                        <span className="summary_passenger-details">
                            <p className="summary_passenger-title">email</p>
                            <p className="summary_passenger-text">{passengers.email}</p>
                        </span>
                        <span className="summary_passenger-details">
                            <p className="summary_passenger-title">phone number</p>
                            <p className="summary_passenger-text">{passengers.phone_number}</p>
                        </span>
                    </div>
                </div>


                <div className="summary order-summary">

                    <div className="summary-top">
                        <h6>order summary</h6>
                    </div>
                    <div className="summary-bottom">
                        <div className="summary_order-details">
                            <h6 className="text-capitalize">booking reference</h6>
                            <h6>{order?.booking_reference}</h6>
                        </div>
                    </div>
                </div>

                <BoardingPass
                    order={order}
                />

                <div className="summary payment-summary">

                    <div className="summary-top">
                        <h6>Payment Summary</h6>
                    </div>
                    <div className="summary-bottom">
                        <span className="payment">
                            <p className="title">base amount</p>
                            <p className="price">{convertCurrency(order?.base_amount)}</p>
                        </span>
                        <span className="payment">
                            <p className="title">tax amount</p>
                            <p className="price">{convertCurrency(order?.tax_amount)}</p>
                        </span>

                        <span className="payment">
                            <p className="title">total amount</p>
                            <p className="price">{convertCurrency(order?.total_amount)}</p>
                        </span>
                        <Link className="to-orders_button" to={`/user/${user?.user_id}/orders`}>Your orders</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderSummary;
