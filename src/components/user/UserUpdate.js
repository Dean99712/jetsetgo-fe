import InputComponent from "../InputComponent";
import {useMutation} from "@tanstack/react-query";
import {updateUser} from "../../services/UserService";
import {useFormik} from "formik";
import '../user/UserUpdate.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import useAuth from "../../hooks/useAuth";
import FormBirthDate from "../FormBirthDate";
import React, {useRef, useState} from "react";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {storage} from "../../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
import {notification} from "../../App";
import {Spinner} from "react-bootstrap";
import Background from '../../assets/images/user/pexels-codioful-(formerly-gradienta)-7130469.jpg'


const UserUpdate = () => {

    const [isLoading, setIsLoading] = useState(false);
    const {auth, setAuth} = useAuth()
    const {user} = auth
    const {mutate} = useMutation(updateUser)
    const [selectedFile, setSelectedFile] = useState('');
    const [userProfilePic, setUserProfilePic] = useState(null);

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    const uploadImage = () => {
        setIsLoading(true)
        if (selectedFile == null) return;
        const imageRef = ref(storage, `images/users/${user?.user_id}/${v4()}`)
        uploadBytes(imageRef, selectedFile)
            .then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setAuth({...auth, user: {...user, profile_picture: url}})
                    setUserProfilePic(url)
                })
            })
            .then(() => {
                setIsLoading(false)
                notification("Success", "User has been updated Successfully!", "success")
            });
    }

    const {values, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            givenName: user?.given_name ,
            familyName: user?.family_name,
            bornOn: {
                days: '',
                months: '',
                years: ''
            },
            phoneNumber: user?.phone_number

        }, onSubmit: () => {
            const bornOn = new Date(values.bornOn.years, values.bornOn.months, values.bornOn.days).toLocaleString('en', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).replaceAll("/", "-")

            mutate({
                email: auth?.user?.email,
                givenName: values.given_name,
                familyName: values.family_name,
                bornOn: bornOn,
                // phoneNumber: phone_number,
                profilePicture: userProfilePic
            });
            uploadImage()
        }
    })

    // let phone_number = values.phone_number.mobile_operator + values.phone_number.number

    return (
        <div className="UserUpdate">
            <img src={Background} alt=""/>
            <form className="user-update_form" onSubmit={handleSubmit}>
                {!auth?.user?.profile_picture
                    ?
                    <FontAwesomeIcon icon={faUser} id="user-icon" onClick={handleClick}/>
                    : <img src={auth?.user?.profile_picture} onClick={handleClick} alt="img user"/>}
                <span className="hide">
                    <FontAwesomeIcon icon={faCamera}/>
                </span>
                <input style={{display: "none"}} ref={inputRef} onChange={(e) => setSelectedFile(e.target.files[0])}
                       type="file"/>
                <InputComponent name="given_name" onChange={handleChange} value={values.given_name}
                                placeholder="First name"
                                type="text"/>
                <InputComponent name="family_name" onChange={handleChange} value={values.family_name}
                                placeholder="Last name" type="text"/>
                <div>
                    <InputComponent name="phone_number" onChange={handleChange} value={values.phone_number}
                                    placeholder="Phone number" type="text"/>

                    <FormBirthDate
                        handleChange={handleChange}
                        values={values.bornOn}
                    />
                </div>
                <button className="submit-update" disabled={isLoading} type={"submit"}>{isLoading ?
                    <Spinner/> : 'Update'}</button>
            </form>
        </div>
    );
};

export default UserUpdate;
