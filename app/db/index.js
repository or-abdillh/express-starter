'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })

const { Sequelize, DataTypes } = require('sequelize')

// Define connection
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT,
	dialect: 'postgres'
})

// Define models
const models = [
	require('./models/user.js'),
	require('./models/article.js')
]

for ( const model of models ) { model(sequelize, DataTypes) }

// Define associate
const { user, article } = sequelize.models
user.hasMany(article, { foreignKey: 'username' })
article.belongsTo(user, { foreignKey: 'username' })

module.exports = sequelize
