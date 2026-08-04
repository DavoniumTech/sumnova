
/*
    SumNova
    Davonium Technologies

    Authentication Module

    Responsibilities:
    - Firebase authentication
    - Login
    - Registration
    - Password reset
    - Email verification
    - User session state

    Does NOT handle:
    - AI
    - Firestore business data
    - UI rendering
*/


import {

    auth

} from "../firebaseconfig.js";



import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    sendPasswordResetEmail,

    sendEmailVerification,

    signOut,

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

    isValidEmail,

    isValidPassword

} from "./validators.js";



import {

    showToast

} from "./ui.js";







let currentUser = null;







/*
    Get Current User
*/


export function getCurrentUser() {


    return currentUser;


}







/*
    Register New User
*/


export async function registerUser(
    email,
    password
) {


    if (!isValidEmail(email)) {


        showToast(

            "Please enter a valid email.",

            "error"

        );


        return null;


    }



    if (!isValidPassword(password)) {


        showToast(

            "Password must meet security requirements.",

            "error"

        );


        return null;


    }



    try {


        const result =

            await createUserWithEmailAndPassword(

                auth,

                email,

                password

            );



        await sendEmailVerification(

            result.user

        );



        showToast(

            "Account created. Check your email.",

            "success"

        );



        return result.user;


    } catch (error) {


        showToast(

            "Registration failed. Please try again.",

            "error"

        );



        return null;


    }


}







/*
    Login User
*/


export async function loginUser(
    email,
    password
) {


    if (!isValidEmail(email)) {


        showToast(

            "Invalid email.",

            "error"

        );


        return null;


    }



    try {


        const result =

            await signInWithEmailAndPassword(

                auth,

                email,

                password

            );



        showToast(

            "Welcome back.",

            "success"

        );



        return result.user;


    } catch (error) {


        showToast(

            "Login failed. Check your details.",

            "error"

        );



        return null;


    }


}

        /*
    Password Reset
*/


export async function resetPassword(
    email
) {


    if (!isValidEmail(email)) {


        showToast(

            "Please enter a valid email.",

            "error"

        );


        return false;


    }



    try {


        await sendPasswordResetEmail(

            auth,

            email

        );



        showToast(

            "Password reset email sent.",

            "success"

        );



        return true;


    } catch (error) {


        showToast(

            "Unable to send reset email.",

            "error"

        );



        return false;


    }


}







/*
    Logout User
*/


export async function logoutUser() {


    try {


        await signOut(

            auth

        );



        currentUser = null;



        showToast(

            "Logged out successfully.",

            "success"

        );



        return true;


    } catch (error) {


        showToast(

            "Logout failed.",

            "error"

        );



        return false;


    }


}







/*
    Authentication State Observer

    Called when:
    - user logs in
    - user logs out
    - session changes
*/


export function observeAuthState(
    callback
) {


    return onAuthStateChanged(

        auth,

        user => {


            currentUser = user;



            if (

                typeof callback === "function"

            ) {


                callback(user);


            }


        }

    );


}







/*
    Check Email Verification
*/


export function isEmailVerified() {


    if (!currentUser) {


        return false;


    }



    return Boolean(

        currentUser.emailVerified

    );


}







/*
    Resend Verification Email
*/


export async function resendVerificationEmail() {


    if (!currentUser) {


        return false;


    }



    try {


        await sendEmailVerification(

            currentUser

        );



        showToast(

            "Verification email sent.",

            "success"

        );



        return true;


    } catch (error) {


        showToast(

            "Unable to send verification email.",

            "error"

        );



        return false;


    }


}  
