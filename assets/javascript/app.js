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

        if (!moment(firstTrainTime, "HH:mm").isValid() || firstTrainTime.length !== 4) {
            alert("Please enter a time in the correct format.");
            // Clear only time field and focus
            $("#first-train-time").val("").focus();
        } else {
            // Clear form fields
            $("#train-name, #destination, #first-train-time, #frequency").val("");

            // Post values to Firebase
            var newTrain = database.ref("trainList").push({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency
            });
        }
    });

    /*
    =============================================
    Event Listeners
    =============================================
    */

    // Listens for changes in Firebase | Updates DOM
    database.ref().on("value", function (snapshot) {
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

            // Get a reference to the current time
            var now = moment();

            // Create starting time for nextTrain variable based on firstTrainTime
            var nextTrain = moment(thisTrain.firstTrainTime, "HH:mm").format("HH:mm");

            // If firstTrainTime is in the past, calculate number of trains that have passed and assign nextTrain value to the most immediate upcoming train time
            if (moment(thisTrain.firstTrainTime, "HH:mm").diff(now, "minutes") < 0) {
                for (var i = 0; i <= Math.abs(moment(thisTrain.firstTrainTime, "HH:mm").diff(now, "minutes") / thisTrain.frequency); i++) {
                    nextTrain = moment(nextTrain, "HH:mm").add(thisTrain.frequency, "m").format("HH:mm");
                }
            }
            // If firstTrainTime is in the future, assign nextTrain value to that time
            else {
                nextTrain = moment(thisTrain.firstTrainTime, "HH:mm");
            };

            // Calculate difference between next train and current time
            var minutesAway = moment(nextTrain, "HH:mm").diff(now, "minutes") + 1;

            // Assign $arrival variable the value of nextTrain, formatted
            var $arrival = $("<td>").text(moment(nextTrain, "HH:mm").format("h:mm A"));

            // Assign $minutes varialbe the value of minutesAway
            var $minutes = $("<td>").text(minutesAway);

            // Append table elements to the DOM
            $tr.append($name).append($destination).append($frequency).append($arrival).append($minutes);

            $("#table-body").append($tr);

        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});