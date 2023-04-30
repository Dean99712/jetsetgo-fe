import axios from "../api/axios";

export const GET_USER_BY_EMAIL_URL = '/user/getUserByEmail';
const UPDATE_USER_URL = '/user/updateUser';
const GET_USER_PROFILE = '/user/getUserProfile';

export const updateUser = async (data) => {
    return await axios.patch(`${UPDATE_USER_URL}/${data.email}`, data
    )
        .then(res => res.data)
}

export const getUserProfile = async (data) => {
    return await axios.get(GET_USER_PROFILE, {
        params: {
            email: data.email
        },
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    })
};