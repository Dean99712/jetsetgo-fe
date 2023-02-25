import axios from "axios";
const token = '';

export default axios.create({
    baseURL: 'http://localhost:8080/api',
});