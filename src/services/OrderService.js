import axios from "../api/axios";

const ORDERS_BASE_URL = '/orders'
const CREATE_ORDER_URL = `${ORDERS_BASE_URL}/create_order`
const CANCEL_ORDER_URL = `${ORDERS_BASE_URL}/cancel_order`
const DELETE_ORDER_URL = `${ORDERS_BASE_URL}/delete_order`


export const createOrder = (data) => {
    return axios.post(CREATE_ORDER_URL, {data}, {
        params: {
            email: data.email
        }
    }).then(res => res.data)
}

export const cancelUserOrder = data => {
    return axios.post(CANCEL_ORDER_URL, {data})
        .then(res => res.data)
}

export const deleteUserOrder = data => {
    return axios.delete(DELETE_ORDER_URL, {data})
        .then(res => res.data)
}