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

    initializeRouter

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
=========================================================
Initialize Application
=========================================================
*/


export async function initializeApp() {


    if (applicationReady) {

        return;

    }



    try {


        initializeSettings();



        initializeRouter();



        initializeUI();

        renderPage(window.location.hash || "#/");



        setupAuthListener();



        setupGlobalEvents();



        applicationReady = true;



        console.log(
            "SumNova application initialized."
        );



    } catch (error) {


        console.error(
            "Application startup failed:",
            error
        );



        hideLoading();



        showToast(

            "Application failed to start.",

            "error"

        );


    }


}








/*
=========================================================
Authentication Listener
=========================================================
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



            hideLoading();



        }

    );


}







/*
=========================================================
Authenticated User Handler
=========================================================
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
=========================================================
Guest User Handler
=========================================================
*/


function handleGuestUser() {


    window.dispatchEvent(

        new Event(

            "userloggedout"

        )

    );


}







/*
=========================================================
Global Events
=========================================================
*/


function setupGlobalEvents() {


    window.addEventListener(

        "routechange",

        () => {


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
=========================================================
Route Change Handler
=========================================================
*/


function handleRouteChange() {

    const route = window.location.hash || "#/";

    renderPage(route);

}







/*
=========================================================
Application Ready Status
=========================================================
*/


export function isAppReady() {


    return applicationReady;


}







/*
=========================================================
Application Information
=========================================================
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
=========================================================
Start Application
=========================================================
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


function renderPage(route) {

    document.getElementById("landing-page").hidden = true;
    document.getElementById("dashboard-page").hidden = true;
    document.getElementById("history-page").hidden = true;
    document.getElementById("settings-page").hidden = true;

    switch (route) {

        case "#/dashboard":
            document.getElementById("dashboard-page").hidden = false;
            break;

        case "#/history":
            document.getElementById("history-page").hidden = false;
            break;

        case "#/settings":
            document.getElementById("settings-page").hidden = false;
            break;

        default:
            document.getElementById("landing-page").hidden = false;
            break;

    }

}
