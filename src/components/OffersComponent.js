import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import OfferCard from "./OfferCard";

const OffersComponent = () => {

    const location = useLocation();
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [slices, setSlices] = useState([])
    const [passengers, setPassengers] = useState([])
    const [segments, setSegments] = useState([])
    const [segmentPassenger, setSegmentPassenger] = useState([])

    const offerId = location.state.id;

    // const orqId = location.state.id

    function fetchOffersHandler() {
        fetch(`http://localhost:8080/api/offers/getOfferById/${offerId}`)
            .then((response) => response.json())
            .then((data) => {
                const transferredData = data.data.map(offer => {
                    return {
                        id: offer.id,
                        conditions: offer.conditions,
                        base_amount: offer.base_amount,
                        passengers: [offer.passengers],
                        slices: [offer.slices],
                        tax_amount: offer.tax_amount,
                        total_amount: offer.total_amount
                    }
                })
                setOffers(transferredData)
                console.log(offers)
            });
    }

    return (
        <div>
            <div>
                <h2 className="text-center mt-4">List of offers</h2>
                <div className="container mt-3">
                    {offers.map(offer => (
                        <span key={offer.id}>
                            {<OfferCard
                                // key={offer.id}
                                id={offer.id}
                                conditions={offer.conditions}
                                baseAmount={offer.base_amount}
                                passengers={offer.passengers}
                                slices={offer.slices}
                                taxAmount={offer.tax_amount}
                                totalAmount={offer.total_amount}
                            />}
                        </span>
                    ))}
                    <button className='btn btn-outline-primary' onClick={fetchOffersHandler}>Press me</button>
                </div>
            </div>
        </div>
    );

};

export default OffersComponent;
