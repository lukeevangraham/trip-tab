const express = require("express");
const router = express.Router();
const db = require("../database/models");
const ledgerController = require("../contorllers/ledgerController")

router.get("/newEvent")
    //this is where we will add new events
    .get(ledgerController.findAllOwed)
    //create your object from the request
    //use findOne to find that userId
    //if successful found the user than a


module.exports = router