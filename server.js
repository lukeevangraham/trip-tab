const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const user = require("./routes/user");
const dbConnection = require("./database");

const PORT = process.env.PORT || 3001;
const app = express();
// const server = require('http').createServer(app);


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Sessions
app.use(
    session({
        secret: "fraggle-rock", //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required
        saveUninitialized: false //required
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser


// Routes
app.use("/user", user);


// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// server.listen(PORT, function() {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });

// Starting Server
app.listen(PORT, () => {
    console.log(`App's Express Server is listening on PORT: ${PORT}`);
});
