//import the require dependencies
var express = require('express');
var app = express();
const expressGraphQL = require('express-graphql');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
var mysql = require('mysql');
var cors = require('cors');
app.set('view engine', 'ejs');
var dateformat = require('dateformat');
var mongoose = require ("./mongoose.js");
var crypt = require('./crypt');
var morgan =require('morgan');
var jwt = require('jsonwebtoken');
const fs = require('fs');
// let pool = require('./connection.js')
// console.log("pool:" + pool);
var CONST = require('./const');
const schema = require('./schema/schema');
var  Buyer  = require('./models/user');
var passport = require('passport');
require('./passport')(passport);
var requireAuth = passport.authenticate('jwt',{session: false});
app.use(morgan('dev'));
app.use(passport.initialize());

app.use('/images', express.static('public'))
//use cors to allow cross origin resource sharing
app.use(cors({ origin: CONST.SERVER_URL, credentials: true }));

//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', CONST.SERVER_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


app.use('/graphql',expressGraphQL({
  schema,
  graphiql : true
}))
app.listen(CONST.LOCAL_PORT);
console.log("Server Listening on port 3001");