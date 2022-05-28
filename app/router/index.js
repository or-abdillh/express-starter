'use strict'

// Import controllers
const { user } = require('../controllers/userController.js')
const { article } = require('../controllers/articleController.js')
const { index } = require('../controllers/indexController.js')

module.exports = app => {
	
	// Home
	app.route('/').get( index.home )

	// Can access without token
	app.route('/users').get( user.index )
	app.route('/articles').get( article.index ) // get all article or using query
	app.route('/articles/:username').get( article.articleByUsername ) // get article by username
	app.route('/article/:id').get( article.articleByID ) // Get article by ID article

	// Register, Login, verify sesion login
	app.route('/user/register').post( user.register )
	app.route('/user/login').post( user.login )	
	app.route('/user/verify').get( user.verify )
	
	// Route for CRUD must access with token
	app.route('/user/article/:username')
		.post( article.createArticle ) // post new article
		.delete( article.deleteArticle ) // delete article by id article
		.put( article.updateArticle ) // update article by id article
}
