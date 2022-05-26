'use strict'

const response = require('../response')

const index = {
	home(req, res) {
		response.success('This is example response from your application', res)
	}
}

module.exports = { index }
