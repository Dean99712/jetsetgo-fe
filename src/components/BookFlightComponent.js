import React, {useState} from "react";
import "../styles/BookFlightComponent.css"
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import useFullPageLoader from "./hooks/useFullPageLoader";

const BookFlightComponent = () => {

    const [offerRequestId, setOrderRequestId] = useState(null);

    // const [options, setOptions] = useState({
    //     adult: 1,
    //     child: 0,
    //     baby: 0
    // })
    const [loader, showLoader, hideLoader] = useFullPageLoader()

    const navigate = useNavigate();

    const passengers = [
        {
            type: "adult"
        }
    ]

    const [offerDetails, setFormDetails] = useState({
        slices: [{
            origin: '',
            destination: '',
            departure_date: ''
        }],
        passengers,
        cabin_class: '',
        max_connections: ''
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        const nameArr = name.split(".");
        if (nameArr.length > 1) {
            setFormDetails({
                ...offerDetails,
                [nameArr[0]]: {
                    ...offerDetails[nameArr[0]],
                    [nameArr[1]]: value
                }
            });
        } else {
            setFormDetails({...offerDetails, [name]: value});
        }
    };

    // const handelOption = (name, operation) => {
    //     setOptions((prev) => {
    //         return {
    //             ...prev,
    //             [name]: operation === "i" ? options[name] + 1 : options[name] -1
    //         }
    //     })
    // }
    const handelSubmit = async (e) => {
        e.preventDefault()

        async function createOfferRequest() {
            try {
            showLoader()
                const response = await fetch('http://localhost:8080/api/offer_request/createOffer', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(offerDetails)
                });
                const data = await response.json();
                setOrderRequestId(data.data.id);
                hideLoader()
            } catch (error) {
                console.log(error)
            }
        }

        await createOfferRequest();
    };

    function navigateToOffers() {
        if (offerRequestId != null) {
            return navigate('/offers', {state: {id: offerRequestId}});
        }
    }

    return (
        <div>
                <div className="container-xxl">
                    <h1 className="mx-auto">Book your Flight today!</h1>
                    <form className="d-flex flex-sm-column bd-highlight" onSubmit={handelSubmit}>

                        <label className="form-label fw-bold fs-5"><FontAwesomeIcon
                            icon={faPlaneDeparture}/> From</label>
                        <input
                            className="form-control p-2 bd-highlight fw-bold "
                            type="text"
                            name="slices.origin"
                            placeholder="Where from?"
                            value={offerDetails.slices.origin}
                            onChange={handleChange}
                        />
                        <label className="form-label fw-bold fs-5"><FontAwesomeIcon icon={faPlaneArrival}/> To</label>

                        <input
                            className="form-control fw-bold"
                            type="text"
                            name="slices.destination"
                            placeholder="Where to?"
                            value={offerDetails.slices.destination}
                            onChange={handleChange}
                        />
                        <label className="form-label fw-bold fs-5">Departure Date</label>
                        <input
                            className="form-control fw-"
                            type="date"
                            name="slices.departure_date"
                            placeholder="Departure Date"
                            value={offerDetails.slices.departure_date}
                            onChange={handleChange}
                        />
                        {/*<DateRangeComponent/>*/}
                        <label className="form-label fw-bold fs-5">Passenger</label>
                        <input
                            className="form-control fw-bold"
                            name="passengers.type"
                            placeholder="Passenger"
                            value={offerDetails.passengers[0].type}
                            onChange={handleChange}
                        />
                        <label className="form-label fw-bold fs-5">Cabin Class</label>
                        <input
                            className="form-control fw-bold"
                            type="text"
                            name="cabin_class"
                            placeholder="Cabin Class"
                            value={offerDetails.cabin_class}
                            onChange={handleChange}
                        />
                        <div>
                            <div className="container  align-items-start w-25 d-flex justify-content-evenly">
                                <button type={"submit"} className="btn btn-primary mt-4"
                                        onClick={navigateToOffers()}>Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    );
};


export default BookFlightComponent
