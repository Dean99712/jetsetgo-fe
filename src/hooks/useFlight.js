import {useContext} from 'react';
import FlightContext from "../context/FlightProvider";

const useFlight = () => {

    return useContext(FlightContext);
}
export default useFlight;
