import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {SeatSelection} from '@duffel/components'
import '@duffel/components/dist/SeatSelection.min.css'
import SeatMapService from "../../services/SeatMapService";
import {offer, seatMaps, passengers} from "../../mock";

const SeatMapsModal = (props) => {

    // const [seatMaps, setSeatMaps] = useState([]);

    const data = useQuery({
        queryKey: ["seatMaps"],
        queryFn: () => SeatMapService.getSeatMaps(props.offer)
    });

    return (
        <div>
            {/*<SeatSelection offer={offer} seatMaps={seatMaps} passengers={passengers} onSubmit={""}/>*/}
        </div>
    );
};

export default SeatMapsModal;
