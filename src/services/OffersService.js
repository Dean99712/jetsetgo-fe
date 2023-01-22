import axios from "axios";

const OFFERS_BASE_URL = 'http://localhost:8080/api/offers'
const GET_OFFERS_URL = `${OFFERS_BASE_URL}/offers`

class OffersService {

    getOfferById(id) {
        return axios.get(GET_OFFERS_URL, id)
    }
}
export default new OffersService()