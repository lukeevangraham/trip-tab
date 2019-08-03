const db = require("../models");

module.exports = {
    getBooks: (request, response) => {
        db.Book
        .find(request.query)
        .sort({date:-1})
        .then(dbModel => {
            response.json(dbModel)
        })
        .catch(err => {
            response.status(422).json(err)
        })
    },

    saveBook: (request, response) => {
        db.Book
        .create(request.body)
        .then(dbModel => {
            request.io.emit("saved book", request.body.title);
            response.json(dbModel);
        })
        .catch(err => {
            response.status(422).json(err)
        });
    },
    deleteBook: (request, response) => {
        db.Book
        .findById({
            _id: request.params.id
        })
        .then(dbModel => {
            console.log("i am in book controler/s delete/then :", dbModel.title)
            dbModel.remove()
        })
        // .then(dbModel => {
        //     request.io.emit("deleted book", dbModel.title);
        //     response.json(dbModel)
        // })
        .catch(err => {
            response.status(422).json(err);
        })
    }
};