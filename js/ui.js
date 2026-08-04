/*
=========================================================
SumNova
Davonium Technologies

User Interface Module

Responsibilities:
- UI helpers
- Toast messages
- Loading states
- DOM updates
- Modal handling
- Theme switching
- Navigation UI
- Accessibility helpers

Does NOT handle:
- Firebase
- Authentication
- AI logic
=========================================================
*/


import {

    select

} from "./utils.js";





/*
=========================================================
Initialize UI
=========================================================
*/


export function initializeUI() {

    initializeNavigation();

    initializeLandingPage();

    initializeTheme();

}






/*
=========================================================
Navigation
=========================================================
*/


function initializeNavigation() {


    const menuButton = select("#menu-toggle");

    const navigation = select("#navigation-links");



    if (!menuButton || !navigation) {

        return;

    }



    menuButton.addEventListener(
        "click",
        () => {


            const open =
                navigation.classList.toggle(
                    "open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                String(open)
            );


        }
    );


}






/*
=========================================================
Landing Page Buttons
=========================================================
*/



function initializeLandingPage() {

    console.log("initializeLandingPage()");

    const startButton = select("#start-button");
    const loginButton = select("#login-button");

    console.log(startButton);
    console.log(loginButton);

    if (startButton) {

        startButton.addEventListener("click", () => {

            console.log("Start button clicked");

            window.location.hash = "#/dashboard";

        });

    }

    if (loginButton) {

        loginButton.addEventListener("click", () => {

            console.log("Login button clicked");

            window.location.hash = "#/login";

        });

    }

}





/*
=========================================================
Theme
=========================================================
*/


function initializeTheme() {


    const themeButton =
        select("#theme-switch");



    if (!themeButton) {

        return;

    }



    themeButton.addEventListener(
        "click",
        () => {


            document.body.classList.toggle(
                "dark"
            );


        }
    );


}






/*
=========================================================
Loading Screen
=========================================================
*/


export function showLoading() {


    const loader =
        select("#app-loader");



    if (!loader) {

        return false;

    }



    loader.classList.add(
        "active"
    );



    loader.setAttribute(
        "aria-hidden",
        "false"
    );



    return true;


}






export function hideLoading() {


    const loader =
        select("#app-loader");



    if (!loader) {

        return false;

    }



    loader.classList.remove(
        "active"
    );



    loader.setAttribute(
        "aria-hidden",
        "true"
    );



    return true;


}






/*
=========================================================
Toast Notifications
=========================================================
*/


export function showToast(
    message,
    type = "success"
) {


    const container =
        select("#toast-container");



    if (!container) {

        return false;

    }



    const toast =
        document.createElement(
            "div"
        );



    toast.className =
        `toast toast-${type}`;



    toast.textContent =
        message;



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
=========================================================
DOM Helpers
=========================================================
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



    element.textContent =
        text;



    return true;


}






export function toggleVisibility(
    selector,
    visible
) {


    const element =
        select(selector);



    if (!element) {

        return false;

    }



    element.hidden =
        !visible;



    return true;


}






/*
=========================================================
Modal Helpers
=========================================================
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
=========================================================
Button Loading State
=========================================================
*/


export function setButtonLoading(
    button,
    loading
) {


    if (!button) {

        return false;

    }



    button.disabled =
        loading;



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
=========================================================
Navigation Active State
=========================================================
*/


export function setActiveNavigation(
    selector,
    activeElement,
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



    if (activeElement) {


        activeElement.classList.add(
            activeClass
        );


    }


}






/*
=========================================================
Empty State
=========================================================
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



    container.textContent =
        message;



    container.setAttribute(
        "role",
        "status"
    );



    return true;


}






/*
=========================================================
Accessibility Helper
=========================================================
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
