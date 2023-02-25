import axios from "../api/axios";

const LOGIN_URL = '/auth/authenticate'

export function loginUser(data) {
    return axios.post(LOGIN_URL, data)
        .then(res => res.data)
}