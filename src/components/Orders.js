import React, {useState} from 'react';
import "../styles/Orders.scss"
import {Link} from "react-router-dom";
import {getAllOffers} from "../services/OfferRequestService";
import {useQuery} from "@tanstack/react-query";


const Orders = () => {

    const [orders, setOrders] = useState([]);

    useQuery({
        queryFn: getAllOffers,
        queryKey: ["orders"],
        onSuccess: setOrders
    })

    return (
        <div>
            <div className="container-lg w-100 h-75 orders-container">
                <div className="container mt-5 m-auto d-flex justify-content-start justify-content-around">
                    <Link to='/' className='btn btn-outline-dark w-25 h-25'>Book a Flight</Link>
                </div>
                <div className="container mt-3">
                    <table className="table table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>Order_id</th>
                            <th>Class</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Created At</th>
                        </tr>
                        </thead>
                        <tbody>{
                            orders?.map(order => (
                                <tr key={order.id}>
                                    <td className="fw-semibold">{order?.id}</td>
                                    <td className="fw-semibold">{order?.cabin_class}</td>
                                    <td><span
                                        className="fw-bold">{order.slices[0]?.origin?.iata_city_code}</span>, {order?.slices[0]?.origin.name}
                                    </td>
                                    <td><span
                                        className="fw-bold">{order?.slices[0]?.destination?.iata_city_code}</span>, {order?.slices[0]?.destination.name}
                                    </td>
                                    <td className="fw-bold">{order?.created_at.slice(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Orders;
