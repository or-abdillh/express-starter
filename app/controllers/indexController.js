'use strict'

const response = require('../response')

const index = {
	home(req, res) {
		response.success('This is example response from your application', res)
	},

	uploadFile(file, res, callback) {
		// Generate file name
		const format = file.name.split('.')[file.name.split('.').length - 1]
		const fileName = `IMAGE-${ new Date().getTime() }.${ format }`

		file.mv(`${process.cwd()}/public/images/${fileName}`, err => {
			if (err) response.internalServerError(err, res)
			else callback(fileName)
		})
	}
}

module.exports = { index }
