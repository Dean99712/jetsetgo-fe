import React, {useEffect, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

const PassengersOptionsComponent = (props) => {


    const click = useRef(null);

    useEffect(() => {

        let handler = (e) => {

            if (!click.current.contains(e.target)) {
                props.onCloseOptions(false)
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
                            disabled={props.options.adult <= 1 || props.options.adult <= props.options.infant_without_seat}
                            className="option-counter-button"
                            onClick={() => props.onRemovePassenger("adult")}
                    ><FontAwesomeIcon
                        icon={faMinus}/></button>
                    <span className="option-counter-number">{props.options.adult}</span>
                    <div className="option-text">Adult</div>
                    <div className="option-display-age">12 - 60 years</div>
                    <button type={"button"}
                            disabled={props.options.adult >= 9 || (props.options.adult + props.options.child) === 9}
                            className="option-counter-button"
                            onClick={() => props.onAddPassenger("adult")}>
                        <FontAwesomeIcon
                            icon={faPlus}/></button>
                </div>

                {/* Options menu Child*/}
                <div className="options-item">
                    <button type={"button"} disabled={props.options.child <= 0}
                            className="option-counter-button"
                            onClick={() => props.onRemovePassenger("child")}
                    ><FontAwesomeIcon
                        icon={faMinus}/></button>
                    <span className="option-counter-number">{props.options.child}</span>
                    <div className="option-text">Child</div>
                    <div className="option-display-age">2-11 years</div>
                    <button type={"button"} disabled={(props.options.adult + props.options.child) === 9}
                            className="option-counter-button"
                            onClick={() => props.onAddPassenger("child")}
                    ><FontAwesomeIcon
                        icon={faPlus}/></button>
                </div>
                {/* Options menu Baby*/}
                {/*<div className="options-item">*/}
                {/*    <button type={"button"} disabled={props.options.infant_without_seat <= 0}*/}
                {/*            className="option-counter-button"*/}
                {/*            onClick={() => props.onRemovePassenger("infant_without_seat")}*/}
                {/*    ><FontAwesomeIcon*/}
                {/*        icon={faMinus}/></button>*/}
                {/*    <span className="option-counter-number">{props.options.infant_without_seat}</span>*/}
                {/*    <div className="option-text">Baby</div>*/}
                {/*    <div className="option-display-age">under 2 years</div>*/}
                {/*    <button type={"button"}*/}
                {/*            disabled={props.options.infant_without_seat >= props.options.adult || props.options.infant_without_seat === props.options.adult}*/}
                {/*            className="option-counter-button"*/}
                {/*            onClick={() => props.onAddPassenger("infant_without_seat")}>*/}
                {/*        <FontAwesomeIcon*/}
                {/*            icon={faPlus}/></button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};


export default PassengersOptionsComponent;
