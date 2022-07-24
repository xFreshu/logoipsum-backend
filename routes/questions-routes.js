const express = require('express')
const router = express.Router()
const questionsController = require('../controllers/questions-controller')
const { check } = require('express-validator')

router.get('/', questionsController.getQuestions) // get all questions
router.get('/:id', questionsController.getQuestionsById) //get question by ID
router.post(
    '/',
    [
        check('name').not().isEmpty(),
        check('body').not().isEmpty(),
        check('topic').not().isEmpty(),
    ],
    questionsController.createQuestion
) // create question

router.patch(
    '/:id',
    [check('name').not().isEmpty(), check('body').not().isEmpty()],
    questionsController.updateQuestion
) // update question

router.delete('/:id', questionsController.deleteQuestion) // delete question

module.exports = router
