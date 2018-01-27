// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Star Wars Characters (DATA)
// =============================================================
var waitList = [];

var reservations = [
  {
  //  routeName: "yoda",
    customerName: "Ayanna",
    phoneNumber: 3215675217,
    customerEmail: "scoonz@gmail.com",
    customerID: "tjdght"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/reserve.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/view.html"));
});
// Search for Specific Character (or all characters) - provides JSON
app.get("/api/reservations", function(req, res) {
//   var chosen = req.params.reservations;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < reservations.length; i++) {
//       if (chosen === reservations[i].routeName) {
//         return res.json(reservations[i]);
//       }
//     }

//     return res.json(false);
//   }
  return res.json(reservations);
});

app.get("/api/waitList", function(req, res) {
    // var chosen = req.params.reservations;
  
    // if (chosen) {
    //   console.log(chosen);
  
    //   for (var i = 0; i < reservations.length; i++) {
    //     if (chosen === reservations[i].routeName) {
    //       return res.json(reservations[i]);
    //     }
    //   }
  
    //   return res.json(false);
    //}
    return res.json(waitList);
  });



// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.custName.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if (reservations.length < 5) {

     reservations.push(newReservation);

  }
  
  else {
      waitList.push(newReservation)
  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
