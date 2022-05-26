'use strict'

// Logging for every request 
const fs = require('fs')
const chalk = require('chalk')

const getDurationInMilliseconds = start => {
   const NS_PER_SEC = 1e9
   const NS_TO_MS = 1e6
   const diff = process.hrtime(start)

   return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

const createLog = (req, res, duration) => {

	const { url, method } = req
	const { statusCode, statusMessage } = res
	
	const now = new Date().toLocaleString('id')

	const log = `[${now}] [${statusCode} - ${statusMessage}] ${url} ${method} ${duration.toLocaleString('id')}ms \n`

	fs.appendFile(`${process.cwd()}/log-request.txt`, log, () => {
		console.log(
			`[${chalk.red(now)}] [${chalk.green(statusCode)} - ${chalk.green(statusMessage)}] ${url} ${chalk.blueBright(method)} ${chalk.red(duration.toLocaleString('id') + 'ms')}`
		)
	})
}	

const logging = (req, res, next) => {

	const start = process.hrtime()

	res.on('finish', () => createLog(req, res, getDurationInMilliseconds(start)))
	
	next()
}

module.exports = { logging }