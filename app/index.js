'use sctrict'

// Import modules
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import middlewares
const { logging } = require('./middlewares/logging.js')

// Import routes
const router = require('./router')

// Setup
const app = express()
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( cors() )

app.use( logging )

router(app)

module.exports = { app }
