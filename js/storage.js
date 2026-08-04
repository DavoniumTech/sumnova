/*
    SumNova
    Davonium Technologies

    Local Storage Service

    Responsibilities:
    - Browser local storage management
    - Safe data persistence
    - JSON storage helpers

    Does NOT handle:
    - Firebase Storage
    - File uploads
    - Cloud database
    - Authentication secrets
*/


import {
    safeJsonParse
} from "./utils.js";





/*
    Check if browser storage
    is available.
*/


export function isStorageAvailable() {


    try {


        const testKey =
            "__sumnova_storage_test__";


        localStorage.setItem(
            testKey,
            "test"
        );


        localStorage.removeItem(
            testKey
        );


        return true;


    } catch (error) {


        return false;


    }


}







/*
    Save text value
*/


export function setItem(
    key,
    value
) {


    if (!isStorageAvailable()) {


        return false;


    }



    try {


        localStorage.setItem(
            key,
            value
        );


        return true;


    } catch (error) {


        return false;


    }


}







/*
    Read text value
*/


export function getItem(
    key,
    defaultValue = null
) {


    if (!isStorageAvailable()) {


        return defaultValue;


    }



    try {


        const value =
            localStorage.getItem(key);



        return value ?? defaultValue;


    } catch (error) {


        return defaultValue;


    }


}







/*
    Delete stored value
*/


export function removeItem(
    key
) {


    if (!isStorageAvailable()) {


        return false;


    }



    try {


        localStorage.removeItem(
            key
        );


        return true;


    } catch (error) {


        return false;


    }


}







/*
    Save JSON object
*/


export function setJson(
    key,
    data
) {


    try {


        return setItem(

            key,

            JSON.stringify(data)

        );


    } catch (error) {


        return false;


    }


}







/*
    Read JSON object
*/


export function getJson(
    key,
    defaultValue = null
) {


    const value =
        getItem(key);



    if (!value) {


        return defaultValue;


    }



    return safeJsonParse(

        value,

        defaultValue

    );


}







/*
    Clear all SumNova
    local storage data.
*/


export function clearAllStorage() {


    if (!isStorageAvailable()) {


        return false;


    }



    try {


        localStorage.clear();


        return true;


    } catch (error) {


        return false;


    }


}

/*
    Save Application Settings

    Stores user preferences locally.
*/


export function saveSettings(
    settings
) {


    return setJson(

        "sumnova_settings",

        settings

    );


}







/*
    Load Application Settings
*/


export function loadSettings(
    defaultSettings = {}
) {


    return getJson(

        "sumnova_settings",

        defaultSettings

    );


}







/*
    Save Theme Preference
*/


export function saveTheme(
    theme
) {


    return setItem(

        "sumnova_theme",

        theme

    );


}







/*
    Load Theme Preference
*/


export function loadTheme(
    defaultTheme = "light"
) {


    return getItem(

        "sumnova_theme",

        defaultTheme

    );


}







/*
    Save Temporary User State

    This is only for local UI support.

    Permanent user data belongs
    in Firestore.
*/


export function saveUserState(
    user
) {


    return setJson(

        "sumnova_user",

        user

    );


}







/*
    Load Temporary User State
*/


export function loadUserState() {


    return getJson(

        "sumnova_user",

        null

    );


}







/*
    Offline Action Queue

    Foundation for future:
    - offline sync
    - pending actions
*/


export function saveOfflineQueue(
    queue = []
) {


    return setJson(

        "sumnova_offline_queue",

        queue

    );


}







/*
    Load Offline Queue
*/


export function loadOfflineQueue() {


    return getJson(

        "sumnova_offline_queue",

        []

    );


}







/*
    Remove Specific SumNova Data
*/


export function removeStorageData(
    key
) {


    return removeItem(
        key
    );


}







/*
    Get Storage Usage Estimate

    Useful for diagnostics.
*/


export function getStorageEstimate() {


    try {


        let total = 0;



        for (

            let key = 0;

            key < localStorage.length;

            key++

        ) {


            const itemKey =
                localStorage.key(key);



            total +=

                itemKey.length +

                localStorage

                    .getItem(itemKey)

                    .length;


        }



        return {


            bytes: total,


            kilobytes:

                Math.round(

                    total / 1024

                )


        };


    } catch (error) {


        return {


            bytes: 0,


            kilobytes: 0


        };


    }


}
