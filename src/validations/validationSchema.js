import * as yup from "yup";

const passRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/;
const nameRules = /^[A-Za-z ]*$/;
const phoneRules = /^[0-9]{0,14}$/
const required = "Required!"

export const loginValidation = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required(required),
    password: yup.string().min(5).required(required)
})

export const registerValidation = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    family_name:
        yup.string()
            .matches(nameRules, "Please enter a valid name")
            .min(3, "last name must be at least 3 characters")
            .required('Family name is required'),
    given_name:
        yup.string()
            .matches(nameRules, "Please enter a valid name")
            .min(3, "name must be at least 3 characters")
            .required('Given name is required'),
    phone_number:
        yup.string()
            .matches(phoneRules, "Invalid phone number")
            .max(13, "phone number cannot be more than 13 characters")
            .required('Phone number is required'),
    password:
        yup.string()
            .matches(passRules)
            .max(13)
            .required(required)
})

export const passengersValidations = yup.object().shape({
    passengers: yup.array().of(
        yup.object().shape({
            email: yup.string().email('Invalid email address').required('Email is required'),
            family_name:
                yup.string()
                    .matches(nameRules, "Please enter a valid name")
                    .min(3, "last name must be at least 3 characters")
                    .required('Family name is required'),
            given_name:
                yup.string()
                    .matches(nameRules, "Please enter a valid name")
                    .min(3, "name must be at least 3 characters")
                    .required('Given name is required'),
            phone_number:
                yup.string()
                    .max(13, "phone number cannot be more than 13 characters")
                    .required('Phone number is required'),
        })
    ),
});