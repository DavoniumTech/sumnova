/*
    SumNova
    Davonium Technologies

    Application Constants

    Central location for:
    - app configuration
    - shared values
    - collection names
    - UI constants

    No secrets should exist here.
*/



export const APP_CONFIG = {


    NAME: "SumNova",


    COMPANY: "Davonium Technologies",


    TAGLINE: "Learn Faster. Understand Better.",


    VERSION: "1.0.0",


    DESCRIPTION:
        "AI-powered study assistant for intelligent summaries."


};





/*
    Application Routes

    Used by router.js
*/


export const ROUTES = {


    HOME: "home",


    LOGIN: "login",


    REGISTER: "register",


    DASHBOARD: "dashboard",


    HISTORY: "history",


    PROFILE: "profile",


    SETTINGS: "settings",


    NOT_FOUND: "not-found"


};







/*
    Firebase Firestore Collections

    Used by firestore.js

    Keep names centralized
*/


export const FIRESTORE_COLLECTIONS = {


    USERS: "users",


    PROFILES: "profiles",


    SUMMARIES: "summaries",


    PREFERENCES: "preferences",


    USAGE: "usage",


    SUBSCRIPTIONS: "subscriptions",


    PAYMENTS: "payments",


    NOTIFICATIONS: "notifications",


    ANALYTICS: "analytics"


};







/*
    Local Storage Keys

    Used by storage.js
*/


export const STORAGE_KEYS = {


    THEME:
        "sumnova_theme",


    USER:
        "sumnova_user",


    OFFLINE_QUEUE:
        "sumnova_offline_queue",


    SETTINGS:
        "sumnova_settings"


};



/*
    AI Summary Categories

    Used by:
    - ai.js
    - UI category selector
    - summary generation flow
*/


export const SUMMARY_CATEGORIES = [

    {
        id: "exam",
        name: "Exam Summary",
        description:
            "Summarize content for exam preparation."
    },


    {
        id: "assignment",
        name: "Assignment Summary",
        description:
            "Create structured notes for assignments."
    },


    {
        id: "research",
        name: "Research Paper Summary",
        description:
            "Extract important research information."
    },


    {
        id: "meeting",
        name: "Business Meeting Summary",
        description:
            "Summarize discussions and decisions."
    },


    {
        id: "lecture",
        name: "Lecture Notes Summary",
        description:
            "Convert lecture notes into clear summaries."
    },


    {
        id: "simple",
        name: "Simple Explanation",
        description:
            "Explain difficult information simply."
    },


    {
        id: "key-points",
        name: "Key Points",
        description:
            "Extract the most important points."
    }

];







/*
    Application Limits

    Prepared for:
    - free plan
    - premium plan
    - usage tracking
*/


export const LIMITS = {


    MAX_INPUT_CHARACTERS:
        15000,


    MAX_SUMMARY_HISTORY_ITEMS:
        100,


    MAX_SEARCH_LENGTH:
        100,


    MAX_PROFILE_NAME_LENGTH:
        50


};







/*
    Default User Preferences
*/


export const DEFAULT_SETTINGS = {


    THEME:
        "light",


    LANGUAGE:
        "en",


    NOTIFICATIONS:
        true,


    OFFLINE_MODE:
        true


};







/*
    Theme Constants
*/


export const THEMES = {


    LIGHT:
        "light",


    DARK:
        "dark"


};







/*
    Notification Types

    Used by ui.js
*/


export const NOTIFICATION_TYPES = {


    SUCCESS:
        "success",


    ERROR:
        "error",


    WARNING:
        "warning",


    INFO:
        "info"


};







/*
    Error Messages

    User-friendly messages only.

    Never expose internal errors.
*/


export const ERROR_MESSAGES = {


    GENERIC:
        "Something went wrong. Please try again.",


    NETWORK:
        "Connection problem. Check your internet connection.",


    AUTH:
        "Authentication failed. Please check your details.",


    INVALID_INPUT:
        "Please enter valid information.",


    AI_FAILURE:
        "Summary generation failed. Please try again.",


    FIREBASE:
        "Unable to complete this request right now."


};







/*
    Subscription Preparation

    Future monetization support
*/


export const PLANS = {


    FREE:
        "free",


    PREMIUM:
        "premium",


    ENTERPRISE:
        "enterprise"


};







/*
    Application Events

    Used for future analytics
*/


export const EVENTS = {


    USER_REGISTERED:
        "user_registered",


    USER_LOGIN:
        "user_login",


    SUMMARY_CREATED:
        "summary_created",


    SUMMARY_DELETED:
        "summary_deleted",


    SUBSCRIPTION_STARTED:
        "subscription_started"


};
