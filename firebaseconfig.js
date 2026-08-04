/*
    SumNova
    Davonium Technologies

    Firebase Configuration

    Responsibilities:
    - Initialize Firebase
    - Export Firebase services

    Does NOT handle:
    - Authentication logic
    - Firestore operations
    - UI
    - AI
*/


import {

    initializeApp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

    getAuth

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

    getFirestore

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const firebaseConfig = {


    apiKey:
        "AIzaSyC_wFcqMeU2HbjN80X4D-CRcRcHbxUALY0",


    authDomain:
        "davonium-sumnova.firebaseapp.com",


    projectId:
        "davonium-sumnova",


    storageBucket:
        "davonium-sumnova.firebasestorage.app",


    messagingSenderId:
        "477112153443",


    appId:
        "1:477112153443:web:7466776b530d05dd410f56"


};





const app = initializeApp(

    firebaseConfig

);





const auth = getAuth(

    app

);





const db = getFirestore(

    app

);





export {

    app,

    auth,

    db

};
