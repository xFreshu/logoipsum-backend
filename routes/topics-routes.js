const express = require('express')
const router = express.Router()
const topicsController = require('../controllers/topics-controller')

router.get('/', topicsController.getTopics) // get all topics
router.get('/:id', topicsController.getTopicById) // get topic by id
router.get('/topicId/:id', topicsController.getTopicsByTopicId) // get questions by topic id
module.exports = router
