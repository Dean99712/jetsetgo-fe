import axios from "axios";

const OFFERS_BASE_URL = 'http://localhost:8080/api/air/seat_maps'

// class SeatMapService {

  export function getSeatMaps(id) {
        return axios.get(OFFERS_BASE_URL, {
            params: {
                id: id
            }
        }).then(res => res.data)
    }


// export default new SeatMapService()