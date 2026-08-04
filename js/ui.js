/*
    SumNova
    Davonium Technologies

    User Interface Module

    Responsibilities:
    - UI helpers
    - Toast messages
    - Loading states
    - DOM updates

    Does NOT handle:
    - Firebase
    - Authentication
    - AI logic
*/


import {

    select

} from "./utils.js";







/*
    Show Loading Screen
*/


export function showLoading() {


    const loader =
        select("#loading-screen");



    if (!loader) {


        return;


    }



    loader.classList.add(

        "active"

    );



    loader.setAttribute(

        "aria-hidden",

        "false"

    );


}







/*
    Hide Loading Screen
*/


export function hideLoading() {

    console.log("Inside hideLoading");

    const loader = document.getElementById("app-loader");

    console.log(loader);

    if (loader) {

        loader.style.display = "none";

    }

}







/*
    Create Toast Notification
*/


export function showToast(
    message,
    type = "success"
) {


    const container =

        select(

            "#toast-container"

        );



    if (!container) {


        return false;


    }



    const toast =

        document.createElement(

            "div"

        );



    toast.className =

        `toast toast-${type}`;



    toast.textContent = message;



    toast.setAttribute(

        "role",

        "alert"

    );



    container.appendChild(

        toast

    );



    setTimeout(

        () => {


            toast.remove();


        },

        4000

    );



    return true;


}







/*
    Update Element Text Safely
*/


export function updateText(
    selector,
    text
) {


    const element =
        select(selector);



    if (!element) {


        return false;


    }



    element.textContent = text;



    return true;


}







/*
    Toggle Element Visibility
*/


export function toggleVisibility(
    selector,
    visible
) {


    const element =
        select(selector);



    if (!element) {


        return false;


    }



    element.hidden = !visible;



    return true;


}

/*
    Show Modal
*/


export function showModal(
    selector
) {


    const modal =
        select(selector);



    if (!modal) {


        return false;


    }



    modal.classList.add(

        "active"

    );



    modal.setAttribute(

        "aria-hidden",

        "false"

    );



    return true;


}







/*
    Hide Modal
*/


export function hideModal(
    selector
) {


    const modal =
        select(selector);



    if (!modal) {


        return false;


    }



    modal.classList.remove(

        "active"

    );



    modal.setAttribute(

        "aria-hidden",

        "true"

    );



    return true;


}







/*
    Set Button Loading State
*/


export function setButtonLoading(
    button,
    loading
) {


    if (!button) {


        return false;


    }



    button.disabled = loading;



    button.setAttribute(

        "aria-busy",

        String(loading)

    );



    if (loading) {


        button.dataset.originalText =

            button.textContent;



        button.textContent =

            "Loading...";


    } else {


        button.textContent =

            button.dataset.originalText ||

            button.textContent;


    }



    return true;


}







/*
    Update Active Navigation Item
*/


export function setActiveNavigation(
    selector,
    activeClass = "active"
) {


    const items =

        document.querySelectorAll(

            selector

        );



    items.forEach(

        item => {


            item.classList.remove(

                activeClass

            );


        }

    );


}







/*
    Show Empty State
*/


export function showEmptyState(
    selector,
    message
) {


    const container =
        select(selector);



    if (!container) {


        return false;


    }



    container.textContent = message;



    container.setAttribute(

        "role",

        "status"

    );



    return true;


}







/*
    Focus Element

    Improves keyboard accessibility.
*/


export function focusElement(
    selector
) {


    const element =
        select(selector);



    if (!element) {


        return false;


    }



    element.focus();



    return true;


}

