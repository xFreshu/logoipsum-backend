const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const questionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Topics',
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
})

questionsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Questions', questionsSchema)
