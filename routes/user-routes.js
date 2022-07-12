const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { check } = require('express-validator')

router.get('/', userController.getUsers) // get all users

router.post(
    '/signup',
    [
        check('name').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    userController.signup
) // create new user

router.post('/login', userController.login) // login user

module.exports = router
