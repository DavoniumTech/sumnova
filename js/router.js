/*
=========================================================
SumNova
Davonium Technologies

Application Router

Responsibilities:
- Client-side routing
- Route registration
- Page rendering
- Navigation
- Route events

Does NOT handle:
- Firebase
- Authentication
- AI logic
- UI initialization
=========================================================
*/





/*
=========================================================
Routes
=========================================================
*/

const routes = {

    "#/": {

        page: "landing-page",
        protected: false

    },

    "#/login": {

        page: "landing-page",
        protected: false

    },

    "#/register": {

        page: "landing-page",
        protected: false

    },

    "#/dashboard": {

        page: "dashboard-page",
        protected: true

    },

    "#/history": {

        page: "history-page",
        protected: true

    },

    "#/settings": {

        page: "settings-page",
        protected: true

    }

};





/*
=========================================================
Router State
=========================================================
*/

let currentRoute = "#/";

const routeListeners = [];





/*
=========================================================
Public API
=========================================================
*/

export function getCurrentRoute() {

    return currentRoute;

}



export function getRoutes() {

    return {

        ...routes

    };

}



export function findRoute(path) {

    return routes[path] || null;

}



export function isProtectedRoute(path) {

    const route = findRoute(path);

    return route ? route.protected : false;

}




/*
=========================================================
Navigation
=========================================================
*/

export function navigate(path) {

    if (!findRoute(path)) {

        path = "#/";

    }

    if (window.location.hash === path) {

        updateRoute(path);

        return;

    }

    window.location.hash = path;

}





/*
=========================================================
Route Listeners
=========================================================
*/

export function onRouteChange(callback) {

    if (typeof callback !== "function") {

        return false;

    }

    routeListeners.push(callback);

    return true;

}





function notifyRouteListeners() {

    routeListeners.forEach(listener => {

        try {

            listener(currentRoute);

        }

        catch (error) {

            console.error(
                "Route listener failed:",
                error
            );

        }

    });

}





/*
=========================================================
Route Update
=========================================================
*/

function updateRoute(path) {

    currentRoute = path;

    renderCurrentPage();

    notifyRouteListeners();

    window.dispatchEvent(

        new CustomEvent(

            "routechange",

            {

                detail: {

                    route: currentRoute

                }

            }

        )

    );

}



/*
=========================================================
Page Rendering
=========================================================
*/

function renderCurrentPage() {

    const pages = document.querySelectorAll(".page-section");

    pages.forEach(page => {

        page.hidden = true;

    });

    const route = findRoute(currentRoute);

    if (!route) {

        currentRoute = "#/";

        return renderCurrentPage();

    }

    const page = document.getElementById(route.page);

    if (page) {

        page.hidden = false;

    }

    updateNavigation();

}





/*
=========================================================
Navigation Highlight
=========================================================
*/

function updateNavigation() {

    const links = document.querySelectorAll("[data-route]");

    links.forEach(link => {

        link.classList.remove("active");

    });

    const route = findRoute(currentRoute);

    if (!route) {

        return;

    }

    links.forEach(link => {

        const target = link.getAttribute("href");

        if (target === currentRoute) {

            link.classList.add("active");

        }

    });

}



/*
=========================================================
Router Initialization
=========================================================
*/

export function initializeRouter() {

    currentRoute = window.location.hash || "#/";

    if (!findRoute(currentRoute)) {

        currentRoute = "#/";
        window.location.hash = "#/";

    }

    renderCurrentPage();

    notifyRouteListeners();

    window.addEventListener(

        "hashchange",

        () => {

            updateRoute(

                window.location.hash || "#/"

            );

        }

    );

}





/*
=========================================================
Authentication Guard
=========================================================
*/

export function requireAuthentication(

    isAuthenticated,
    redirectPath = "#/login"

) {

    if (!isProtectedRoute(currentRoute)) {

        return true;

    }

    if (isAuthenticated) {

        return true;

    }

    navigate(redirectPath);

    return false;

}





/*
=========================================================
Route Rendering Helper
=========================================================
*/

export function renderRoute(callback) {

    if (typeof callback === "function") {

        onRouteChange(callback);

        callback(currentRoute);

    }

}




