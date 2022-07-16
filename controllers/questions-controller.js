const mongoose = require('mongoose').default
const Users = require('../models/user')
const Questions = require('../models/questions')
const Topics = require('../models/topics')
const { get } = require('mongoose')

const getQuestions = async (req, res, next) => {
    let questions
    try {
        questions = await Questions.find({})
    } catch (err) {
        return next(err)
    }
    res.json({
        questions: questions.map((question) =>
            question.toObject({ getters: true })
        ),
    })
}

const createQuestion = async (req, res, next) => {
    const { name, body, creator, topic } = req.body

    const createdQuestion = new Questions({
        name,
        body,
        creator,
        topic,
        upvotes: 0,
        downvotes: 0,
    })

    let user
    try {
        user = await Users.findById(creator)
    } catch (err) {
        return next(err)
    }

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        })
    }

    let getTopic
    try {
        getTopic = await Topics.findById(topic)
    } catch (err) {
        return next(err)
    }

    if (!getTopic) {
        return res.status(404).json({
            message: 'Topic not found',
        })
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdQuestion.save({ session: sess })
        user.questions.push(createdQuestion)
        getTopic.usersQuestions.push(createdQuestion)
        await user.save({ session: sess })
        await getTopic.save({ session: sess })
        await sess.commitTransaction()
    } catch (err) {
        return next(err)
    }

    res.status(201).json({
        question: createdQuestion,
    })
}

exports.getQuestions = getQuestions
exports.createQuestion = createQuestion
