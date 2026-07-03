import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify';
import Suggestions from '../booking/suggestion/Suggestions';
import PassengersOptionsComponent from '../booking/PassengerOptionsComponent';
import FullPageLoader from '../FullPageLoader';
import {createRequest} from '../../services/OfferRequestService';
import CabinClassSelect from './CabinClassSelect';
import MagneticButton from './MagneticButton';
import '../../styles/PassengersOptions.scss';
import './GlassSearchCard.scss';

const todayString = () => new Date().toISOString().slice(0, 10);

const GlassSearchCard = () => {
    const navigate = useNavigate();

    const [tripType, setTripType] = useState('one_way');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [originQuery, setOriginQuery] = useState('');
    const [destinationQuery, setDestinationQuery] = useState('');
    const departureRef = useRef(null);
    const returnRef = useRef(null);

    const [options, setOptions] = useState({adult: 1, child: 0});
    const [passengers, setPassengers] = useState([{type: 'adult'}]);
    const [openOptions, setOpenOptions] = useState(false);

    const [cabinClass, setCabinClass] = useState('economy');
    const [isLoading, setIsLoading] = useState(false);

    const addPassenger = (type) => {
        setOptions((prev) => ({...prev, [type]: prev[type] + 1}));
        setPassengers((prev) => [...prev, {type}]);
    };

    const removePassenger = (type) => {
        setOptions((prev) => ({...prev, [type]: prev[type] - 1}));
        setPassengers((prev) => {
            const index = prev.findIndex((passenger) => passenger.type === type);
            if (index === -1) return prev;
            return [...prev.slice(0, index), ...prev.slice(index + 1)];
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const departureDate = departureRef.current?.value;
        const returnDate = returnRef.current?.value;

        if (!origin || !destination) return toast.error('Choose where you are flying from and to');
        if (origin === destination) return toast.error('Origin and destination must be different');
        if (!departureDate) return toast.error('Pick a departure date');
        if (tripType === 'round_trip') {
            if (!returnDate) return toast.error('Pick a return date');
            if (returnDate < departureDate) return toast.error('Return date must be after departure');
        }

        const slices = [{origin, destination, departure_date: departureDate}];
        if (tripType === 'round_trip') {
            slices.push({origin: destination, destination: origin, departure_date: returnDate});
        }

        try {
            setIsLoading(true);
            const response = await createRequest({
                data: {
                    slices,
                    passengers,
                    cabin_class: cabinClass,
                },
            });
            navigate('/flights', {state: {id: response.data.data.id}, replace: true});
        } catch (error) {
            switch (error.response?.status) {
                case 400:
                    toast.error('Sorry, please check your search and try again');
                    break;
                default:
                    toast.error('Something went wrong... please try again');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const totalPassengers = options.adult + options.child;

    return (
        <div className="glass-search">
            {isLoading && <FullPageLoader/>}

            <div className="glass-search__toggle" role="group" aria-label="Trip type">
                <button
                    type="button"
                    aria-pressed={tripType === 'one_way'}
                    onClick={() => setTripType('one_way')}
                >One way
                </button>
                <button
                    type="button"
                    aria-pressed={tripType === 'round_trip'}
                    onClick={() => setTripType('round_trip')}
                >Round trip
                </button>
            </div>

            <form
                className={`glass-search__card ${tripType === 'round_trip' ? 'is-round' : ''}`}
                onSubmit={handleSubmit}
            >
                <div className="glass-search__field">
                    <label>From</label>
                    <Suggestions
                        query={originQuery}
                        setQuery={setOriginQuery}
                        setLocation={setOrigin}
                        placeholder="City or airport"
                    />
                </div>

                <div className="glass-search__field">
                    <label>To</label>
                    <Suggestions
                        query={destinationQuery}
                        setQuery={setDestinationQuery}
                        setLocation={setDestination}
                        placeholder="City or airport"
                    />
                </div>

                <div className="glass-search__field">
                    <label htmlFor="glass-departure">Departure</label>
                    <input
                        id="glass-departure"
                        type="date"
                        ref={departureRef}
                        min={todayString()}
                        defaultValue={todayString()}
                    />
                </div>

                {tripType === 'round_trip' && (
                    <div className="glass-search__field">
                        <label htmlFor="glass-return">Return</label>
                        <input
                            id="glass-return"
                            type="date"
                            ref={returnRef}
                            min={todayString()}
                        />
                    </div>
                )}

                <div
                    className="glass-search__field glass-search__field--passengers"
                    onClick={() => setOpenOptions(true)}
                >
                    <label>Passengers</label>
                    <span className="glass-search__value">
                        {totalPassengers} {totalPassengers === 1 ? 'traveller' : 'travellers'}
                    </span>
                    {openOptions && (
                        <PassengersOptionsComponent
                            onRemovePassenger={removePassenger}
                            onAddPassenger={addPassenger}
                            onCloseOptions={setOpenOptions}
                            options={options}
                        />
                    )}
                </div>

                <div className="glass-search__field glass-search__field--cabin">
                    <label>Cabin</label>
                    <CabinClassSelect value={cabinClass} onChange={setCabinClass}/>
                </div>

                <MagneticButton
                    type="submit"
                    variant="gold"
                    className="glass-search__submit"
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faSearch}/> Search flights
                </MagneticButton>
            </form>
        </div>
    );
};

export default GlassSearchCard;
