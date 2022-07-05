const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 3,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  downvote: {
    type: Number,
    default: 0,
  },
})

answerSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Answer', answerSchema)
