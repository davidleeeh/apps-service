# apps-service

A simple app management tool that allows authorized users to create and edit app information.

## Overview
The app can be broken down into two parts: A server that provides a REST API and a single page application (SPA) client. The server was created with Node.js and Express. PostgreSQL is used as the database for data persistence. The frontend is implemented with React as the frontend freamework and MUI as the React component library.


## How to run
### Prerequisite
You need to have the following installed in your environment in order to run the app:
- Node.js
- NPM (which shuold come with Node.js installation)
- Docker


### Initialize DB
We will be running the PostgreSQL databse in Docker, so the first step is to pull the official Postgre docker image by running `docker pull postgres` in your terminal. One the image is pulled, you should see something similar to this:

```
Digest: sha256:3e2eba0a6efbeb396e086c332c5a85be06997d2cf573d34794764625f405df4e
Status: Downloaded newer image for postgres:latest
docker.io/library/postgres:latest
```

Next step is to create a container for our database. To do so, run the following command:

```
docker run --name local-postgres -p 5432:5432 -e POSTGRES_DB=appdb -e POSTGRES_PASSWORD=password -e POSTGRES_USER=appuser -d postgres  
```

This will create and run a container named `local-postgres`, with a PostgreSQL database setup with the specified database name, user and password.


### Add environment variables for confidentiatl configurations

Under the `/server` directory, create a `.env` file, and add the following environment variables in that file:

```
DB_USER="appuser"
DB_PASSWORD="password"
JWT_SECRET="jwtsecret"
```
For `JWT_SECRET`, you can specify whatever secret you like, but `DB_USER` and `DB_PASSWORD` should match the `POSTGRES_USER` and `POSTGRES_PASSWORD` when you create the docker conainer in the previous step.

### Initialize DB tables

Before the first time you run the server, the tables needs to be set up. Under `/server` directory, run `npm run init`. 

This will create tables for user and apps data. If the tables already exist, all the data will be deleted.


### Run the Node.js server

Once that's done, you are ready to start the server. To do that, simply run `npm run start`, and you should see something like the following:

```
> server@1.0.0 start /Users/davidlee/workspace/apps-service/server
> nodemon src/server.js

[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/server.js`
Server running on port 8080
```

Now the server is up and running!

### Run the client

To run the client, under `/client` directory, run `npm run start`. It will automatically open up a new browser window and load the landing page.

[landing page](/assets/landing-page.png)

### Unit tests
Tests for API is implemented with Mocha, Supertest and Chai. To run the tests, under `/server/`, run `npm run test`.


