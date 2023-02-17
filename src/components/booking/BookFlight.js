import React, {useRef, useState} from "react";
import "./BookFlight.scss"
import "../../styles/PassengersOptions.scss"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import FullPageLoader from "../FullPageLoader";
import PassengersOptionsComponent from "../PassengersOptionsComponent";
import OneRoadForm from "../oneroadtrip/OneRoadTrip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const BookFlight = () => {

    const origin = useRef()
    const destination = useRef()
    const departure_date = useRef()

    const [isLoading, setIsLoading] = useState(false)
    const [offerRequestId, setOfferRequestId] = useState(null);

    const [openOptions, setOpenOptions] = useState(false);

    const [options, setOptions] = useState({
        adult: 1,
        child: 0,
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
        let passengerIndex = passengers.findIndex((t) => t.type === type);
        let temp = passengers.splice(passengerIndex, 1)
        passengers[temp] = {type: ''};
        setPassengers(passengers.filter((elem => elem.type !== '')))
        handelOption(type, "d")
    };

    const navigate = useNavigate();

    const handelSubmit = async (e) => {

        e.preventDefault()

        async function createOfferRequest() {

            let slices = [
                {
                    origin: origin.current?.value,
                    destination: destination.current?.value,
                    departure_date: departure_date.current?.value,
                }
            ]

            try {
                setIsLoading(true)
                const response = await axios.post("http://localhost:8080/api/offer_request/createOffer", {
                    data: {
                        slices,
                        passengers,
                    }
                })
                setOfferRequestId(response.data.data.id)
            } catch (error) {
                console.log(error)
            }
        }

        await createOfferRequest();
    }

    function navigateToOffers() {
        if (offerRequestId) {
            setIsLoading(false);
            return navigate(`booking/flights`, {state: {id: offerRequestId}});
        }
    }

    return (
        <div className="bookContainer-all">
            <div className="mainPage-body" onMouseDown={() => openOptions}>
                <div className="main-title">
                    <h1>Book Your Flight Today </h1>
                    <h5>we are working with all of the great airline companies to ensure you an excellent
                        flight </h5>
                </div>

                {isLoading && <FullPageLoader/>}

                <div className="form-container">

                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="form-type-container">
                            <h3 className="form-type active">One Way</h3>
                            <h3 className="form-type">Round Trip</h3>
                            <h3 className="form-type">Multi-City</h3>
                        </div>
                        {/*Location Container*/}
                        <section className="first-row">
                            <div className="form-type-container">
                                <OneRoadForm
                                    origin={origin}
                                    destination={destination}
                                    departureDate={departure_date}
                                    options={options}
                                    navigateToOffers={navigateToOffers}
                                    onSubmit={handelSubmit}
                                />
                            </div>
                            <span>
                                    <div className="search-input passenger-counter"
                                         onClick={() => setOpenOptions(!openOptions)}
                                         id="passengers_options-container">

                                        <div>
                                            <FontAwesomeIcon id="passenger-icon" className="icon" icon={faCircleUser}/>
                                        </div>

                                        <div>
                                            <input
                                                name="passengers.type"
                                                placeholder="Passenger"
                                                value={(options.adult + options.child + options.infant_without_seat)}
                                                readOnly={true}
                                            />
                                        <label>Passenger</label>
                                        </div>
                                    </div>

                                {/*Options menu Adult*/}
                                {openOptions && <PassengersOptionsComponent
                                    onRemovePassenger={handelRemovePassenger}
                                    onAddPassenger={handelAddPassenger}
                                    onCloseOptions={setOpenOptions}
                                    options={options}
                                />
                                }
                                </span>
                            <button type={"submit"} className="form-btn submit-form-button"
                                    onClick={navigateToOffers()}
                            ><FontAwesomeIcon id="search-icon" icon={faSearch}/>
                                Find me a flight
                            </button>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default BookFlight
