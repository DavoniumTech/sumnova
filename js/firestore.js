/*
    SumNova
    Davonium Technologies

    Firestore Data Layer

    Responsibilities:
    - User data operations
    - Summary history operations
    - Firestore abstraction

    Does NOT handle:
    - Authentication UI
    - AI generation
    - Payment processing
*/


import {

    db

} from "../firebaseconfig.js";


import {

    doc,

    setDoc,

    getDoc,

    updateDoc,

    collection,

    addDoc,

    getDocs,

    deleteDoc,

    query,

    where,

    orderBy,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";







/*
    Create User Profile
*/


export async function createUserProfile(
    userId,
    profileData = {}
) {


    try {


        await setDoc(

            doc(
                db,
                "users",
                userId
            ),

            {

                ...profileData,

                createdAt:
                    serverTimestamp(),

                updatedAt:
                    serverTimestamp()

            }

        );


        return true;


    } catch (error) {


        return false;


    }


}







/*
    Get User Profile
*/


export async function getUserProfile(
    userId
) {


    try {


        const snapshot =

            await getDoc(

                doc(
                    db,
                    "users",
                    userId
                )

            );


        if (!snapshot.exists()) {


            return null;


        }


        return {

            id: snapshot.id,

            ...snapshot.data()

        };


    } catch (error) {


        return null;


    }


}







/*
    Update User Profile
*/


export async function updateUserProfile(
    userId,
    updates
) {


    try {


        await updateDoc(

            doc(
                db,
                "users",
                userId
            ),

            {

                ...updates,

                updatedAt:
                    serverTimestamp()

            }

        );


        return true;


    } catch (error) {


        return false;


    }


}



/*
    Save Generated Summary

    Stores user summary history.
*/


export async function saveSummary(
    userId,
    summaryData = {}
) {


    try {


        const summariesRef =

            collection(

                db,

                "users",

                userId,

                "summaries"

            );



        const result =

            await addDoc(

                summariesRef,

                {

                    ...summaryData,

                    createdAt:

                        serverTimestamp()

                }

            );



        return result.id;


    } catch (error) {


        return null;


    }


}







/*
    Get User Summaries
*/


export async function getUserSummaries(
    userId
) {


    try {


        const summariesRef =

            collection(

                db,

                "users",

                userId,

                "summaries"

            );



        const summariesQuery =

            query(

                summariesRef,

                orderBy(

                    "createdAt",

                    "desc"

                )

            );



        const snapshot =

            await getDocs(

                summariesQuery

            );



        return snapshot.docs.map(

            item => ({

                id:

                    item.id,


                ...item.data()

            })

        );


    } catch (error) {


        return [];


    }


}







/*
    Delete Summary
*/


export async function deleteSummary(
    userId,
    summaryId
) {


    try {


        await deleteDoc(

            doc(

                db,

                "users",

                userId,

                "summaries",

                summaryId

            )

        );


        return true;


    } catch (error) {


        return false;


    }


}







/*
    Save Usage Data

    Foundation for:
    - free plan limits
    - premium limits
    - analytics
*/


export async function updateUsage(
    userId,
    usageData = {}
) {


    try {


        await setDoc(

            doc(

                db,

                "users",

                userId,

                "usage",

                "current"

            ),

            {

                ...usageData,

                updatedAt:

                    serverTimestamp()

            },

            {

                merge: true

            }

        );


        return true;


    } catch (error) {


        return false;


    }


}







/*
    Get Usage Data
*/


export async function getUsage(
    userId
) {


    try {


        const snapshot =

            await getDoc(

                doc(

                    db,

                    "users",

                    userId,

                    "usage",

                    "current"

                )

            );



        if (!snapshot.exists()) {


            return null;


        }



        return snapshot.data();


    } catch (error) {


        return null;


    }


}
