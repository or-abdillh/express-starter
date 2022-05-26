'use strict'

const { models } = require('../db')
const response = require('../response')
const { index } = require('./indexController.js')
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

	async articleByID(req, res) {
		// Get article by ID article
		const { id } = req.params
		try {
			const article = await models.article.findOne({
				where: { id },
				attributes: {
					exclude: ['updatedAt', 'username']
				}
			})

			if ( article === null ) response.notFound('Sorry, article not found', res)
			else response.success({ article }, res)

		} catch(err) { response.internalServerError(err, res) }
	},

	async createArticle(req, res) {
		// Create article
		const { title, content } = req.body
		const { username } = req.params

		// Get files
		if ( req.files === undefined ) response.notFound('Image from request not found', res)
		else {
			const { image } = req.files

			index.uploadFile(image, res, async fileName => {
				try {
					await models.article.create({
						title, content, username,
						image: `http://${req.headers.host}/images/${fileName}`
					})
					response.success('Success posting new article', res)
				} catch(err) { response.internalServerError(err, res) }
			})
		}
	},

	async deleteArticle(req, res) {
		// Delete article from table
		const { id } = req.body

		try {
			const deleted = await models.article.destroy({ where: { id } })
			if ( !deleted ) response.notFound('Article not found', res)
			else response.success(`Success delete article with id ${id}`, res)

		} catch(err) { response.internalServerError(err, res) }
	},

	async updateArticle(req, res) {
		// Update article using id
		const { id, title, content } = req.body
		const { username } = req.params

		try {
			const updated = await models.article.update({ title, content, username }, { where: { id } })
			if ( !updated[0] ) response.notFound('Sorry article not found', res)
			else response.success('Success update article', res)
		} catch(err) { response.internalServerError(err, res) }
	}
}

module.exports = { article }
