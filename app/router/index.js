'use strict'

// Import controllers
const { user } = require('../controllers/userController.js')
const { article } = require('../controllers/articleController.js')

module.exports = app => {
	// Register and Login
	app.route('/user/register').post( user.register )
	app.route('/user/login').post( user.login )

	app.route('/articles').get( article.index ) // get all article or using query

	app.route('/user/article/:username')
		.get( article.articleByUsername ) // article by username
		.post( article.createArticle ) // post new article
}
