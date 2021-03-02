## Members Message Board
Message Board CRUD app for users to post and read messages.

## Description
Message board CRUD app using a REST API backend made with Express and MongoDB, and React for the frontend. Users can create accounts and sign in to post messages which they can later edit. Depending on user credentials they can post, edit, and delete messages. The default non signed in user is given guest privileges which allows them to post messages only. Users can create an account and then log in. Logged in users can post messages, and then go back and edit messages that they created. Admin users can delete any messages. Passwords are hashed with bcrypt.js and users are authenticated with JSON Web Tokens using passport.js jwt strategy. JWTs are stored in localstorage.

## Features

- REST API made with Express
- React frontend
- MongoDB accessed with Mongoose
- Password hashing with bcrpyt.js
- JWT user authentication using passport.js
- Different user privileges to post/edit/delete messages
- Basic sanitization/validaiton of user input using Express-validator

## Why?
The goal of this project was to make a simple fullstack CRUD app with a REST API backend and a React frontend. 

For the backend I wanted to use Express to make a REST API that was decoupled from the frontend and that provides routes for Create, Read, Update, and Delete operations on a MongoDB. The backend of this project was good practice for handling various http requests, performing async functions to manipulate data in the database, and sending appropriate responses to the frontend. It was also a lot of fun to learn about basic security features such as hashing passwords, validating/sanitizing user input, and using JWTs for user authentication to access protected routes/info. 

For the frontend I wanted to make a React frontend that could fetch data from the backend REST API, and manipulate that data as needed. This project was good practice in asynchronously loading data and implementing stateful logic. All React components in this project are written as functional components that use hooks to manage state, specifically useState and useEffect are used here. It was interesting configuring the requests from the frontend to include the JWT as an authorization Bearer Token when trying to access protected endpoints, and to parse the user privileges/info sent from the backend to dynamically display different options such as editing/deleting posts. 

This project was interesting exposure to JSON Web Tokens and basic crpytographic one way functions that allow you to send data that can be signed by the creator and then be publically read but not modified without the private key/secret. It was particularly interesting reading about the pros and cons of different security choices such as whether to store the JWT in the frontend in a cookie with an httpOnly flag or to store it in local storage. Ultimately for this project I chose to store the JWT in local storage, but I do realize that local storage can be vulnerable to XSS attacks.

## Usage/Install

Clone the project and then cd into the respective folders.

`Frontend`:

To install the dependencies, with [npm](https://npmjs.org/) installed, run

```
$ npm install
```

To run the app in development mode, run

```
$ npm start
```

`Backend`:

To install the dependencies, with [npm](https://npmjs.org/) installed, run

```
$ npm install
```

To run the app in development mode, run

```
$ npm run devstart
```