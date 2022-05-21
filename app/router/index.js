'use strict'

// Import controllers
const user = require('../controllers/userController.js')

module.exports = app => {
	// Register and Login
	app.route('/register').post( user.register )
	app.route('/login').post( user.login )
}
