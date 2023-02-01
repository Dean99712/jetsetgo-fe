import React, {useEffect, useState} from 'react';
import '../styles/OffersComponent.scss'
import {useLocation} from "react-router-dom";
import OfferCard from "./OfferCard";

const OffersComponent = () => {

    const location = useLocation();
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const offerId = location.state.id;

    useEffect(() => {

        fetchOffersHandler();
    }, []);

    async function fetchOffersHandler() {

        setIsLoading(true);

        const response = await fetch(`http://localhost:8080/api/offers/getOfferById/${offerId}`)
        const data = await response.json()
        const transferredData = data.data.map(offer => {
            return {
                id: offer.id,
                conditions: offer.conditions,
                base_amount: offer.base_amount,
                passengers: offer.passengers,
                slices: offer.slices,
                tax_amount: offer.tax_amount,
                total_amount: offer.total_amount,
                base_currency: offer.base_currency,
                owner: offer.owner
            }
        })
        setOffers(transferredData);
        setIsLoading(false);
    }

    return (
        <div>
            <div className="offers-container">
                <div className="container mt-3">
                    {offers.map(offer => (
                        <span key={offer.id}>
                            <OfferCard
                                id={offer.id}
                                conditions={offer.conditions}
                                baseAmount={offer.base_amount}
                                passengers={offer.passengers}
                                slices={offer.slices}
                                taxAmount={offer.tax_amount}
                                totalAmount={offer.total_amount}
                                baseCurrency={offer.base_currency}
                            />
                         </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OffersComponent;
