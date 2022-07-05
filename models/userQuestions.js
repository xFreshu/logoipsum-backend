const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// type QuestionProps = {

//   id: number
//
//   user: {
//     login: string
//     avatar: string
//   }
//   answers: Array<{
//     id: number
//     content: string
//     upvote: string
//     downvote: string


const userQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  downvote: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
  ],
});

userQuestionSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserQuestion", userQuestionSchema);