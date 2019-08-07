const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../database/models/user");
const Oweds = require("../database/models/owed");
const Paids = require("../database/models/paid")
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
    function (req, res, next) {
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

router.get("/getAllEvents", (request, response)=>{
    Events.find({})
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err))
})

router.get("/getEventByID/:eventId", (request, response)=>{
console.log("TCL: request", request.params.eventId)
    
    Events.find({_id : request.params.eventId})
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err))
})

router.get("/findOwedByUserId/:userId", (request, response) => {
    console.log("TCL: request=>", request.params.userId)
    Oweds.find({ userId: request.params.userId })
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});
router.get("/findYouOwedByUserId/:userId", (request, response) => {
    console.log("TCL: request=>", request.params.userId)
    Oweds.find({ youOwedTo: request.params.userId })
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});
router.get("/findPaidByUserId/:paidtoId", (request, response) => {
    Paids.find({})
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});
router.post("/findPaidByUserId", (request, response) => {
    let dataToInsert = {
        userId: request.body.userId,
        payerId: request.body.payerId,
        amount: request.body.amount,
        eventName: request.body.eventName
    }
    
    Paids.create(dataToInsert)
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});
router.get("/newEvents/:userId", (request, response) => {
    Events.find({userId: request.params.userId})
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});
router.get("/allEvents", (request, response) => {
    Events.find({})
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err))
})

router.post("/newEvent", (request, response) => {
    let participants = [];
    request.body.usersAttended.forEach(element => {
        participants.push(element.label)
    });
    let dataToInsert = {
        userId: request.body.userId,
        payerId: request.body.payerId,
        amount: request.body.amount,
        eventName: request.body.eventName,
        usersAttended: participants,
        isPaid: false
    }

    Events.create(dataToInsert)
        .then(dbModel => {
            return addToOwedTable(dataToInsert, dbModel._id);
            //response.json(dbModel);
        })
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err));
});

function addToOwedTable(data, eventId) {
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
            eventId: eventId,
            eventName: data.eventName
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

router.post("/pay", (request, response) => {
    dataToInsert={
        userId: request.body.userId,
        payedtoId: request.body.payedtoId,
        amount: request.body.amount,
        eventName: request.body.eventName,
        eventId: request.body.eventId,
        isPaid: true
    }

    Paids.create(dataToInsert)
    .then(dbModel => {
        return updateOwedTable(dataToInsert)
        // response.json(dbModel);
    })
    .then(dbModel => response.json(dbModel))
    .catch(err => response.status(422).json(err))
})
function updateOwedTable(dataToInsert){
    const query = {
        eventId: dataToInsert.eventId, 
        userId: dataToInsert.userId, 
        youOwedTo: dataToInsert.payedtoId
    }
    console.log(query);
    return Oweds.findOneAndUpdate(query, {isPaid : true})
}

router.put("/updateOwedWithPaid", (request, response) => {
    console.log(request.body)
    const query = {
        eventId: request.body.eventId, 
        userId: request.body.userId, 
        youOwedTo: request.body.payedtoId
    }
    Oweds.findOneAndUpdate(query, {isPaid: true})
    .then(dbModel => response.json(dbModel))
    .catch(err => response.status(422).json(err))
})

module.exports = router;
