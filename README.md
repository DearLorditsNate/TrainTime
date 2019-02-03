# TrainTime

A simple app utilizing Firebase for data-permanence and user input that tracks train schedules.

**Features include:**
* User can add new trains to the tracker
    * Logic prevents incorrect user input (wrong time format)
* User input is stored and retrieved from Firebase database
    * Page is populated from Firebase on page load **and** when a change is made in Firebase
* Only stores original user input in Firebase to reduce server load
* Utilizes Moment.js to calculate times
    * "Next Arrival" and "Minutes Away" calculated based on "First Train Time" entered by user and stored in Firebase
    * Upon page refresh, "Next Arrival" and "Minutes Away" will update to reflect accurate calculations against user's local time

## Use the app here:

https://dearlorditsnate.github.io/TrainTime/