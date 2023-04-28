import axios from "../api/axios";

const GET_OFFER_BY_ID = '/offers/getOfferById'
export const CREATE_OFFER_URL = `/offer_request/createOffer`
const GET_OFFERS_URL = `/offers`

export const createRequest = (data) => {
    return axios.post(CREATE_OFFER_URL, data)
}

export const getAllOffers = () => {
    return axios.get(GET_OFFERS_URL)
        .then(res => res.data)
}

export const getOfferById = async (data) => {
    return await axios.get(GET_OFFER_BY_ID, {
        params: {
            offer_request_id: data.id,
            sort: data.sort,
            limit: data.limit,
            max_connections: data.maxConnections
        }
    })
};
