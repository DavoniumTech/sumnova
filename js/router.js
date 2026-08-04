/*
    SumNova
    Davonium Technologies

    Application Router

    Responsibilities:
    - Client-side navigation
    - Route management
    - Protected route foundation

    Does NOT handle:
    - Authentication requests
    - Firebase operations
    - UI rendering logic
*/


import {

    select

} from "./utils.js";







/*
    Application Routes

    Public:
    - landing
    - login
    - register

    Protected:
    - dashboard
    - profile
*/


const routes = {


    "/":

    {

        name: "home",

        protected: false

    },


    "#/login":

    {

        name: "login",

        protected: false

    },


    "#/register":

    {

        name: "register",

        protected: false

    },


    "#/dashboard":

    {

        name: "dashboard",

        protected: true

    },


    "#/profile":

    {

        name: "profile",

        protected: true

    }


};







let currentRoute = "/";







/*
    Get Current Route
*/


export function getCurrentRoute() {


    return currentRoute;


}







/*
    Find Route
*/


export function findRoute(
    path
) {


    return (

        routes[path]

        || null

    );


}







/*
    Check Protected Route
*/


export function isProtectedRoute(
    path
) {


    const route =
        findRoute(path);



    return Boolean(

        route &&

        route.protected

    );


}







/*
    Navigate To Route
*/


export function navigate(
    path
) {


    const route =
        findRoute(path);



    if (!route) {


        path = "/";


    }



    window.location.hash = path;


}


/*
    Route Change Listener System
*/


const routeListeners = [];







/*
    Subscribe To Route Changes
*/


export function onRouteChange(
    callback
) {


    if (

        typeof callback !== "function"

    ) {


        return false;


    }



    routeListeners.push(

        callback

    );



    return true;


}







/*
    Notify Route Listeners
*/


function notifyRouteListeners() {


    routeListeners.forEach(

        callback => {


            try {


                callback(

                    currentRoute

                );


            } catch (error) {


                return;


            }


        }

    );


}







/*
    Browser Back And Forward Support
*/


export function initializeRouter() {


    window.addEventListener("hashchange", () => {

    currentRoute = window.location.hash || "#/";

    notifyRouteListeners();

    window.dispatchEvent(new Event("routechange"));

});



    currentRoute = window.location.hash || "#/";



    notifyRouteListeners();


}







/*
    Protected Route Guard Foundation

    Authentication logic will be
    provided by auth.js.
*/


export function requireAuthentication(
    isAuthenticated,
    redirectPath = "/login"
) {


    if (

        isAuthenticated

    ) {


        return true;


    }



    navigate(

        redirectPath

    );



    return false;


}







/*
    Get All Available Routes
*/


export function getRoutes() {


    return {

        ...routes

    };


}







/*
    Render Route Helper

    Allows app.js to connect
    UI rendering with routing.
*/


export function renderRoute(
    callback
) {


    onRouteChange(

        callback

    );



    callback(

        currentRoute

    );


}
      
