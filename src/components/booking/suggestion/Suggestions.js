import React, {useState} from 'react';
import '../suggestion/Suggestions.scss'
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {motion as m} from 'framer-motion';

const Suggestions = ({query, setQuery, setLocation, placeholder}) => {


    const [isOpen, setIsOpen] = useState(false);
    const [airports, setAirports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getSearchQuery = query => {
        const url = `http://localhost:8080/api/city/suggestions?q=${query}`;
        return encodeURI(url)
    };

    const searchCity = async () => {
        setIsLoading(true)
        setIsOpen(true)
        if (!query || query.trim() === "") return;

        const URL = getSearchQuery(query);
        const response = await axios.get(URL)
            .catch((err) => {
                console.log(`Error : ${err}`);
            });
        if (response.data) {
            setAirports(response.data?.response?.airports)
        }
        setIsLoading(false)
    }

    const onChangeHandler = async e => {
        e.preventDefault();
        setQuery(e.target.value);
        await searchCity()
    };

    return (
        <m.div
            initial={{
                display: "none",

            }}
            animate={{
                display: "block"
            }}
            className="suggestions_container">
            <input
                type="text"
                onChange={onChangeHandler}
                value={query}
                placeholder={placeholder}
            />
            {<div className={isOpen ? "airports-container" : "hide-suggestions"}>
                {isLoading
                    ?
                    <CircularProgress sx={{
                        position: "relative",
                        left: "35%",
                        top: "25%",
                        transform: "translate(-50%, -50%)"
                    }}/>
                    :
                    isOpen && airports?.length >= 0
                        ? airports?.map(airport => (
                            <div className="suggestions" onClick={() => {
                                setIsOpen(false)
                                setLocation(airport?.iata_code)
                                setQuery(airport?.iata_code)
                            }}><h6 className={"suggestion"}>{airport.name}</h6>
                            </div>
                        ))
                        :
                        <h6>Keep typing...</h6>
                }
            </div>}
        </m.div>
    );
};

export default Suggestions;
