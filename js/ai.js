/*
    SumNova
    Davonium Technologies

    AI Service Layer

    Responsibilities:
    - AI provider abstraction
    - Summary request handling
    - Future multi-provider support

    Does NOT handle:
    - API keys
    - Authentication
    - UI rendering
*/


import {

    showToast

} from "./ui.js";







/*
    Current AI Provider

    This is intentionally
    configurable.

    Future providers can replace
    this without changing the app.
*/


let aiProvider = null;







/*
    Configure AI Provider

    A backend service can be
    connected later.
*/


export function configureAI(
    provider
) {


    if (

        typeof provider !== "function"

    ) {


        return false;


    }



    aiProvider = provider;



    return true;


}







/*
    Check AI Availability
*/


export function isAIAvailable() {


    return typeof aiProvider === "function";


}







/*
    Generate Summary

    Main AI entry point.
*/


export async function generateSummary(
    content,
    options = {}
) {


    if (!content || !content.trim()) {


        showToast(

            "Please enter text to summarize.",

            "error"

        );


        return null;


    }



    if (!isAIAvailable()) {


        showToast(

            "AI service is not connected yet.",

            "error"

        );


        return null;


    }



    const request = {


        content:


            content.trim(),


        category:

            options.category || "general",


        length:

            options.length || "medium"


    };



    try {


        const response =

            await aiProvider(

                request

            );



        return response;


    } catch (error) {


        showToast(

            "Unable to generate summary.",

            "error"

        );



        return null;


    }


}







/*
    Create AI Request Object

    Keeps request format
    consistent.
*/


export function createAIRequest(
    content,
    options = {}
) {


    return {


        content,


        category:

            options.category || "general",


        length:

            options.length || "medium"


    };


}

/*
    Summary Categories

    Used by the UI to provide
    consistent AI instructions.
*/


export const SUMMARY_CATEGORIES = {


    EXAM:

        "exam",


    ASSIGNMENT:

        "assignment",


    RESEARCH:

        "research",


    BUSINESS:

        "business",


    LECTURE:

        "lecture",


    SIMPLE:

        "simple",


    KEY_POINTS:

        "key-points"


};







/*
    Validate AI Response
*/


export function validateAIResponse(
    response
) {


    if (!response) {


        return false;


    }



    if (

        typeof response !== "string"

        &&

        typeof response !== "object"

    ) {


        return false;


    }



    return true;


}







/*
    Format AI Response

    Keeps output consistent
    for future providers.
*/


export function formatAIResponse(
    response
) {


    if (

        typeof response === "string"

    ) {


        return {


            summary: response,


            provider:

                "unknown"


        };


    }



    return {


        summary:

            response.summary || "",


        provider:

            response.provider || "unknown",


        model:

            response.model || null


    };


}







/*
    Get AI Provider Status
*/


export function getAIStatus() {


    return {


        available:

            isAIAvailable(),


        provider:

            aiProvider

                ? "configured"

                : "not-configured"


    };


}







/*
    Reset AI Provider
*/


export function resetAIProvider() {


    aiProvider = null;


}

