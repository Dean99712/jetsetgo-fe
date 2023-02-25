import axios from "../api/axios";

const CREATE_OFFER_URL = `/offer_request/createOffer`
const GET_OFFERS_URL = `/offers`

   export const createOfferRequest = (dataItem) => {
        return axios.post(CREATE_OFFER_URL, dataItem
        )
    }

export const getAllOffers = () => {
    return axios.get(GET_OFFERS_URL)
        .then(res => res.data)
}
