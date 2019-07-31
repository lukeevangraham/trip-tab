const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const Oweds = require("../database/models/owed");
const Events = require("../database/models/event");
const passport = require("../passport");

let userName;

router.post("/", (req, res) => {
    console.log("user signup");

    const { username, password } = req.body;
  // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
    if (err) {
        console.log("User.js post error: ", err);
    } else if (user) {
        res.json({
        error: `Sorry, already a user with the username: ${username}`
        });
    } else {
        const newUser = new User({
        username: username,
        password: password
        });
        newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
        });
    }
    });
});

router.post(
    "/login",
    function(req, res, next) {
        console.log("routes/user.js, login, req.body: ");
        console.log(req.body);
        next();
    },
    passport.authenticate("local"),
    (req, res) => {
        console.log("logged in", req.user);
        userName = req.user.username;
        var userInfo = {
            username: req.user.username
        };
            res.send(userInfo);
        }
);

router.get("/", (req, res, next) => {
    console.log("===== user!!======");
    console.log(req.user);
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

router.post("/logout", (req, res) => {
    if (req.user) {
        req.logout();
        res.send({ msg: "logging out" });
    } else {
        res.send({ msg: "no user to log out" });
    }
});

router.get("/findOwedByUserId/:userId", (request, response) => {
    console.log("TCL: request================>>>>>>>>>>>>", request.params.userId)
    Oweds.find({ userId: request.params.userId })
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});

router.post("/newEvent", (request, response) => {
    //add this data to events database
    Events.create(request.body)
    .then(dbModel => {
        console.log("TCL: dbModel", dbModel);
        return addToOwedTable(request.body, dbModel._id);
        //response.json(dbModel);
    })
    .then(dbModel => response.json(dbModel))
    .catch(err => response.status(422).json(err));
});

function addToOwedTable(data, eventId) {
    console.log("TCL: addToOwedTable -> data", data);
    let listOfUsersThatOwes = usersThatOwedForThisEvent(
        data.usersAttended,
        data.payerId
    );
    let howMuchTheyOwe = data.amount / data.usersAttended.length;
    console.log("TCL: howMuchTheyOwe", howMuchTheyOwe);
    listOfUsersThatOwes.forEach(element => {
        const datatoInsert = {
            userId: element,
            youOwedTo: data.userId,
            amount: howMuchTheyOwe,
            eventName: eventId
        };
    return Oweds.create(datatoInsert);
    });
}

function usersThatOwedForThisEvent(anArrayOfUsers, userPaid) {
    let returnArray = [];
    anArrayOfUsers.forEach(element => {
        if (element !== userPaid) {
            returnArray.push(element);
        }
    });
    return returnArray;
}

module.exports = router;
