import {createContext, useState} from "react";

const FlightContext = createContext({})

export const FlightProvider = ({children}) => {
    const [flight, setFlight] = useState({});

    return (
        <FlightContext.Provider value={{flight, setFlight}}>
            {children}
        </FlightContext.Provider>
    )
}

export default FlightContext