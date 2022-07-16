const express = require('express')
const router = express.Router()
const questionsController = require('../controllers/questions-controller')

router.get('/', questionsController.getQuestions) // get all questions
router.post('/', questionsController.createQuestion) // create question

module.exports = router
