import axios from "axios";

const ORDERS_BASE_URL = 'http://localhost:8080/api/orders'
const CREATE_ORDER_URL = `${ORDERS_BASE_URL}/create_order`

class OrderCreateService {

    getOfferById(data) {
        return axios.post(CREATE_ORDER_URL, {
            data
        })
            .then(res => res.data)
    }
}

export default new OrderCreateService()