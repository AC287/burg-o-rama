'use strict'

var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');

var app = express();
var port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.set('view engine','ejs');

app.listen(port,()=>
  console.log('Server initiated', port, '//', new Date())
);
