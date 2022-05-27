'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { models } = require('../db')
const response = require('../response')
const {verify} = require('jsonwebtoken')

const user = {

	async register(req, res) {
		// Create new user
		const { username, password, fullname, email } = req.body
		try {
			await models.user.create({ username, password: md5(password), fullname, email })
			response.success(`Success create new account for ${fullname}`, res)
		} catch(err) {
			if (err.parent.code === '23505') response.forbidden('Username has already exist', res) // Duplicate username
			else response.internalServerError(err, res)
		}
	},

	async login(req, res) {
		// Login
		const { username, password } = req.body
		try {
			const account = await models.user.findOne({ where: { username, password: md5(password) } })
			if (account === null) response.notFound('Sorry, account not found or your username and password is wrong input', res)
			else {
				// Generate new token
				const token = jwt.sign({ login: true, username }, process.env.SECRET_KEY, { expiresIn: '1h' })
				response.success({ token }, res)
			}
		} catch(err) { response.internalServerError(err, res) }
	},

	async verify(req, res) {
		// Verifying session login from token
		const { token } = req.headers
		if ( token === undefined ) response.forbidden('Token cannot to empty', res)
		else {
			jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
				if (err) response.forbidden('Your session invalid', res)
				else response.success('Your session valid', res)
			})
		}
	}
}

module.exports = { user }
