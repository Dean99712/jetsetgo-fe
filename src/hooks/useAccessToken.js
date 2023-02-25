import React from 'react';
import useAuth from "./useAuth";
import axios from "../api/axios";

const useAccessToken = () => {

    const { setAuth } = useAuth();

    const refresh = async() => {
        const response = await axios.get()
    }
    return (
        <div>

        </div>
    );
};

export default useAccessToken;
