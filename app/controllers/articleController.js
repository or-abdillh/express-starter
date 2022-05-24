'use strict'

const { models } = require('../db')
const response = require('../response')

const article = {

	async index(req, res) {
		// Get all articles
		try {
			const articles = await models.article.findAll({
				include: {
					model: models.user,
					attributes: ['fullname']
				},
				attributes: { exclude: ['updatedAt', 'username'] }
			})
			response.success({ articles }, res)
		} catch(err) { 
			response.internalServerError(err, res)
			console.log(err)
		}
	},

	async articleByUsername(req, res) {
		// Get article using query username
		const { username } = req.params
		try { 
			const articles = await models.article.findAll({ // select all
				include: {
					model: models.user, // join tabel users
					where: { username }, // where username ===usernamer 
					attributes: ['fullname'], 
				},
				attributes: {
					exclude: ['updatedAt', 'username'] // dont return 'updatedAt' field
				}
			})

			if (articles.length <= 0) response.notFound('Article not found', res)
			else response.success({ articles }, res)

		} catch(err) { response.internalServerError(err, res) }
	},

	async createArticle(req, res) {
		// Create article
		const { title, body } = req.body
		const { username } = req.params

		try {
			await models.article.create({ title, body, username})
			response.success('Success posting new article', res)
		} catch(err) { response.internalServerError(err, res) }
	}
}

module.exports = { article }
