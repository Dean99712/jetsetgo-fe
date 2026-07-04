import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faChevronDown} from '@fortawesome/free-solid-svg-icons';

export const CABIN_CLASSES = [
    {value: 'economy', label: 'Economy'},
    {value: 'premium_economy', label: 'Premium Economy'},
    {value: 'business', label: 'Business'},
    {value: 'first', label: 'First'},
];

const CabinClassSelect = ({value, onChange}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selected = CABIN_CLASSES.find((c) => c.value === value) || CABIN_CLASSES[0];

    return (
        <div className="cabin-select" ref={containerRef}>
            <button
                type="button"
                className="cabin-select__trigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                <span className="cabin-select__value">{selected.label}</span>
                <FontAwesomeIcon className="cabin-select__chevron" icon={faChevronDown}/>
            </button>

            {open && (
                <ul className="cabin-select__menu" role="listbox" aria-label="Cabin class">
                    {CABIN_CLASSES.map((cabin) => (
                        <li key={cabin.value} role="option" aria-selected={cabin.value === selected.value}>
                            <button
                                type="button"
                                className={cabin.value === selected.value ? 'is-active' : ''}
                                onClick={() => {
                                    onChange(cabin.value);
                                    setOpen(false);
                                }}
                            >
                                {cabin.label}
                                {cabin.value === selected.value && <FontAwesomeIcon icon={faCheck}/>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CabinClassSelect;
