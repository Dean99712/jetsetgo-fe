import React, {useEffect, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

const PassengersOptionsComponent = ({onCloseOptions, onRemovePassenger, onAddPassenger, options}) => {


    const click = useRef(null);

    useEffect(() => {

        let handler = (e) => {

            if (!click.current.contains(e.target)) {
                onCloseOptions(false)
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [])


    return (
        <div>
            <div className="options" ref={click}>
                {/*Options menu Adult */}
                <div className="options-item">
                    <button type={"button"}
                            disabled={options.adult <= 1}
                            className="option-counter-button"
                            onClick={() => onRemovePassenger("adult")}
                    ><FontAwesomeIcon
                        icon={faMinus}/></button>
                    <span className="option-counter-number">{options.adult}</span>
                    <div className="option-text">Adult</div>
                    <div className="option-display-age">12 - 60 years</div>
                    <button type={"button"}
                            disabled={options.adult >= 9 || (options.adult + options.child) === 9}
                            className="option-counter-button"
                            onClick={() => onAddPassenger("adult")}>
                        <FontAwesomeIcon
                            icon={faPlus}/></button>
                </div>

                {/* Options menu Child*/}
                <div className="options-item">
                    <button type={"button"} disabled={options.child <= 0}
                            className="option-counter-button"
                            onClick={() => onRemovePassenger("child")}
                    ><FontAwesomeIcon
                        icon={faMinus}/></button>
                    <span className="option-counter-number">{options.child}</span>
                    <div className="option-text">Child</div>
                    <div className="option-display-age">2-11 years</div>
                    <button type={"button"} disabled={(options.adult + options.child) === 9}
                            className="option-counter-button"
                            onClick={() => onAddPassenger("child")}
                    ><FontAwesomeIcon
                        icon={faPlus}/></button>
                </div>
            </div>
        </div>
    );
};


export default PassengersOptionsComponent;
