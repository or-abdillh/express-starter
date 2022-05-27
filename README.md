### express-starter
#### A starter project for build REST API with Express, Sequelize, PostgresSQL, supported JWT Authentication, and File Upload handler

## Documentation
### Getting Started
Follow the steps below to start the application
1. Clone this repo with using command on your terminal <code>git clone https://github.com/or-abdillh/express-starter.git</code>
2. Change current directory to application with commnd <code>cd express-starter</code>
3. Install node modules <code>npm install</code>

### Environment & Database
This aplication using PostgreSQL as a DBMS, you must setup your information connection into file `.env`
1. In current directory  `cp .env.example .env`
2. Edit `.env`  file with your connection setup:
	```env
	DATABSE_URL=postgres://username:password@host:port/mydb
	SECRET_KEY=random_string_for_JWT	
	```
3. Run postgres service in your computer or you can try this command `npm run postgres-start` equal to `pg_ctl -D ~/pg start`
4. Login to psql  terminal and create new database using name **blog**
5. In current directory run `npm run migrate` and `npm run seeding`
6. Before running command on point 5, your computer must installed sequelize-cli or you can install manual with command `npm i sequelize-cli --save-dev`

### Check connection
In current directory running the application with command `npm run dev`
![run dev](./public/run-dev.jpg)
### API Documentation
 
