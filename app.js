require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose').default
const userRoutes = require('./routes/user-routes')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/users', userRoutes)

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(5000)
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })
