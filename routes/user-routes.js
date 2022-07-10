const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { check } = require('express-validator')

router.get('/', userController.getUsers)

router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
])

module.exports = router
