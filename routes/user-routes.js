const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { check } = require('express-validator')

router.get('/', userController.getUsers) // get all users

router.get('/:id', userController.getUserById) // get user by id

router.post(
    '/signup',
    [
        check('login').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    userController.signup
) // create new user

router.post('/login', userController.login) // login user

module.exports = router
