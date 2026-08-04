/*
    SumNova
    Davonium Technologies

    Utility Functions

    Responsible for:
    - reusable helper methods
    - formatting
    - safe DOM helpers
    - common application utilities

    No:
    - Firebase
    - AI providers
    - secrets
*/


/*
    Generate Unique IDs

    Used for:
    - local records
    - temporary objects
    - UI elements
*/


export function generateId(prefix = "id") {


    return `${prefix}_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 10)}`;


}







/*
    Safe DOM Selector

    Prevents repeated querySelector code.
*/


export function select(selector, parent = document) {


    return parent.querySelector(selector);


}







/*
    Select Multiple Elements
*/


export function selectAll(selector, parent = document) {


    return [
        ...parent.querySelectorAll(selector)
    ];


}







/*
    Create DOM Element

    Helps create reusable UI elements.
*/


export function createElement(
    tag,
    attributes = {},
    content = ""
) {


    const element =
        document.createElement(tag);



    Object.entries(attributes)
        .forEach(
            ([key, value]) => {

                element.setAttribute(
                    key,
                    value
                );

            }
        );



    if (content) {

        element.textContent = content;

    }



    return element;


}







/*
    Debounce Function

    Used for:
    - search
    - input optimization
*/


export function debounce(
    callback,
    delay = 300
) {


    let timer;



    return (...args) => {


        clearTimeout(timer);



        timer = setTimeout(

            () => {

                callback(...args);

            },

            delay

        );


    };


}







/*
    Throttle Function

    Used for:
    - scroll events
    - resize events
*/


export function throttle(
    callback,
    limit = 300
) {


    let waiting = false;



    return (...args) => {


        if (waiting) {

            return;

        }



        callback(...args);



        waiting = true;



        setTimeout(

            () => {

                waiting = false;

            },

            limit

        );


    };


}







/*
    Format Date

    Creates readable dates
*/


export function formatDate(
    date
) {


    if (!date) {

        return "";

    }



    const value =
        new Date(date);



    return value.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );


}


/*
    Sanitize Text

    Prevents unsafe HTML injection
    when displaying user content.
*/


export function sanitizeText(
    value = ""
) {


    return String(value)

        .replace(
            /[&<>"']/g,
            character => {


                const entities = {

                    "&": "&amp;",

                    "<": "&lt;",

                    ">": "&gt;",

                    '"': "&quot;",

                    "'": "&#039;"

                };


                return entities[character];


            }

        );


}







/*
    Copy Text To Clipboard

    Used for:
    - copying summaries
*/


export async function copyToClipboard(
    text
) {


    if (!navigator.clipboard) {


        return false;


    }



    try {


        await navigator.clipboard.writeText(
            text
        );


        return true;


    } catch (error) {


        return false;


    }


}







/*
    Check Network Status
*/


export function isOnline() {


    return navigator.onLine;


}







/*
    Wait Helper

    Useful for:
    - UI timing
    - retry logic
*/


export function wait(
    milliseconds
) {


    return new Promise(

        resolve => {

            setTimeout(
                resolve,
                milliseconds
            );

        }

    );


}







/*
    Format File Size
*/


export function formatFileSize(
    bytes
) {


    if (!bytes || bytes < 0) {


        return "0 Bytes";


    }



    const units = [

        "Bytes",

        "KB",

        "MB",

        "GB"

    ];



    const index = Math.floor(

        Math.log(bytes) /

        Math.log(1024)

    );



    return `${parseFloat(

        (bytes / Math.pow(1024, index))

            .toFixed(2)

    )} ${units[index]}`;

}







/*
    Safe JSON Parse

    Prevents application crashes
    from invalid stored data.
*/


export function safeJsonParse(
    value,
    fallback = null
) {


    try {


        return JSON.parse(value);


    } catch (error) {


        return fallback;


    }


}







/*
    Safe Function Execution

    Prevents unexpected crashes.
*/


export function safeExecute(
    callback,
    fallback = null
) {


    try {


        return callback();


    } catch (error) {


        return fallback;


    }


}







/*
    Retry Helper

    Used for:
    - network recovery
    - future API operations
*/


export async function retryOperation(
    operation,
    attempts = 3,
    delay = 1000
) {


    let lastError;



    for (
        let attempt = 1;
        attempt <= attempts;
        attempt++
    ) {


        try {


            return await operation();


        } catch (error) {


            lastError = error;



            if (
                attempt < attempts
            ) {


                await wait(delay);


            }


        }


    }



    throw lastError;


}







/*
    Get Current Year

    Used for footer copyright.
*/


export function getCurrentYear() {


    return new Date()
        .getFullYear();


}
