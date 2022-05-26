'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })

const { Sequelize, DataTypes } = require('sequelize')

// Define node env
const env = process.env.NODE_ENV || 'dev'
const dialectOptions = env === 'dev' ? {  } : {
	ssl: {
		require: true,
		rejectUnauthorized: false
	}
}

// Define connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	logging: false,
	dialectOptions
})

// Define model
const models = [
	require('./models/user.js'),
	require('./models/article.js')
]

for ( const model of models ) { model(sequelize, DataTypes) }

// Define associate
const { user, article } = sequelize.models
user.hasMany(article, { foreignKey: 'username', as: 'author' })
article.belongsTo(user, { foreignKey: 'username' })

module.exports = sequelize
