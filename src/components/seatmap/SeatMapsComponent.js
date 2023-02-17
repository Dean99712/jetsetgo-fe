import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getSeatMaps} from "../../services/SeatMapService";
import {SeatSelection} from "@duffel/components";

const SeatMap = (props) => {

    const offerId = props.offer.id

    const seatMap = useQuery({
        queryKey: ["seatMap"],
        queryFn: () => getSeatMaps(offerId)
    })
    console.log(seatMap.data?.data)

    return (
        <div>
            <SeatSelection offer={props.offer} seatMaps={seatMap.data?.data} passengers={props.passengers} onSubmit={props.handelSubmit}/>
        </div>
    );
};

export default SeatMap;
