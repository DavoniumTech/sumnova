
/*
    SumNova
    Davonium Technologies

    Settings Management Module

    Responsibilities:
    - Application preferences
    - Theme management
    - User preference persistence

    Does NOT handle:
    - Authentication
    - Firebase data
    - AI services
*/


import {

    DEFAULT_SETTINGS,

    THEMES,

    STORAGE_KEYS

} from "./constants.js";



import {

    saveSettings,

    loadSettings,

    saveTheme,

    loadTheme

} from "./storage.js";







/*
    Get Current Settings
*/


export function getSettings() {


    return loadSettings(

        DEFAULT_SETTINGS

    );


}







/*
    Update Settings
*/


export function updateSettings(
    changes = {}
) {


    const currentSettings =
        getSettings();



    const updatedSettings = {


        ...currentSettings,


        ...changes


    };



    saveSettings(

        updatedSettings

    );



    return updatedSettings;


}







/*
    Initialize Settings

    Loads saved preferences
    when application starts.
*/


export function initializeSettings() {


    const settings =
        getSettings();



    if (

        settings.theme

    ) {


        applyTheme(

            settings.theme

        );


    }



    return settings;


}







/*
    Save Theme Selection
*/


export function setTheme(
    theme
) {


    if (

        !Object.values(THEMES)

            .includes(theme)

    ) {


        return false;


    }



    saveTheme(

        theme

    );



    updateSettings({

        theme

    });



    applyTheme(

        theme

    );



    return true;


}







/*
    Get Current Theme
*/


export function getTheme() {


    return loadTheme(

        DEFAULT_SETTINGS.THEME

    );


}







/*
    Apply Theme To Document
*/


export function applyTheme(
    theme
) {


    if (

        typeof document === "undefined"

    ) {


        return;


    }



    document.documentElement

        .setAttribute(

            "data-theme",

            theme

        );


}


/*
    Toggle Theme

    Switches between
    light and dark mode.
*/


export function toggleTheme() {


    const currentTheme =
        getTheme();



    const newTheme =

        currentTheme === THEMES.DARK

            ? THEMES.LIGHT

            : THEMES.DARK;



    setTheme(

        newTheme

    );



    return newTheme;


}







/*
    Notification Preference
*/


export function setNotifications(
    enabled
) {


    return updateSettings({

        notifications:

            Boolean(enabled)

    });


}







/*
    Get Notification Preference
*/


export function notificationsEnabled() {


    const settings =
        getSettings();



    return Boolean(

        settings.notifications

    );


}







/*
    Language Preference Foundation

    Prepared for future
    internationalization.
*/


export function setLanguage(
    language
) {


    return updateSettings({

        language

    });


}







/*
    Get Current Language
*/


export function getLanguage() {


    const settings =
        getSettings();



    return settings.language ||

        DEFAULT_SETTINGS.LANGUAGE;


}







/*
    Reset Settings

    Restores application defaults.
*/


export function resetSettings() {


    saveSettings(

        DEFAULT_SETTINGS

    );



    applyTheme(

        DEFAULT_SETTINGS.THEME

    );



    return DEFAULT_SETTINGS;


}







/*
    Check Dark Mode
*/


export function isDarkMode() {


    return (

        getTheme() === THEMES.DARK

    );


}
