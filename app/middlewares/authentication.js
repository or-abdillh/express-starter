'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })

const jwt = require('jsonwebtoken')
const response = require('../response')
const { models } = require('../db')

const authentication = (req, res, next) => {
	// Token undefined
	if ( req.headers.token === undefined ) response.forbidden('Token cannot empty', res)
	else {
		// Get token from headers
		const { token } = req.headers

		// Get username from params
		const { username } = req.params

		// Decode token
		jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
			// Token invalid
			if (err) response.forbidden('Ilegal access, your token invalid', res)
			else {

				// Verify username with decoded
				if ( username === decoded.username ) {
					
					const user = await models.user.findOne({ where: { username: decoded.username } })
					if ( user === null ) response.notFound('Account not found', res)
					else next()

				} else response.forbidden('You cannot access resource outside your account', res)	
			}
		})
	}
}

module.exports = { authentication }
