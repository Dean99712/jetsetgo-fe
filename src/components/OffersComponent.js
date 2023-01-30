import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import OfferCard from "./OfferCard";
import OffersService from "../services/OffersService";

const OffersComponent = () => {

    const location = useLocation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const orqId = location.state.id

    useEffect(() => {
        OffersService.getOfferById(orqId)
            .then((response) => {
                setData(response.data);
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div>
                <h2 className="text-center mt-4">List of offers</h2>
                <div className="container mt-3">
                    {data.map(offer => (
                        offer.slices.map(slice => (
                            slice.segments.map(segment => (
                                segment.passengers.map(passenger => (
                                    <OfferCard
                                        // slices={slices}
                                        key={offer.id}
                                        id={offer.id}
                                        origin={slice.origin}
                                        destination={slice.destination}
                                        arrivingAt={segment.arriving_at}
                                        departingAt={segment.departing_at}
                                        cabinClass={passenger.cabin_class}
                                        flightNumber={segment.marketing_carrier_flight_number}
                                        duration={segment.duration}
                                        passengerId={passenger.id}
                                    />
                                ))
                            ))
                        ))
                    ))

                    }
                </div>
            </div>
        </div>
    );

};

export default OffersComponent;
