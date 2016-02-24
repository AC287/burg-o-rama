'use strict'

var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var burgerRoutes = require(path.join(__dirname, '/routes/burgers'));

var app = express();
var port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.set('view engine','ejs');

//Home route
app.get('/',(req,res)=> res.render('pages/home'))

//Burger route
app.use('/burgers', burgerRoutes);

app.listen(port,()=>
  console.log('Server initiated', port, '//', new Date())
);
