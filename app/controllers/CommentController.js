'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../../config/connection.js')

const response = require('../response')

const CommentModel = require('../db/models/comment.js')
const Comment = CommentModel(sequelize, DataTypes)

const CommentsController = {

	async index (req, res) {
		// Get all comments
		try {

			const comments = await Comment.findAll({ 
				attributes: { 
					exclude: ['updatedAt', 'id'] 
				}, 
				order: [ ['createdAt', 'DESC'] ]
			})
			response.success(comments, res)
		} catch(err) { response.internalServerError(err, res) }
	},

	async createComment (req, res) {
		// Create new comment
		const { guestName, guestStatus, guestMessage, inviteID } = req.body
		try {
			await Comment.create({ guestName, guestStatus, guestMessage, inviteID})
			response.success(`Success create new comment for ${guestName}`, res)
		} catch(err) { response.internalServerError(err, res) }
	},

	async destroyComment (req, res) {
		// Destroy comment by inviteID or Truncate table
		const { inviteID, truncate } = req.query
		try {
			let message;

			if ( truncate ) {
				await Comment.destroy({ truncate: true })
				message = 'Success destroy all comments using truncate option'
			} else { 
				await Comment.destroy({ where: { inviteID } })
				message = `Success to destroy all comment with invite id ${inviteID}`
			}

			response.success( message, res)
		} catch(err) { response.internalServerError(err, res) }
	},
}

module.exports = CommentsController
