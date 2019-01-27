$(document).ready(function() {
    /*
    =============================================
    Initialize Firebase
    =============================================
    */

    var config = {
        apiKey: "AIzaSyAjHIlENz6zJwV8XHKDUNGdHX-t4Hfv2fE",
        authDomain: "traintime-a2459.firebaseapp.com",
        databaseURL: "https://traintime-a2459.firebaseio.com",
        projectId: "traintime-a2459",
        storageBucket: "",
        messagingSenderId: "368263568372"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    /*
    =============================================
    Global Variables
    =============================================
    */


    /*
    =============================================
    Function Calls
    =============================================
    */

    // Tests
    database.ref().set({
        test: "first test",
        secondTest: ["first array item", "second array item"]
    });


});