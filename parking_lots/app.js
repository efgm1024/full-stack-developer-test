const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const arrivalRouter = require('./routes/arrival')
const departureRouter = require('./routes/departure')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/arrivals', arrivalRouter)
app.use('/departures', departureRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({ "error": "Resource not found" })
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json(err.message)
});

module.exports = app;
