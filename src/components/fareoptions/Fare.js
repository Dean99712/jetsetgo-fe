import React from 'react';
import './Fare.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBills, faSuitcaseRolling, faTicket, faWeightScale} from "@fortawesome/free-solid-svg-icons";

const Fare = ({fare, convertCurrency, selected}) => {

    const {setSelected} = selected;

    const {
        conditions: {
            change_before_departure,
            refund_before_departure
        },
        total_emissions_kg,
        total_amount,
        slices: [{
            fare_brand_name,
            segments: [{
                passengers: [{
                    cabin_class_marketing_name,
                    baggages: [{
                        quantity,
                        type
                    }]
                }]
            }]
        }]
    } = fare

    return (
        <div className="fare" onClick={() => setSelected({fare})}>
            <div className="fare-top">
                <h5>{fare_brand_name}</h5>
                <h6>{cabin_class_marketing_name}</h6>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faTicket}/>
                        {!change_before_departure ? <p>Not Changeable</p> :
                            <p>Changeable ({convertCurrency(change_before_departure.penalty_amount)}) fee</p>}
                    </li>

                    <li>
                        <FontAwesomeIcon icon={faMoneyBills}/>
                        {!refund_before_departure ? <p>Not Refundable</p> :
                            <p>Refundable ({convertCurrency(refund_before_departure.penalty_amount)}) fee</p>}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faWeightScale}/>
                        {total_emissions_kg}kg
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faSuitcaseRolling}/>
                        includes {quantity} {type} bag
                    </li>
                </ul>
            </div>
            <div className="fare-bottom">
                <p>total amount from</p><h6>{convertCurrency(total_amount)}</h6>
            </div>
        </div>
    );
};

export default Fare;