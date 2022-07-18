const mongoose = require('mongoose').default
const Users = require('../models/users')
const Questions = require('../models/questions')
const Topics = require('../models/topics')

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

const deleteQuestion = async (req, res, next) => {
    const id = req.params.id

    let question
    try {
        question = await Questions.findById(id)
            .populate('topic')
            .populate('creator')
    } catch (err) {
        return next(err)
    }

    if (!question) {
        return res.status(404).json({
            message: 'Question not found',
        })
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await question.remove({ session: sess })
        question.creator.questions.pull(question)
        question.topic.usersQuestions.pull(question)
        await question.creator.save({ session: sess })
        await question.topic.save({ session: sess })
        await sess.commitTransaction()
        await question.remove()
    } catch (err) {
        return next(err)
    }

    res.status(200).json({
        message: 'Question deleted',
    })
}

const updateQuestion = async (req, res, next) => {
    const id = req.params.id

    let question
    try {
        question = await Questions.findById(id)
    } catch (err) {
        return next(err)
    }

    if (!question) {
        return res.status(404).json({
            message: 'Question not found',
        })
    }

    const { name, body, topic } = req.body

    question.name = name
    question.body = body
    question.topic = topic

    try {
        await question.save()
    } catch (err) {
        return next(err)
    }

    res.status(200).json({
        message: 'Question updated',
    })
}

exports.updateQuestion = updateQuestion
exports.deleteQuestion = deleteQuestion
exports.getQuestions = getQuestions
exports.createQuestion = createQuestion
