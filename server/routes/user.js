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

router.get("/allUsers", (request, response) => {
    User.find({})
    .then(dbModel => response.json(dbModel))
    .catch(err => response.status(422).json(err))
})

router.get("/findOwedByUserId/:userId", (request, response) => {
    console.log("TCL: request=>", request.params.userId)
    Oweds.find({ userId: request.params.userId })
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});

router.post("/newEvent", (request, response) => {
// console.log("TCL: reques.bodyt=============================>", request.body)
    // add this data to events database
//     { userId: 'test',
// [1]   payerId: 'ajay',
// [1]   amount: '400',
// [1]   eventName: 'dinner',
// [1]   paid: true,
// [1]   usersAttended:
// [1]    [ { value: '5d37b7342d28484a70f4afd7', label: 'luke' },
// [1]      { value: '5d3935963c78e75f47526779', label: 'test' } ] }
    let participants = [];
    request.body.usersAttended.forEach(element => {
        participants.push(element.label)
    });
    let dataToInsert = {
        userId: request.body.userId,
        payerId: request.body.payerId,
        amount: request.body.amount,
        eventName : request.body.eventName,
        paid: request.body.paid,
        usersAttended: participants
    }
    console.log("TCL: dataToInsert========================================", dataToInsert)
    
    Events.create(dataToInsert)
    .then(dbModel => {
        console.log("TCL: dbModel", dbModel);
        return addToOwedTable(dataToInsert, dbModel._id);
        //response.json(dbModel);
    })
    .then(dbModel => response.json(dbModel))
    .catch(err => response.status(422).json(err));
});

function addToOwedTable(data, eventId) {
    console.log("TCL: addToOwedTable -> =======================>>>data", data);
    let listOfUsersThatOwes = usersThatOwedForThisEvent(
        data.usersAttended,
        data.payerId
    );
    let howMuchTheyOwe = data.amount / data.usersAttended.length;
    listOfUsersThatOwes.forEach(element => {
        const datatoInsert = {
            userId: element,
            youOwedTo: data.payerId,
            amount: howMuchTheyOwe,
            eventName: eventId
        };
        console.log("data to inster =======>>", datatoInsert)
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
