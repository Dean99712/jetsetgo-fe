import * as yup from "yup";

const passRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/;
const nameRules = /^[A-Za-z]*$/;
const phoneRules = /^[0-9]{0,7}$/
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
        yup.object().shape({
            mobile_operator: yup.string().required(required),
            number: yup.string().matches(phoneRules, "must contain only numbers").required(required)
        }),
    password:
        yup.string()
            .matches(passRules, "Password must contain a special character and a number")
            .max(20, "max 20 characters")
            .required(required),
    confirm_password:
    yup.string().oneOf([yup.ref('password'), null], "password do not match!"),
    bornOn: yup.object().shape({
        days: yup.string().required(required),
        months: yup.string().required(required),
        years: yup.string().required(required),
    })
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