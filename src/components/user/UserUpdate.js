import InputComponent from "../InputComponent";
import {useMutation} from "@tanstack/react-query";
import {updateUser} from "../../services/UserService";
import {useFormik} from "formik";
import '../user/UserUpdate.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import FormBirthDate from "../FormBirthDate";
import React, {useRef, useState} from "react";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {storage} from "../../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
import {notification} from "../../App";
import {Spinner} from "react-bootstrap";
import Background from '../../assets/images/user/pexels-codioful-(formerly-gradienta)-7130469.jpg'
import {useNavigate} from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import {toast, ToastContainer} from "react-toastify";

const UserUpdate = () => {

    const navigate = useNavigate();

    const {user: currentUser, setUser} = useUser();
    const {auth} = useAuth();

    const inputRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const user = currentUser?.user;

    const {mutate} = useMutation(updateUser,
        {
            onSuccess: async () => {
                setIsLoading(false);
                setSuccess(true)
            },
            onError: (error) => {
                console.log(error);
                setIsError(true);
            }
        })

    const handleClick = () => {
        inputRef.current.click();
    }

    const uploadImage = async () => {

        setIsLoading(true)
        if (selectedFile == null) return;
        const imageRef = ref(storage, `images/users/${user?.user_id}/${v4()}`);
        uploadBytes(imageRef, selectedFile)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        setSelectedImage(url)
                        setUser({
                            user: {
                                ...user,
                                profile_picture: url
                            }
                        });
                        mutate({
                            email: auth?.email,
                            profilePicture: url
                        })
                    })
                toast.success("User updated Successfully");
            });
    };

    const {values, handleChange, handleSubmit} = useFormik({
        initialValues: {
            givenName: user?.given_name,
            familyName: user?.family_name,
            bornOn: user.born_on,
            phone_number: user?.phone_number

        }, onSubmit: async () => {
            await uploadImage()
            const bornOn = new Date(values.bornOn.years,
                values.bornOn.months,
                values.bornOn.days
            )
                .toLocaleString('en', {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }).replaceAll("/", "-")

            mutate({
                email: auth?.email,
                givenName: values.givenName,
                familyName: values.familyName,
                phoneNumber: values.phone_number,
                bornOn,
            });
            setIsLoading(false);
        }
    })

    return (
        <div className="user_update">
            <ToastContainer/>
            <img src={Background} alt="background"/>
            {success
                ?
                <section className="user-update_form">
                    <h6>Your details updated </h6>
                    <button className="" onClick={() => navigate("/", {replace: true})}>Go to home</button>
                </section>
                :
                <form className="user-update_form" onSubmit={handleSubmit}>
                    {!user?.profile_picture
                        ?
                        <FontAwesomeIcon icon={faUser} id="user-icon" onClick={handleClick}/>
                        : <img src={user?.profile_picture} onClick={handleClick} alt="img user"/>}
                    <span className="hide">
                    <FontAwesomeIcon icon={faCamera}/>
                </span>
                    <p className="selected-file">{selectedFile && selectedFile?.name}</p>
                    <input style={{display: "none"}} ref={inputRef}
                           onChange={(e) => setSelectedFile(e.target.files[0])}
                           type="file"/>
                    <InputComponent name="given_name" onChange={handleChange} value={values.given_name}
                                    defaultValue={user.given_name}
                                    placeholder="First name"

                                    type="text"/>
                    <InputComponent name="family_name" onChange={handleChange} value={values.family_name}
                                    placeholder="Last name" type="text"
                                    defaultValue={user.family_name}
                    />

                    <div>
                        <InputComponent name="phone_number" onChange={handleChange} value={values.phone_number}
                                        placeholder="Phone number"
                                        defaultValue={user.phone_number}
                                        type="text"/>

                        <FormBirthDate
                            handleChange={handleChange}
                            values={values.bornOn}
                            defaultValue={user.born_on}
                        />
                    </div>
                    <button className="submit-update" disabled={isLoading} type={"submit"}>{isLoading ?
                        <Spinner/> : 'Update'}</button>
                </form>}

        </div>
    );
};

export default UserUpdate;
