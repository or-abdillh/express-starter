'use strict'

// Import controllers
const { user } = require('../controllers/userController.js')
const { article } = require('../controllers/articleController.js')

module.exports = app => {
	// Register and Login
	app.route('/user/register').post( user.register )
	app.route('/user/login').post( user.login )

	app.route('/articles').get( article.index )
	app.route('/user/articles/:username').get( article.articleByUsername ) // must contain query username
}
