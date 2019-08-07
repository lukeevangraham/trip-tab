const mongoose = require('mongoose')
const Schema = mongoose.Schema

const owedSchema = new Schema({
    userId: {
        type: String, required: true
    },
    youOwedTo: {
        type: String, required: true
    },
    amount: {
        type: Number, required: true
    },
    eventName: {
        type: String, required: true
    },
    eventId: {
        type: String, required: true
    },
    isPaid: {
        type: Boolean,
        default: false
      }
})

const Oweds = mongoose.model('Owed', owedSchema)

module.exports = Oweds;