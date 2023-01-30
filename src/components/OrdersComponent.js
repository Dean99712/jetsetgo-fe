import React, {useEffect, useState} from 'react';
import "../styles/OrdersComponent.scss"
import {Link} from "react-router-dom";
import OffersService from "../services/OffersService";

const OrdersComponent = () => {

    const [dataItems, setUsers] = useState([]);

    useEffect(() => {

    return () => {

        OffersService.getAllOffers()
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.log(error))
    };

    },[]);

    return (
        <div>
            <div className="container-lg w-100 h-75 orders-container">
                <div className="container mt-5 m-auto d-flex justify-content-center justify-content-lg-around">
                    <Link to='/book_flight' className='btn btn-outline-dark w-25 h-25'>Book a Flight</Link>
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
                            dataItems.map(
                                data =>
                                    <tr key={data.id}>
                                        <td className="fw-semibold">{data.id}</td>
                                        <td>{data.cabin_class}</td>
                                        <td><span
                                            className="fw-bold">{data.slices[0].origin.iata_city_code}</span>, {data.slices[0].origin.name}
                                        </td>
                                        <td><span
                                            className="fw-bold">{data.slices[0].destination.iata_city_code}</span>, {data.slices[0].destination.name}
                                        </td>
                                        <td className="fw-bold">{data.slices[0].created_at.slice(0, 10)}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
        ;
}
export default OrdersComponent;
