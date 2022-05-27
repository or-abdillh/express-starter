'use sctrict'

// Import modules
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uploader = require('express-fileupload')

// Import middlewares
const { logging } = require('./middlewares/logging.js')
const { authentication } = require('./middlewares/authentication.js')

// Import routes
const router = require('./router')

// Setup
const app = express()
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( uploader() )
app.use( cors() )
app.use( logging )

// Public fir

app.use( '/images', express.static( path.join(process.cwd(), '/public/images') ) )

// Paths must secure from every access
const pathsSecure = [ '/user/article/:username' ]

app.use( pathsSecure, authentication )

router(app)

module.exports = { app }
