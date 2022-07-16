const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const topicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    usersQuestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'questions',
        },
    ],
})

topicsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Topics', topicsSchema)
