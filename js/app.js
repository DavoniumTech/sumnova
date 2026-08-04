/*
    SumNova
    Davonium Technologies

    Application Controller

    Responsibilities:
    - Application startup
    - Module initialization
    - Global event connection
    - Application lifecycle

    Does NOT handle:
    - AI provider logic
    - Firebase configuration
    - Database rules
*/



import {

    initializeSettings

} from "./settings.js";



import {

    initializeRouter,

    onRouteChange

} from "./router.js";



import {

    observeAuthState

} from "./auth.js";




import {

    initializeUI,

    hideLoading,

    showToast

} from "./ui.js";






let applicationReady = false;







/*
    Initialize Application
*/


export async function initializeApp() {


    if (applicationReady) {


        return;


    }



    try {


        initializeSettings();



        initializeRouter();


        initializeUI();



        setupAuthListener();



        setupGlobalEvents();



        applicationReady = true;



        console.log("hideLoading called");
hideLoading();



    } catch (error) {


        hideLoading();



        showToast(

            "Application failed to start.",

            "error"

        );


    }


}







/*
    Authentication Listener
*/


function setupAuthListener() {


    observeAuthState(

        user => {


            if (user) {


                handleAuthenticatedUser(

                    user

                );


            } else {


                handleGuestUser();


            }


        }

    );


}







/*
    Authenticated User Handler
*/


function handleAuthenticatedUser(
    user
) {


    window.dispatchEvent(

        new CustomEvent(

            "userauthenticated",

            {

                detail: user

            }

        )

    );


}







/*
    Guest User Handler
*/


function handleGuestUser() {


    window.dispatchEvent(

        new Event(

            "userloggedout"

        )

    );


}


/*
    Global Event Setup
*/


function setupGlobalEvents() {


    window.addEventListener(

        "routechange",

        event => {


            handleRouteChange();


        }

    );



    window.addEventListener(

        "online",

        () => {


            showToast(

                "Connection restored.",

                "success"

            );


        }

    );



    window.addEventListener(

        "offline",

        () => {


            showToast(

                "You are offline.",

                "warning"

            );


        }

    );


}







/*
    Route Change Handler
*/


function handleRouteChange() {


    const route =
    window.location.hash;




    window.dispatchEvent(

        new CustomEvent(

            "pagerender",

            {

                detail: {

                    route

                }

            }

        )

    );


}







/*
    Application Ready Status
*/


export function isAppReady() {


    return applicationReady;


}







/*
    Get Application Information
*/


export function getAppInfo() {


    return {


        name:

            "SumNova",


        company:

            "Davonium Technologies",


        version:

            "1.0.0"


    };


}







/*
    Start Application

    Automatically starts
    when DOM is ready.
*/


if (

    document.readyState === "loading"

) {


    document.addEventListener(

        "DOMContentLoaded",

        initializeApp

    );


} else {


    initializeApp();


}
