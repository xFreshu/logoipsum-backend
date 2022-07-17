const Users = require('../models/users')
const HttpError = require('../models/http-error')

const getUsers = async (req, res, next) => {
    let users
    try {
        users = await Users.find({})
    } catch (err) {
        return next(err)
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) })
}

const login = async (req, res, next) => {
    const { login, password } = req.body
    let user
    try {
        user = await Users.findOne({ login })
    } catch (err) {
        const error = new HttpError('Błędne logowanie, spróbuj ponownie', 500)
        return next(error)
    }
    if (!user || user.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        )
        return next(error)
    }
    res.json({
        message: 'Logged in!',
        user: user.toObject({ getters: true }),
    })
}

const signup = async (req, res, next) => {
    const { login, email, password } = req.body
    const newUser = new Users({
        login,
        email,
        password,
        image: 'https://i.pravatar.cc/300',
        questions: [],
    })
    let user
    try {
        user = await newUser.save()
    } catch (err) {
        return next(err)
    }
    res.json({ user: user.toObject({ getters: true }) })
}
exports.getUsers = getUsers
exports.login = login
exports.signup = signup
