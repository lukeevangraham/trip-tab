const mongoose = require('mongoose')
const Schema = mongoose.Schema

const owedSchema = new Schema({
    userId: {
        type: String, required: true
    },
    payerId: {
        type: String, required: true
    },
    amount: {
        type: Number, required: true
    },
    eventName: {
        type: String, required: true
    },
    paid: {
        type: Boolean, required: true, default: false
    },
    usersAttended: [{
        type: String,
        required: true
    }]
})

const Oweds = mongoose.model('Owed', owedSchema)

module.exports = Oweds;