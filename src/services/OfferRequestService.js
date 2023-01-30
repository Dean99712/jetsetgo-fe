import axios from "axios";

const OFFERS_BASE_URL = 'http://localhost:8080/api/offer_request'
const CREATE_OFFER_URL = `${OFFERS_BASE_URL}/createOffer`
const GET_OFFERS_URL = `${OFFERS_BASE_URL}/offers`

class OfferRequestService {

    createOfferRequest(dataItem) {
        return axios.post(CREATE_OFFER_URL, dataItem
        )
    }
}

export default new OfferRequestService();