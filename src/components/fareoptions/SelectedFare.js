import React from 'react';
import '../fareoptions/SelectedFare.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faMoneyBills,
    faSuitcaseRolling,
    faTicket,
    faWeightScale
} from "@fortawesome/free-solid-svg-icons";
import {Spinner} from "react-bootstrap";

const SelectedFare = ({selected, navigateToCreateOrder, convertCurrency, fareDetails, loading,}) => {

    const fare = selected?.fare
    const {isLoading, setIsLoading} = loading;

    const renderSelectedOption = (fare) => {
        if (fare != null) {
            const {
                conditions: {change_before_departure, refund_before_departure},
                total_emissions_kg,
                slices: [{
                    segments: [{
                        passengers: [{
                            baggages: [{quantity, type}]
                        }]
                    }]
                }]
            } = fare;

            return (fare ?
                <div>
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
                        <p>{total_emissions_kg}kg</p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faSuitcaseRolling}/>
                        <p>includes {quantity} {type} bag</p>
                    </li>
                </ul>
            </div>
                :
                <p>Select an Offer</p>)
        }}

    return (
        <div className="selected-fare_summary">
            <div className="fare-summary_top">
                <h6>Summary</h6>
                <div className="fare-summary_owner">
                    <div>
                        <img src={fareDetails?.logo_symbol_url} alt=""/>
                        <p>operated by {fareDetails?.name}</p>
                    </div>
                </div>
                {renderSelectedOption(fare)}
            </div>

            <div className="fare-summary_bottom">
                <h6>total amount </h6>
                <h5>{fare && convertCurrency(fare?.total_amount)}</h5>
                <button disabled={!fare} onClick={() => navigateToCreateOrder(fare)} className="text-capitalize">
                    {isLoading ? <Spinner/> : "go to checkout"} <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
        </div>
    );
};

export default SelectedFare;
