import React, {useRef, useState} from "react";
import "./BookFlight.scss"
import "../../styles/PassengersOptions.scss"
import {useNavigate} from "react-router-dom";
import FullPageLoader from "../FullPageLoader";
import PassengersOptionsComponent from "./PassengerOptionsComponent";
import OneRoadForm from "./oneroadtrip/OneRoadTrip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import RoundTrip from "./roundtrip/RoundTrip";
import {motion as m} from 'framer-motion';
import {createRequest} from "../../services/OfferRequestService";
import {toast, ToastContainer} from "react-toastify";

const BookFlight = () => {


    const inputRef = useRef(null);

    const navigation = useNavigate()
    const [value, setValue] = useState("1");

    const [isErrors, setIsErrors] = useState(false);
    const [serverErrors, setServerErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleTabChange = (event, newValue) => {
        setValue(newValue)
    };

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const departure_date = useRef();

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

    const handelSubmit = async (e) => {
        e.preventDefault()

        async function createOfferRequest() {
            let slices = [{
                origin,
                destination,
                departure_date: departure_date.current?.value,
            }]
            try {
                setIsLoading(true)
                const response = await createRequest({
                    data: {
                        slices,
                        passengers,
                    }
                })
                setOfferRequestId(response.data.data.id)
            } catch (error) {
                switch (error.response.status) {
                    case 401:
                        setIsErrors(true);
                        return setServerErrors("Something went wrong... please try again");
                    case 500:
                        setIsErrors(true);
                        return setServerErrors("Something went wrong... please try again");
                    case 400:
                        setIsErrors(true);
                        return setServerErrors("Sorry please try again");
                    default:
                        setIsErrors(true);
                        return setServerErrors("");
                }
            }
        }
        await createOfferRequest();
        setIsLoading(false);
    }

    function navigateToOffers() {
        if (isErrors) {
            toast.error(serverErrors, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } else if (offerRequestId) {
            setIsLoading(false);
            return navigation('flights', {state: {id: offerRequestId}, replace: true});
        }
    }

    return (
        <>
            <ToastContainer/>
            {isLoading && !isErrors && <FullPageLoader/> }

            <div className="bookflight">
                <m.div className="mainPage-body" onMouseDown={() => openOptions}>
                    <div className="main-title">
                        <m.h1
                            initial={{position: "relative", top: 600, opacity: 0}}
                            animate={{opacity: 1, top: 0, animationDelay: 300}}
                            transition={{type: "spring", stiffness: 250, damping: 20, duration: 0.5}}
                        >Book Your Flight Today
                        </m.h1>
                        <m.h5
                            initial={{position: "relative", top: 600, opacity: 0}}
                            animate={{opacity: 1, top: 0}}
                            transition={{type: "spring", stiffness: 250, damping: 20, duration: 0.5}}
                        >we are working with all of the great airline companies to ensure you an excellent
                            flight
                        </m.h5>
                    </div>

                    <m.div
                        initial={{position: "relative", bottom: -500, opacity: 0}}
                        animate={{opacity: 1, top: "75%"}}
                        transition={{type: "spring", stiffness: 250, damping: 20, delay: 0.3, duration: 0.3}}
                        className="form-container">

                        <form onSubmit={(e) => handelSubmit(e)}>

                            <TabContext value={value}>
                                <TabList onChange={handleTabChange}>
                                    <Tab className="text-capitalize fw-bold" label="One Way" value="1"/>
                                    <Tab className="text-capitalize fw-bold" label="Round Trip" value="2"/>
                                    <Tab className="text-capitalize fw-bold" label="Multi-City" value="3"/>
                                </TabList>
                                <section className="first-row">
                                    <div className="form-type-container">
                                        <TabPanel value="1" className="p-0">
                                            <OneRoadForm
                                                origin={{origin, setOrigin}}
                                                destination={{destination, setDestination}}
                                                departureDate={departure_date}
                                                options={options}
                                                useRef={inputRef}
                                                navigateToOffers={navigateToOffers}
                                                onSubmit={handelSubmit}
                                            />
                                        </TabPanel>
                                        <TabPanel value="2" className="p-0">
                                            <RoundTrip
                                                origin={{origin, setOrigin}}
                                                destination={{destination, setDestination}}
                                                departureDate={departure_date}
                                                useRef={inputRef}
                                                onSubmit={handelSubmit}
                                            />
                                        </TabPanel>
                                        <TabPanel value="3" className="p-0">

                                        </TabPanel>
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
                                                className="passengers-input"
                                                name="passengers.type"
                                                placeholder="Passenger"
                                                value={(options.adult + options.child)}
                                                readOnly={true}
                                            />
                                        <label>Passenger</label>
                                        </div>
                                    </div>

                                        {openOptions && <PassengersOptionsComponent
                                            onRemovePassenger={handelRemovePassenger}
                                            onAddPassenger={handelAddPassenger}
                                            onCloseOptions={setOpenOptions}
                                            options={options}
                                        />
                                        }
                                </span>
                                    <button type={"submit"} disabled={isLoading} className="form-btn submit-form-button"
                                            onClick={navigateToOffers()}
                                    ><FontAwesomeIcon id="search-icon" icon={faSearch}/>
                                        Find me a flight
                                    </button>
                                </section>
                            </TabContext>
                        </form>

                    </m.div>
                </m.div>
            </div>
        </>
    );
};

export default BookFlight
