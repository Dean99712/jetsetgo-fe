import axios from "../api/axios";
const SUGGESTION_URL = '/city/suggestions'


export const citySuggestion = data => {
    return axios.get(SUGGESTION_URL,{params: data} )
        .then(res => res.data)
        .catch(e => e)
}