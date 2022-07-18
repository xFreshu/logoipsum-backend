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
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answers',
        },
    ],
})

questionsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Questions', questionsSchema)
