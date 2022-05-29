### express-starter
#### A starter project for build REST API with Express, Sequelize, PostgresSQL, supported JWT Authentication, and File Upload handler
![GitHub](https://img.shields.io/github/license/or-abdillh/express-starter?style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/or-abdillh/express-starter?style=for-the-badge)
![Github activity](https://img.shields.io/github/last-commit/or-abdillh/express-starter/main?style=for-the-badge)

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
	DATABASE_URL=postgresql://username:password@host:port/mydb
	SECRET_KEY=random_string_for_JWT	
	```
3. Run postgres service in your computer or you can try this command `npm run postgres-start` equal to `pg_ctl -D ~/pg start`
4. Login to psql  terminal and create new database using name **blog**
5. In current directory run `npm run migrate` and `npm run seeding`
6. Before running command on point 5, your computer must installed sequelize-cli or you can install manual with command `npm i sequelize-cli --save-dev`

### Check connection
In current directory running the application with command `npm run dev`
![npm run dev](./public/run-dev.jpg)

### API Documentation
This application case study is a simple blog, where users can create an account and login to be able to post articles, edit articles, or delete articles. but if the user doesn't want to register, he can log in as a guest and can only see all the articles that have been posted.

This is the documentation about the API that has been made

#### Endpoint
`http://localhost:8000`

#### `/` `GET`
Testing application or index route <br>
Response :
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "This is example response from your application",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
#### `/users` `GET`
Get all users <br>
Response :
```json
{
  "status": true,
  "code": 200,
  "message": "Success",
  "results": {
    "users": [
      {
        "username": "fulan12",
        "fullname": "Fulanah",
        "createdAt": "2022-05-26T11:38:12.544Z"
      }
    ]
  },
  "createAt": "5/27/2022, 5:00:06 PM"
}

```

##### `/articles` `GET`  or `/articles?title=keyword` `GET`
Get all articles or by query <br>
Response : 
``` json
{
  "status": true,
  "code": 200,
  "message": "Success",
  "results": {
     "articles": [
       {
         "id": 1,
         "title": "Lorem ipsum",
         "content": "lorem ipsum sit amet dolor",
         "image": "http://localhost:8000/images/IMG-2092302302908343.jpg",
         "createdAt": "2022-05-26T11:38:12.544Z",
         "user": {
           "fullname": "Sandhika Galih"
         }
       }
     ]
  },
  "createAt": "5/27/2022, 5:00:06 PM"
}
```
``` json
{
	"status": false,
	"code": 404,
	"message": "Not found",
	"results": "Sorry, article not found",
	"createAt": "5/27/2022, 5:00:06 PM"	
}
```

#### `/articles/:username` `GET`
Get article by username or author article <br>
Response :
``` json
{
  "status": true,
  "code": 200,
  "message": "Success",
  "results": {
     "articles": [
       {
         "id": 1,
         "title": "Lorem ipsum",
         "content": "lorem ipsum sit amet dolor",
         "image": "http://localhost:8000/images/IMG-2092302302908343.jpg",
         "createdAt": "2022-05-26T11:38:12.544Z",
         "user": {
           "fullname": "Sandhika Galih"
         }
       }
     ]
  },
  "createAt": "5/27/2022, 5:00:06 PM"
}
```
``` json
{
	"status": false,
	"code": 404,
	"message": "Not found",
	"results": "Sorry, article not found",
	"createAt": "5/27/2022, 5:00:06 PM"	
}
```
#### `/article/:id` `GET`
Get article by id article <br>
Response: 
``` json
{
  "status": true,
  "code": 200,
  "message": "Success",
  "results": {
     "article": {
         "id": 1,
         "title": "Lorem ipsum",
         "content": "lorem ipsum sit amet dolor",
         "image": "http://localhost:8000/images/IMG-2092302302908343.jpg",
         "createdAt": "2022-05-26T11:38:12.544Z",
       }
  },
  "createAt": "5/27/2022, 5:00:06 PM"
}
```
``` json
{
	"status": false,
	"code": 404,
	"message": "Not found",
	"results": "Sorry, article not found",
	"createAt": "5/27/2022, 5:00:06 PM"	
}
```
#### `/user/login` `POST`
Get JWT token from login <br>
Request body : 
``` javascript
{
	username: 'YOUR USERNAME',
	password: 'YOUR PASSWORD'
}
```
Response :
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6dHJ1ZSwidXNlcm5hbWUiOiJzYW5kaGlrYTIzNDAiLCJpYXQiOjE2NTM2NDMxODksImV4cCI6MTY1MzY0Njc4OX0.D61_9icM60wDzYgs_3Usk0AeOQ-r3ZIkCl5ingjv_B4"
	},
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
``` json
{
	"status": false,
	"code": 404,
	"message": "Not found",
	"results": "Sorry, account not found or your username and password is wrong",
	"createAt": "5/27/2022, 5:00:06 PM"	
}
```
#### `/user/register` `POST`
Create new account <br>
Request body :
```javascript
{
	username: 'YOUR USERNAME',
	password: 'YOUR PASSWORD',
	fullname: 'YOUR FULLNAME',
	password: 'YOUR PASSWORD'
}
```
Response :
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Success create account for fulanah",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
```json
{
	"status": false,
	"code": 403,
    "message": "Forbidden",
	"results": "Username has already exist",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 

#### `/user/verify` `GET`
JWT token verification <br>
Request headers :
```javascript
{ headers: { token: 'YOUR TOKEN' } }
```
Response :
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Your login session valid",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
```json
{
	"status": false,
	"code": 403,
    "message": "Forbidden",
	"results": "Your login session invalid",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 

#### `/user/article/:username` `POST`
Posting new article <br>
Request headers :
```javascript
{ headers: { token: 'YOUR TOKEN' } }
```
Request body :
```javascript
{
	title: 'YOUR TITTLE',
	content: 'THE CONTENT FROM YOUR ARTICLE'
}
```
Request files :
```javascript
{ files: { image: filesInputElement } }
```
Response :
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Success posting new article",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
#### `/user/article/:username` `PUT`
Change or update current article <br>
Request header :
```javascript
{ headers: { token: 'YOUR TOKEN' } }
```
Request body :
```javascript
{
	title: 'YOUR TITTLE',
	content: 'THE CONTENT FROM YOUR ARTICLE',
	id: 1
}
```
Request files [reupload image] :
```javascript
{ files: { image: filesInputElement } }
```
Response :
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Success update article and remove old image from server",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Success update article",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Success update article but fail remove old image from server",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
```json
{
	"status": false,
	"code": 404,
    "message": "Not Found",
	"results": "Article not found",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
#### `/user/article/:username` `DELETE`
Delete article from database using id article <br>
Request header :
```javascript
{ headers: { token: 'YOUR TOKEN' } }
```
Request body :
```javascript
{ id: 1 }
```
Response :
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Success update article and image from server",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
```json
{
	"status": true,
	"code": 200,
    "message": "Success",
	"results": "Success update article but fail remove image from server",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
```json
{
	"status": false,
	"code": 404,
    "message": "Not Found",
	"results": "Article not found",
	"createAt": "5/27/2022, 5:00:06 PM"
}
``` 
### Middlewares
This application has middlewares to verify the user's JWT token when accessing sensitive resources.

 In addition to token verification, this application also has a middleware tool to log every incoming request and save it in the form of a txt file.
#### 1. JWT Authentication
Only works on sensitive routes i.e. `user/article`. Every request that goes into that route must have an access token in the headers

Response :
```json
{
	"status": false,
	"code": 403,
	"message": "Forbidden",
	"results": "Token cannot empty"
}
```
```json
{
	"status": false,
	"code": 403,
	"message": "Forbidden",
	"results": "Illegal access, your token invalid"
}
```
```json
{
	"status": false,
	"code": 403,
	"message": "Forbidden",
	"results": "You cannot access resource outside your account"
}
```
#### 2. Logging
Each route that is accessed automatically the application will print information to the terminal
```bash
[5/27/2022, 5:41:01 PM] [403 - Forbidden] /user/register POST 96,791ms
[5/27/2022, 5:53:41 PM] [200 - OK] /user/article/hans4x POST 77,54ms
[5/27/2022, 6:18:06 PM] [404 - Not Found] /article/1 GET 29,043ms
```
The application will also automatically save the logging results into a file in the `logs` directory and system will automatically create a new log file every day.
```bash
~/express-starter/logs/ $ ls
example-log.txt  log-file-2022-26-5.txt  log-file-2022-27-5.txt
```

### Public directory
To access the uploaded file use the `http://localhost:8000/images` route which is relevant to the `public/images` directory. 
Example :
```
http://localhost:8000/images/IMG-203820402380.png
```

If you want to add a new public route in the public directory, add it to the `app/index.js` file:
Code :
```javascript
app.use('/YOUR-CUSTOM-PATH', express.static(path.join( process.cwd(), '/public/NEW-DIRECTORY' )))
```
```
http://localhost:8000/YOUR-CUSTOM-PATH
```

### Uploaded file name
Every new file that comes in will be renamed automatically by using the formula:
```javascript
const format = 'png'
const fileName = `IMG-${ new Date().getTime()}.${ format }`
```

### Demo
I have created a simple front end application as an example of implementing the API which is available here
[coming soon](http://github.com/or-abdillh/express-starter)


### Thanks 
Support me with a cup of coffee and other snacks [here ..](https://saweria.co/orabdillh) <br>
Don't forget to give me star in this repository 🙏🏻🙏🏻 <br>
See my other projects on instagram [@or.abdillh](http://www.instagram.com/or.abdillh) <br>

[Oka R Abdillah ](http://github.com/or-abdillh)
<br>
Last edited on : 28/05/2022
