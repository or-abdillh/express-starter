'use strict'

const { models } = require('../db')
const response = require('../response')

const article = {

	async index(req, res) {
		// Get all articles
		try {
			const articles = await models.article.findAll({ include: { model: models.user } })
			response.success({ articles }, res)
		} catch(err) { 
			response.internalServerError(err, res)
			console.log(err)
		}
	}
}

module.exports = { article }
