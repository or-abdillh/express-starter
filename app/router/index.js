'use strict'

// Import controllers
const Comment = require('../controllers/CommentController.js')

module.exports = app => {
	// index route
	app.route('/comments')
		.get( Comment.index )
		.post( Comment.createComment )
		.delete( Comment.destroyComment )
}
