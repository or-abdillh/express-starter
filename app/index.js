'use sctrict'

// Import modules
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import routes
const router = require('./router')

// Setup
const app = express()
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( cors() )

router(app)

module.exports = { app }
