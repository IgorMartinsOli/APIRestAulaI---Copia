var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//rotas
var booksRouter = require('./routes/livros');
app.use('/livros', booksRouter);

app.use(function(req, res, next){
    let err = new Error("Not found")
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next){
    return res.status(err.status || 500)
    .json({error: err.message || "INTERTNAL ERROR"});
});

module.exports = app;