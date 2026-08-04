
/*
    SumNova
    Davonium Technologies

    Input Validation Module

    Responsible for:
    - validating user input
    - protecting application flows
    - reusable validation rules

    No:
    - Firebase operations
    - AI operations
    - UI logic
*/


import {
    LIMITS
} from "./constants.js";







/*
    Required Value Validator
*/


export function isRequired(
    value
) {


    return (

        value !== null &&

        value !== undefined &&

        String(value).trim().length > 0

    );


}







/*
    Email Validator
*/


export function isValidEmail(
    email
) {


    if (!email) {

        return false;

    }



    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return pattern.test(
        email.trim()
    );


}







/*
    Password Validator

    Basic security requirements.
*/


export function isValidPassword(
    password
) {


    if (!password) {

        return false;

    }



    return (

        password.length >= 8 &&

        /[A-Z]/.test(password) &&

        /[a-z]/.test(password) &&

        /\d/.test(password)

    );


}







/*
    Name Validator
*/


export function isValidName(
    name
) {


    if (!isRequired(name)) {

        return false;

    }



    return (

        name.trim().length <=

        LIMITS.MAX_PROFILE_NAME_LENGTH

    );


}







/*
    Text Length Validator
*/


export function isValidTextLength(
    text,
    maximum = LIMITS.MAX_INPUT_CHARACTERS
) {


    if (!text) {

        return false;

    }



    return (

        text.trim().length <= maximum

    );


}







/*
    Summary Input Validator
*/


export function validateSummaryInput(
    text,
    category
) {


    const errors = [];



    if (!isRequired(text)) {


        errors.push(
            "Please enter text to summarize."
        );


    }



    if (

        text &&

        !isValidTextLength(text)

    ) {


        errors.push(
            "Your text is too long."
        );


    }



    if (!isRequired(category)) {


        errors.push(
            "Please select a summary type."
        );


    }



    return {


        valid:
            errors.length === 0,


        errors


    };


}

/*
    URL Validator

    Used for:
    - profile links
    - future integrations
*/


export function isValidUrl(
    url
) {


    if (!url) {

        return false;

    }



    try {


        const value =
            new URL(url);



        return (

            value.protocol === "http:" ||

            value.protocol === "https:"

        );


    } catch (error) {


        return false;


    }


}







/*
    File Validation

    Used for future:
    - document uploads
    - attachments

    No storage logic here.
*/


export function validateFile(
    file,
    options = {}
) {


    const errors = [];



    const maxSize =
        options.maxSize || 10 * 1024 * 1024;



    const allowedTypes =
        options.allowedTypes || [];





    if (!file) {


        errors.push(
            "Please select a file."
        );


    }



    if (

        file &&

        file.size > maxSize

    ) {


        errors.push(
            "File size is too large."
        );


    }



    if (

        file &&

        allowedTypes.length > 0 &&

        !allowedTypes.includes(file.type)

    ) {


        errors.push(
            "This file type is not supported."
        );


    }



    return {


        valid:
            errors.length === 0,


        errors


    };


}







/*
    Password Confirmation Validator
*/


export function passwordsMatch(
    password,
    confirmation
) {


    return (

        password === confirmation

    );


}







/*
    Profile Validation

    Used before:
    - Firestore profile updates
*/


export function validateProfile(
    profile = {}
) {


    const errors = [];



    if (

        !isValidName(profile.name)

    ) {


        errors.push(
            "Please enter a valid name."
        );


    }



    if (

        profile.email &&

        !isValidEmail(profile.email)

    ) {


        errors.push(
            "Please enter a valid email."
        );


    }



    return {


        valid:
            errors.length === 0,


        errors


    };


}







/*
    Validation Result Helper

    Creates consistent responses.
*/


export function validationResult(
    valid,
    errors = []
) {


    return {


        valid,

        errors


    };


}







/*
    Prevent Empty Arrays

    Useful for:
    - batch operations
    - selections
*/


export function hasItems(
    value
) {


    return (

        Array.isArray(value) &&

        value.length > 0

    );


}
