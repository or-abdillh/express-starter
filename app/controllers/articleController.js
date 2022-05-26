'use strict'

const { models } = require('../db')
const response = require('../response')
const { Op } = require('sequelize')

const article = {

	async index(req, res) {
		// Get all articles
		if ( req.query.title !== undefined ) await article.articleByTitle(req, res) // get article by title query
		else {
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
		}
	},

	async articleByTitle(req, res) {
		// Get article by title
		const { title } = req.query
		try {
			const articles = await models.article.findAll({
				where: {
					title: {
						[ Op.like ]: `%${title}%`
					}
				}
			})

			if (articles.length === 0) response.notFound('Sorry article not found', res)
			else response.success({ articles }, res)

		} catch(err) { response.internalServerError(err, res) }
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
		const { title, content } = req.body
		const { username } = req.params

		try {
			await models.article.create({ title, content, username})
			response.success('Success posting new article', res)
		} catch(err) { response.internalServerError(err, res) }
	},

	async deleteArticle(req, res) {
		// Delete article from table
		const { id } = req.body

		try {
			await models.article.destroy({ where: { id } })
			response.success(`Success delete article with id ${id}`, res)
		} catch(err) { response.internalServerError(err, res) }
	},

	async updateArticle(req, res) {
		// Update article using id
		const { id, title, content } = req.body
		const { username } = req.params

		try {
			const updated = await models.article.update({ title, content, username }, { where: { id } })
			if ( updated[0] === 0 ) response.notFound('Sorry article not found', res)
			else response.success('Success update article', res)
		} catch(err) { response.internalServerError(err, res) }
	}
}

module.exports = { article }
