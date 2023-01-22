import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";

const OffersComponent = () => {

    const location = useLocation();
    const [data, setData] = useState([]);

    const orqId = location.state.id

    useEffect(() => {
        try {
            fetch('http://localhost:8080/api/offers/offer?offer_request_id=' + orqId, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    setData(data.data.offers);
                    console.log(data.data.offers);
                })
        } catch (e) {
            console.log(e)
        }

    }, []);

    return (
        <div>
            <h2 className="text-center mt-4">List of offers</h2>
            <div className="container mt-3">
                <table className="table table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>offer_id</th>
                        <th>total_amount</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Duration</th>
                    </tr>
                    </thead>
                    <tbody>{
                        data.map(
                            offer =>
                                <tr key={offer.id}>
                                    <td className="fw-semibold">{offer.id}</td>
                                    <td className={"fw-bold"}>{offer.total_amount} <span
                                        className="fw-semibold">{offer.total_currency}</span></td>
                                    <td className="fw-bold">{offer.slices.map(slice =>
                                        <span><FontAwesomeIcon icon={faPlaneDeparture}/>
                                            <td>{slice.origin.iata_code}, <div
                                                className="fw-semibold">{slice.origin.city_name}</div></td>
                                        </span>
                                    )}
                                    </td>
                                    <td className="fw-bold">{offer.slices.map(slice =>
                                        <span>

                                            <td>{slice.destination.iata_code},
                                                <FontAwesomeIcon className="px-3"
                                                                 icon={faPlaneArrival}/>
                                                <div
                                                    className="fw-semibold">{slice.destination.city_name}</div>
                                            </td></span>
                                    )}</td>
                                    <td>{offer.slices.map(slice =>
                                        <td className="fw-semibold">{slice.duration.slice(2,-1).toLowerCase()}</td>
                                    )}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OffersComponent;
