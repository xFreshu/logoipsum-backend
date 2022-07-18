const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const answersScheme = new mongoose.Schema({
    body: {
        type: String,
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
})

answersScheme.plugin(uniqueValidator)

module.exports = mongoose.model('Answers', answersScheme)
