const express = require("express");
const router = express.Router();
const Owed = require("../database/models/owed");

router.post("/newEvent", (request, response){
    //this is where we will add new events
    //create your object from the request
    //use findOne to find that userId
    //if successful found the user than a
})