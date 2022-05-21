'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })

const { Sequelize } = require('sequelize')

// Define connection
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: 'localhost',
	port: process.env.DB_PORT,
	dialect: 'postgres'
})

// Connecting
const connect = async () => {
	try {
		await sequelize.authenticate()
		console.log('Succes connected to PostgreSQL Server')
	} catch(err) { console.log(`Something error from connection PostgreSQL : ${err}`) }
}

connect()

module.exports = sequelize
