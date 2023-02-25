import axios from "../api/axios";

const ORDERS_BASE_URL = '/orders'
const CREATE_ORDER_URL = `${ORDERS_BASE_URL}/create_order`


export const createOrder = data => {
    return axios.post(CREATE_ORDER_URL, {data})
        .then(res => res.data)
}
