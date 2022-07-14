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
    topics: [
        {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Topic',
            header: {
                type: String,
                required: true,
            },
            body: {
                type: String,
                required: true,
            },
        },
    ],
})

topicsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Topics', topicsSchema)
