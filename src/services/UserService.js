import axios from "../api/axios";

const USER_URL = '/user/getAllUsers';
export const GET_USER_BY_EMAIL_URL = '/user/getUserByEmail';
const UPDATE_USER_URL = '/user/updateUser';

export const getAllUsers = async () => {
    return await axios.get(`${USER_URL}`)
        .then(res => res.data)
}

export const getUserByEmail = async (data) => {
    return await axios.get(`${GET_USER_BY_EMAIL_URL}/${data.email}`, {
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    })
        .then(res => res.data)
}

export const updateUser = async (data) => {
    return await axios.patch(`${UPDATE_USER_URL}/${data.email}`, data)
        .then(res => res.data)
}