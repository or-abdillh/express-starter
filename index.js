'use sctrict'

require('dotenv').config({ path: `${process.cwd()}/.env` })
const { app } = require('./app')
const sequelize = require('./app/db')

// Try connection
const connectToDatabase = async () => {
	try {
		console.log('Prepare to create connection database ...')
		await sequelize.authenticate()
		console.log('Success connected to database')	
	} catch(err) { 
		console.log('Something wrong from connection : ', err)
		process.exit(1)
	}
}

const init = async () => {
	await connectToDatabase()

	// Running server
	const PORT = process.env.PORT || 8000
	app.listen(PORT, err => {

		if (!err) console.log(`[${process.env.AUTHOR} - ${process.env.APP_NAME}] Server success running with PostgreSQL at port ${PORT}`)
		else console.log('Something was wrong on server connection : ', err)
	})
}

init()
