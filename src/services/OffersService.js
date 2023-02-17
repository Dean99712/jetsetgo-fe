import axios from "axios";

const OFFERS_BASE_URL = 'http://localhost:8080/api/offers'
const GET_OFFERS_BY_ID_URL = `${OFFERS_BASE_URL}/getOfferById/`

class OffersService {

    getAllOffers() {
        return axios.get(OFFERS_BASE_URL)
    }
    getOfferById(id) {
        return axios.get(`${GET_OFFERS_BY_ID_URL}${id}`, {
            params:{
                sort: 'total_amount'
            }
        })
            .then(res => res.data)
    }
}
export default new OffersService()