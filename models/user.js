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
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
