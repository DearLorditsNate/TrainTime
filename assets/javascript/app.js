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
    Click Handlers
    =============================================
    */

    // Submit button
    $("#submit").on("click", function() {
        event.preventDefault();

        // Get values from form fields
        var trainName = $("#train-name").val();
        var destination = $("#destination").val();
        var firstTrainTime = $("#first-train-time").val();
        var frequency = $("#frequency").val();

        // Clear form fields
        $("#train-name, #destination, #first-train-time, #frequency").val("");

        // Post values to Firebase
        var newTrain = database.ref("trainList").push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });

        console.log(newTrain.key);

    });

    /*
    =============================================
    Event Listeners
    =============================================
    */

    database.ref().on("value", function(snapshot) {
        // Empty table to prevent dupes
        $("#table-body").empty();

        // Loop through items stored in database and print to table
        for (i in snapshot.val().trainList) {
            // Reference to the train
            var thisTrain = snapshot.val().trainList[i];

            // Create table elements
            var $tr = $("<tr>");
            var $name = $("<td>").text(thisTrain.trainName);
            var $destination = $("<td>").text(thisTrain.destination);
            var $frequency = $("<td>").text(thisTrain.frequency);
            var $arrival = $("<td>").text("arrival time");
            var $minutes = $("<td>").text("minutes away");

            // Append table elements to the DOM
            $tr.append($name).append($destination).append($frequency).append($arrival).append($minutes);

            $("#table-body").append($tr);

        }
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });



    /*
    =============================================
    Function Calls
    =============================================
    */

    // Tests
    // database.ref().set({
    //     test: "first test",
    //     secondTest: ["first array item", "second array item"]
    // });

    // $("#table-body").empty();


});