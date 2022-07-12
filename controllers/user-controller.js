const Users = require('../models/user')

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
    const { email, password } = req.body
    let user
    try {
        user = await Users.findOne({ email })
    } catch (err) {
        return next(err)
    }
    if (!user || user.password !== password) {
        return next({ status: 401, message: 'Invalid email or password' })
    }
    res.json({ user: user.toObject({ getters: true }) })
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
