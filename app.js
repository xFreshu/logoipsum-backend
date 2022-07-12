require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose').default
const userRoutes = require('./routes/user-routes')
const bodyParser = require("express");
const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

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
