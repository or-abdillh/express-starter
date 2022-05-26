'use strict'

// Import controllers
const { user } = require('../controllers/userController.js')
const { article } = require('../controllers/articleController.js')

module.exports = app => {
	// Register and Login
	app.route('/user/register').post( user.register )
	app.route('/user/login').post( user.login )

	app.route('/articles').get( article.index ) // get all article or using query
	app.route('/articles/:username').get( article.articleByUsername )

	app.route('/user/verify').get( user.verify )

	app.route('/user/article/:username')
		.post( article.createArticle ) // post new article
		.delete( article.deleteArticle ) // delete article by id article
		.put( article.updateArticle ) // update article by id article
}
