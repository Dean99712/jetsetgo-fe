import React from 'react';
import '../../styles/OrderSummary.scss'
import BoardingPass from "./BoardingPass";


const OrderSummary = (props) => {


    return (
        <div className="orderSummary">
            <div className="orderSummary-container">


                <div className="summary passengers-summary">

                    <div className="summary-top">
                        <h6>passenger/s summary</h6>

                    </div>
                    <div className="summary-bottom">

                    </div>
                </div>


                <div className="summary order-summary">

                    <div className="summary-top">
                        <h6>order summary</h6>


                    </div>
                    <div className="summary-bottom">

                    </div>
                </div>

                <BoardingPass/>

                <div className="summary payment-summary">

                    <div className="summary-top">
                        <h6>payment summary</h6>

                    </div>
                    <div className="summary-bottom">

                    </div>
                </div>
                {/*Boarding pass*/}

            </div>

        </div>
    );
};

export default OrderSummary;
