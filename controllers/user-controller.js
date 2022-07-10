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

exports.getUsers = getUsers
