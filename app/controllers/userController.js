'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { DataTypes } = require('sequelize')
const sequelize = require('../../config/connection.js')
const userModel = require('../db/models/user.js')
const response = require('../response')

const User = userModel(sequelize, DataTypes)

const userController = {

	async register(req, res) {
		// Create new user
		const { username, password, fullname, email } = req.body
		try {
			await User.create({ username, password: md5(password), fullname, email })
			response.success(`Success create new account for ${fullname}`, res)
		} catch(err) { response.internalServerError(err, res) }
	},

	async login(req, res) {
		// Login
		const { username, password } = req.body
		try {
			const account = await User.findOne({ where: { username, password: md5(password) } })
			if (account === null) response.notFound('Sorry, account not found or your username and password is wrong input', res)
			else {
				// Generate new token
				const token = jwt.sign({ login: true, username }, process.env.SECRET_KEY, { expiresIn: '1h' })
				response.success({ token }, res)
			}
		} catch(err) { response.internalServerError(err, res) }
	}
}

module.exports = userController