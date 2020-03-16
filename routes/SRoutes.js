'use strict';

module.exports = function(app) {
    var todoList = require('../controller/SController');

    app.route('/')
        .get(todoList.index)

    app.route('/users')
        .get(todoList.users)

    app.route('/usersById/:id')
        .get(todoList.usersById)

    app.route('/driversById')
        .post(todoList.driverById)

    app.route('/changePass')
        .post(todoList.changePass)

    app.route('/ListProfileDriver')
        .post(todoList.ListProfileDriver);
    
    app.route('/sendEmail')
        .post(todoList.sendEmail);
};