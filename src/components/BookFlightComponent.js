import React, {useRef, useState} from "react";
import "../styles/BookFlightComponent.scss"
import "../styles/PassengersOptions.scss"
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarCheck, faPlaneUp, faRepeat, faTicket} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FullPageLoader from "./FullPageLoader";
import PassengersOptionsComponent from "./PassengersOptionsComponent";

const BookFlightComponent = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [offerRequestId, setOfferRequestId] = useState(null);

    const [options, setOptions] = useState({
        adult: 1,
        child: 0,
        infant_without_seat: 0
    });

    const handelOption = (name, operation) => {

        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    };

    const [passengers, setPassengers] = useState([{
        type: "adult"
    }]);

    const handelAddPassenger = (type) => {
        const passenger = {
            type
        }
        for (let i = 0; i <= options[type]; i++) {
            setPassengers([...passengers, passenger])
            handelOption(type, "i")
        }
    }

    const handelRemovePassenger = (type) => {
        let z = passengers.findIndex((t) => t.type === type);
        let temp = passengers.splice(z, 1)
        passengers[temp] = {type: ''};
        setPassengers(passengers.filter((elem => elem.type !== '')))
        handelOption(type, "d")
    };

    const [openOptions, setOpenOptions] = useState(false);

    const navigate = useNavigate();

    const origin = useRef()
    const destination = useRef()
    const departure_date = useRef()

    const handelSubmit = async (e) => {

        e.preventDefault()

        async function createOfferRequest() {

            let slices = [{
                origin: origin.current?.value,
                destination: destination.current?.value,
                departure_date: departure_date.current?.value,
            }]
            try {
                setIsLoading(true)
                const response = await axios.post("http://localhost:8080/api/offer_request/createOffer", {
                    data: {
                        slices,
                        passengers
                    }
                })
                setOfferRequestId(response.data.data.id)

            } catch (error) {
                console.log(error)
            }
        }

        await createOfferRequest();
    };

    function navigateToOffers() {
        if (offerRequestId !== null) {
            setIsLoading(false)
            return navigate('/offers', {state: {id: offerRequestId}});
        }
    }

    return (
        <div>
            {isLoading ? <FullPageLoader/> : <div></div>}
            <div className="search_form">
                <div className="nav-icons">
                    <button className="btn-search-form"><FontAwesomeIcon className="nav-icon" icon={faPlaneUp}/>Book a
                        Flight
                    </button>
                    <button className="btn-search-form"><FontAwesomeIcon className="nav-icon" icon={faTicket}/>Manage
                        Your Booking
                    </button>
                    <button className="btn-search-form"><FontAwesomeIcon className="nav-icon" icon={faCalendarCheck}/>Flight
                        Schedule
                    </button>
                </div>
                <div className="form-container">
                    <form onSubmit={handelSubmit}>

                        {/*Location Container*/}
                        <div className="form-input-location input_location-container">
                            {/* Origin*/}
                            <input
                                className="form-search-input input_origin"
                                type="text"
                                name="slices.origin"
                                placeholder="From"
                                maxLength={3}
                                autoComplete="off"
                                ref={origin}
                            />
                            <label className="form-label-location origin">Where from?</label>

                            {/* Destination*/}
                            <FontAwesomeIcon className="switch-locations-icon" icon={faRepeat}/>
                            <input
                                className="form-search-input input_destination"
                                type="text"
                                name="slices.destination"
                                placeholder="To"
                                maxLength={3}
                                autoComplete="off"
                                ref={destination}
                            /><label className="form-label-location destination">Where to?</label>

                            {/* Departure Date*/}
                            <input
                                className="form-input-location date_departure_date"
                                type="date"
                                name="slices.departure_date"
                                placeholder="Departure Date"
                                ref={departure_date}
                            />
                            <label className="form-label-location departure_date">Departure Date</label>
                        </div>

                        {/* Passengers*/}
                        <div className="second-row-container">
                            <div className="passengers-options">
                                <input
                                    className=" form-search-input input_passengers"
                                    name="passengers.type"
                                    placeholder="Passenger"
                                    value={(options.adult + options.child + options.infant_without_seat)}
                                    readOnly={true}
                                    onClick={() => setOpenOptions(!openOptions)}
                                />
                                <label className="form-label num-of-passengers">Passenger</label>
                                {/*Options menu Adult*/}
                                {openOptions &&
                                    <PassengersOptionsComponent
                                        onRemovePassenger={handelRemovePassenger}
                                        onAddPassenger={handelAddPassenger}
                                        options={options}
                                    />
                                }
                            </div>
                            {/* Submit Form*/}
                            <button type={"submit"} className="form-btn submit-form-button"
                                    onClick={navigateToOffers()}
                            >Find me a flight
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookFlightComponent
