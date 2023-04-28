import React, {useEffect} from 'react';
import {motion} from 'framer-motion';
import '../styles/SearchBar.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";

const SearchBar = ({openSearch, inputRef, handleClick}) => {

    const setOpenSearch = openSearch.setOpenSearch

    useEffect(() => {
        inputRef.current.focus()
    }, []);


    return (
        <motion.div
            onClick={handleClick}
            className="search"
            initial={{
                width: 0,
            }}
            animate={{
                width: 290
            }}
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
                duration: 0.5
            }}
            exit={{
                width: "45px",
                height: "45px",
                border: "1px solid #a3ceff",
                borderRadius: "50%",
                color: "#a3ceff",
                transition:{
                    stiffness: 300,
                    duration: 1
                }
            }}
        >
            <motion.h6 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
                       animate={{fontSize: 20}}>
                <FontAwesomeIcon id={"search_icon"} style={{zIndex: 10}}
                                 icon={faSearch}/>
                <motion.input
                    initial={{
                        width: 0
                    }}
                    animate={{
                        width: 210
                    }}
                    className="search-bar_input" type="text" ref={inputRef}/>
                <FontAwesomeIcon
                    id={"close"} onClick={() => setOpenSearch(false)}
                    icon={faClose}/>
            </motion.h6>
        </motion.div>
    );
};

export default SearchBar;
