import React, {useState} from 'react';
import '../suggestion/Suggestions.scss'
import axios from "axios";

const Suggestions = ({query, setQuery, ref, iataCode, setIataCode}) => {

    const [airports, setAirports] = useState([]);

    const getSearchQuery = query => {
        const url = `http://localhost:8080/api/city/suggestions?q=${query}`;
        return encodeURI(url)
    };

    const searchCity = async () => {
        if (!query || query.trim() === "") return;

        const URL = getSearchQuery(query);
        const response = await axios.get(URL)
            .catch((err) => {
                console.log(`Error : ${err}`);
            });
        if (response.data) {
            setAirports(response.data?.response?.airports)
            setIataCode(response.data?.response?.airports?.iata_code)
        }
    }

    const onChangeHandler = e => {
        e.preventDefault();
        setQuery(e.target.value)
        searchCity()
    };

    return (
        <div className="suggestions_container">
            <input
                type="text"
                ref={ref}
                onChange={onChangeHandler}
                value={query}
            />
            {query.length < 2 || airports <= 1 ? <></> : <div className="airports-container">
                {airports?.map(airport => (
                    <span>
                        <p onClick={() => setQuery(airport.iata_code)} >{airport.name}</p>
                    </span>
                ))}
            </div>}
        </div>
    );
};

export default Suggestions;
