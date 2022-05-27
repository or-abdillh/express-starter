'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })
const response = require('../response')
const fs = require('fs')

const index = {
	home(req, res) {
		response.success(`[ ${process.env.AUTHOR} - ${process.env.APP_NAME} ] This is example response from your application`, res)
	},

	uploadFile(file, res, callback) {
		// Generate file name
		const format = file.name.split('.')[file.name.split('.').length - 1]
		const fileName = `IMAGE-${ new Date().getTime() }.${ format }`

		file.mv(`${process.cwd()}/public/images/${fileName}`, err => {
			if (err) response.internalServerError(err, res)
			else callback(fileName)
		})
	},

	destroyFile(path, res, callback) {
		fs.unlink(path, err => {
			if (err) callback(false)
			else callback(true)
		})
	}
}

module.exports = { index }
