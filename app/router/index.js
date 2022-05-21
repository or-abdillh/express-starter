'use strict'

// Import controllers
const user = require('../controllers/userController.js')
const article = require('../controllers/articleController.js')

module.exports = app => {
	// Register and Login
	app.route('/register').post( user.register )
	app.route('/login').post( user.login )

	app.route('/articles').get( article.index )
}
