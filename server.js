'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 7000,
    bodyParser = require('body-parser'),
    controller = require('./controller/SController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/SRoutes');
routes(app);

app.listen(port);
console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);