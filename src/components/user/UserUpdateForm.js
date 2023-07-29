import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../InputComponent";
import BirthDate from "../BirthDate";
import {CircularProgress} from "@mui/material";

const UserUpdateForm = ({
                            values,
                            handleClick,
                            handleSubmit,
                            handleChange,
                            inputRef,
                            isLoading,
                            setSelectedFile,
                            selectedFile,
                            user,
                        }) => {

    return (
        <form className="user-update_form" onSubmit={handleSubmit}>
            {!user?.profile_picture
                ?
                <FontAwesomeIcon icon={faUser} id="user-icon" onClick={handleClick}/>
                : <img src={user.profile_picture} onClick={handleClick} alt="img user"/>}
            <span className="hide">
                    <FontAwesomeIcon icon={faCamera}/>
                </span>
            <p className="selected-file">{selectedFile && selectedFile?.name}</p>
            <input style={{display: "none"}} ref={inputRef}
                   onChange={(e) => setSelectedFile(e.target.files[0])}
                   type="file"/>
            <InputComponent name="given_name" onChange={handleChange} value={values.given_name}
                            placeholder="First name"

                            type="text"/>
            <InputComponent name="family_name" onChange={handleChange} value={values.family_name}
                            placeholder="Last name" type="text"
            />

            <div>
                <InputComponent name="phone_number" onChange={handleChange} value={values.phone_number}
                                placeholder="Phone number"
                                type="text"/>
                <BirthDate
                    handleChange={handleChange}
                    values={values.bornOn}
                />
            </div>
            <button className="submit-update" disabled={isLoading} type={"submit"}>{isLoading ?
                <CircularProgress sx={{
                    color: "#FFFFFF",
                }}/> : 'Update'}</button>
        </form>
    );
};

export default UserUpdateForm;
