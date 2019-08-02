const db = require("../database/models")

module.exports = {
    findAllOwed: function (request, response) {
    console.log("TCL: request====================>>>>>>>>>>>>>>", request)
        
        db.Owed
        .find(request.query)
        .sort({ date: -1})
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err))
    },

    findAllPaid: function (requesrt,response) {
        db.findAllPaid
        .find(request.query)
        .sort({ date: -1})
        .then(dbModel => response.json(dbModel))
        .catch( err => response.status(422).json(err))
    },

    findOwedByUserId: function(request, response){
        db.Owed
        .find(request.params.id)
        .then(dbModel => response.json(dbModel))
        .catch(err => response.status(422).json(err))
    }
};