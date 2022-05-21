'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })

const { Sequelize, DataTypes } = require('sequelize')
const { applyAssociate } = require('./associate.js')

// Define connection
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: 'localhost',
	port: process.env.DB_PORT,
	dialect: 'postgres'
})

// Define models
const models = [
	require('../../app/db/models/user.js'),
	require('../../app/db/models/article.js')
]

for ( const model of models ) { model(sequelize, DataTypes) }

// Define associate
applyAssociate(sequelize)

module.exports = sequelize
