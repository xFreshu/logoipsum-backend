const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://i.pravatar.cc/300',
        required: true,
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
