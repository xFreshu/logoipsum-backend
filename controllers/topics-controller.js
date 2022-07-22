const Topics = require('../models/topics')
const Question = require('../models/questions')

const getTopics = async (req, res, next) => {
    let topics
    try {
        topics = await Topics.find({})
    } catch (err) {
        return next(err)
    }
    res.json({
        topics: topics.map((topic) => topic.toObject({ getters: true })),
    })
}

const getTopicById = async (req, res, next) => {
    const id = req.params.id
    let topic
    try {
        topic = await Topics.findById(id)
    } catch (err) {
        return next(err)
    }
    res.json(topic.toObject({ getters: true }))
}

const getTopicsByTopicId = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    let questions
    try {
        questions = await Question.find({ id })
    } catch (err) {
        console.log(err)
    }

    const specificQuestion = questions.filter(
        (question) => question.topic.toString() === id
    )

    res.json({
        questions: specificQuestion.map((question) =>
            question.toObject({ getters: true })
        ),
    })
}

exports.getTopics = getTopics
exports.getTopicById = getTopicById
exports.getTopicsByTopicId = getTopicsByTopicId
