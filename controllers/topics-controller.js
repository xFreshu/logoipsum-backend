const Topics = require('../models/topics')

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

exports.getTopics = getTopics
