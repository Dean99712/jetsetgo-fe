import axios from "../api/axios";

export const LOGIN_URL = '/auth/authenticate'
const REGISTER_URL = '/auth/register'

export function loginUser(data) {
    return axios.post(LOGIN_URL, data)
            .then(res => res.data)
}

export function register(data) {
    return axios.post(REGISTER_URL, data)
        .then(res => res.data)
}