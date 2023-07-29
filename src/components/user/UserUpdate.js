import {useMutation} from "@tanstack/react-query";
import {getUserProfile, updateUser} from "../../services/UserService";
import {useFormik} from "formik";
import '../user/UserUpdate.scss'
import React, {useEffect, useRef, useState} from "react";
import {storage} from "../../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
import Background from '../../assets/images/user/pexels-codioful-(formerly-gradienta)-7130469.jpg'
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {toast, ToastContainer} from "react-toastify";
import UserUpdateForm from "./UserUpdateForm";
import useUser from "../../hooks/useUser";

const UserUpdate = () => {

    const navigate = useNavigate();

    const {auth} = useAuth();
    const {user: currentUser, setUser} = useUser()
    const user = currentUser?.user
    const [profileUser, setProfileUser] = useState(null);

    const inputRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        const userProfile = async () => {
            const response = await getUserProfile({
                email: auth?.email,
                token: auth?.accessToken
            })
            setProfileUser(response.data);
        };
        userProfile()
    }, []);

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
                        if (url && selectedFile) {
                            setUser({
                                user: {
                                    ...user,
                                    profile_picture: url,
                                }
                            });
                            mutate({
                                email: auth?.email,
                                profilePicture: url
                            });
                        }
                        setSuccess(true);
                        setIsLoading(false)
                        toast.success("User updated Successfully");
                    })
            });
    };
    const days = new Date(user?.born_on).toLocaleString('en', {day: "2-digit"})
    const months = new Date(user?.born_on).toLocaleString('en', {month: "2-digit"})
    const years = new Date(user?.born_on).toLocaleString('en', {year: "numeric"})

    const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: {
            given_name: profileUser?.given_name || user.given_name,
            family_name: profileUser?.family_name || user.family_name,
            bornOn: {
                days,
                months,
                years
            },
            phone_number: profileUser?.phone_number || user.phone_number
        },
        onSubmit: async () => {
            const bornOn = new Date(values.bornOn.years,
                values.bornOn.months,
                values.bornOn.days
            )
                .toLocaleString('en', {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }).replaceAll("/", "-");

            await uploadImage()
            console.log(values.bornOn.months)
            mutate({
                email: auth?.email,
                givenName: values.given_name,
                familyName: values.family_name,
                phoneNumber: values.phone_number,
                bornOn,
            });
        }
    });

    return (
        <div className="user_update">
            <ToastContainer/>
            <img src={Background} alt="background"/>
            {success
                ?
                <section className="user-update_form updated">
                    <h6 className="updated_title">Your details updated</h6>
                    <button className="btn btn-primary fw-bold back_button"
                            onClick={() => navigate("/", {replace: true})}>Go to home
                    </button>
                </section>
                :
                profileUser
                &&
                <UserUpdateForm
                    user={profileUser}
                    handleClick={handleClick}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    isLoading={isLoading}
                    values={values}
                    inputRef={inputRef}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />}
        </div>
    );
};

export default UserUpdate;
